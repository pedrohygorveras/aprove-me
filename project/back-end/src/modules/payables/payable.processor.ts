import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { PrismaService } from '../../database/prisma.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { BatchEntity } from '../batchs/entities/batch.entity';
import * as nodemailer from 'nodemailer';

@Injectable()
export class PayableProcessor {
  private readonly MAX_RETRIES = 4; // Maximum retry attempts for processing a single payable

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Consumer for processing batches of payables.
   * Listens to the RabbitMQ queue `payablesQueue`.
   * Processes each payable in the batch and sends a report via email upon completion.
   */
  @RabbitSubscribe({
    exchange: 'payablesExchange',
    routingKey: 'payable.create',
    queue: 'payablesQueue',
    queueOptions: {
      durable: true,
    },
  })
  async handleProcessPayable(payload: {
    payables: CreatePayableDto[];
    batch: BatchEntity;
  }) {
    const { payables, batch } = payload;
    console.log(`Processing batch ID: ${batch.id}`);

    let totalSuccess = 0;
    let totalFailed = 0;

    try {
      // Process each payable in the batch
      for (const payable of payables) {
        const success = await this.processPayable(payable, 0, batch.id); // Pass batch ID for tracking
        if (success) totalSuccess++;
        else totalFailed++;
      }

      // Update the batch record to reflect processing results
      await this.updateBatch(batch.id, totalSuccess, totalFailed);

      // Retrieve email addresses of users with specified roles
      const emailObjects = await this.findEmailsByRoles([
        'Admin',
        'Auditor',
        'Manager',
        'Operator',
      ]);

      const emails = emailObjects.map((user) => user.email);

      // Prepare the email content
      const subject = `Batch ${batch.id} - Processing Report`;
      const text = `Batch ${batch.id} completed.

      Total Success: ${totalSuccess}
      Total Failed: ${totalFailed}`;

      // Send the processing report via email
      await this.sendEmailReport(emails, subject, text);

      console.log(`Batch processing completed for batch ID: ${batch.id}`);
    } catch (error) {
      console.error(`Error processing batch ID ${batch.id}:`, error);
      throw error; // Requeue the message if any error occurs
    }
  }

  /**
   * Processes a single payable with retry logic.
   * If retries exceed the maximum limit, the payable is moved to a dead-letter queue.
   *
   * @param payable - The payable data to be processed.
   * @param retryCount - Current retry attempt count.
   * @param batchId - ID of the batch this payable belongs to.
   * @returns A boolean indicating the success of the processing.
   */
  private async processPayable(
    payable: CreatePayableDto,
    retryCount: number,
    batchId: string,
  ): Promise<boolean> {
    try {
      await this.prisma.payable.create({
        data: payable,
      });
      console.log('Payable saved:', payable);
      return true;
    } catch (error) {
      console.error(
        `Error saving payable (Retry ${retryCount}):`,
        payable,
        error,
      );

      // Retry logic
      if (retryCount < this.MAX_RETRIES) {
        console.log(`Retrying payable ${payable.assignorId}...`);
        return this.processPayable(payable, retryCount + 1, batchId);
      } else {
        // Move payable to dead-letter queue after max retries
        console.error(
          `Payable ${payable.assignorId} moved to dead-letter queue.`,
        );
        await this.moveToDeadLetterQueue(payable, batchId);
        return false;
      }
    }
  }

  /**
   * Retrieves email addresses of users based on their roles.
   *
   * @param roles - An array of roles to filter users.
   * @returns An array of email addresses of users matching the roles.
   */
  private async findEmailsByRoles(roles: string[]) {
    return this.prisma.user.findMany({
      where: { role: { in: roles } },
      select: { email: true },
    });
  }

  /**
   * Updates the batch record with processing results.
   * Sets the batch status to completed and updates success/failure counts.
   *
   * @param batchId - ID of the batch being updated.
   * @param totalSuccess - Total number of successfully processed payables.
   * @param totalFailed - Total number of failed payables.
   */
  private async updateBatch(
    batchId: string,
    totalSuccess: number,
    totalFailed: number,
  ) {
    try {
      await this.prisma.batch.update({
        where: { id: batchId },
        data: {
          totalSuccess,
          totalFailed,
          processing: false,
        },
      });
      console.log(`Batch ID ${batchId} updated successfully.`);
    } catch (error) {
      console.error(`Error updating batch ID ${batchId}:`, error);
    }
  }

  /**
   * Moves a failed payable to the dead-letter queue.
   * Includes additional error details and associates the payable with its batch ID.
   *
   * @param payable - The payable data that failed to process.
   * @param batchId - ID of the batch associated with the payable.
   */
  private async moveToDeadLetterQueue(
    payable: CreatePayableDto,
    batchId: string,
  ) {
    try {
      const deadLetterData = {
        ...payable,
        errorMessage: 'Exceeded max retries', // Detailed error message
        batchId, // Associated batch ID
      };

      await this.prisma.deadLetterQueue.create({
        data: deadLetterData,
      });

      console.log('Payable moved to dead-letter queue:', payable);
    } catch (error) {
      console.error(
        'Error moving payable to dead-letter queue:',
        payable,
        error,
      );
    }
  }

  /**
   * Sends an email report to a list of recipients.
   *
   * @param recipients - Array of email addresses to receive the report.
   * @param subject - Subject line of the email.
   * @param text - Text content of the email body.
   */
  private async sendEmailReport(
    recipients: string[],
    subject: string,
    text: string,
  ) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: recipients.join(','),
        subject,
        text,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email report sent successfully.');
    } catch (error) {
      console.error('Error sending email report:', error);
    }
  }
}
