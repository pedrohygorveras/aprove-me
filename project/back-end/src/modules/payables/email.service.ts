import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import * as nodemailer from 'nodemailer';
import { UsersService } from '../users/users.service';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  private transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async notifyUsersByRoles(message: string, roles: string[]) {
    const users = await this.usersService.findEmailsByRoles(roles);
    const emails = users.map((user) => user.email);

    if (emails.length === 0) {
      this.logger.warn('No users found with the specified roles to notify.');
      return;
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: emails,
      subject: 'Notification: Important Update',
      text: message,
    };

    try {
      console.log(mailOptions);
      // await this.transporter.sendMail(mailOptions);
      this.logger.log(
        `Notification email sent to users with roles: ${roles.join(', ')}`,
      );
    } catch (error) {
      this.logger.error(`Failed to send email: ${error.message}`);
    }
  }
}
