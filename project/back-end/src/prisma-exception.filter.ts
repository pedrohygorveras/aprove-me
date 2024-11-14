import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    switch (exception.code) {
      case 'P2002':
        // Unique constraint failed
        response.status(409).json({
          message: 'Unique constraint failed. Duplicate record exists.',
          details: exception.meta?.target,
        });
        break;
      case 'P2003':
        // Foreign key constraint failed
        response.status(400).json({
          message: 'Foreign key constraint failed.',
          details: exception.meta?.field_name,
        });
        break;
      case 'P2004':
        // Constraint violation
        response.status(400).json({
          message: 'A constraint was violated.',
          details: exception.meta,
        });
        break;
      case 'P2005':
        // Invalid data format for a field
        response.status(400).json({
          message: 'Invalid data format for a field.',
          details: exception.meta,
        });
        break;
      case 'P2006':
        // Value is out of range for the field
        response.status(400).json({
          message: 'The provided value is out of range for the field.',
          details: exception.meta,
        });
        break;
      case 'P2007':
        // Record not found for update
        response.status(404).json({
          message: 'Record not found for update or delete operation.',
          details: exception.meta,
        });
        break;
      case 'P2008':
        // Failed to parse query
        response.status(400).json({
          message: 'Failed to parse query. Query syntax is likely incorrect.',
        });
        break;
      case 'P2009':
        // Required value not set
        response.status(400).json({
          message: 'Required value not set for a field.',
          details: exception.meta,
        });
        break;
      case 'P2010':
        // Raw query failed
        response.status(500).json({
          message: 'Raw query execution failed on the database.',
          details: exception.meta,
        });
        break;
      case 'P2011':
        // Null constraint violation
        response.status(400).json({
          message: 'Null constraint violation. A required field is null.',
          details: exception.meta,
        });
        break;
      case 'P2012':
        // Missing a required value
        response.status(400).json({
          message: 'Missing a required value for the field.',
          details: exception.meta,
        });
        break;
      case 'P2013':
        // Missing `where` clause
        response.status(400).json({
          message: 'Missing required `where` clause in the query.',
        });
        break;
      case 'P2014':
        // Referential integrity violation
        response.status(400).json({
          message: 'Referential integrity violation.',
          details: exception.meta,
        });
        break;
      case 'P2015':
        // Invalid record update
        response.status(404).json({
          message: 'The record for an update operation was not found.',
          details: exception.meta,
        });
        break;
      case 'P2016':
        // Query interpretation error
        response.status(400).json({
          message: 'Query interpretation error. Possible invalid field.',
          details: exception.meta,
        });
        break;
      case 'P2017':
        // Records not connected
        response.status(400).json({
          message: 'Required records are not connected.',
          details: exception.meta,
        });
        break;
      case 'P2018':
        // Records mismatch
        response.status(400).json({
          message: 'Record mismatch between provided IDs and database records.',
          details: exception.meta,
        });
        break;
      case 'P2019':
        // Input value too large
        response.status(400).json({
          message: 'Input value too large for the field.',
          details: exception.meta,
        });
        break;
      case 'P2020':
        // Value too long for column
        response.status(400).json({
          message: 'Value too long for the column in the database.',
          details: exception.meta,
        });
        break;
      case 'P2021':
        // Table not found in database
        response.status(404).json({
          message: 'The table referenced in the query does not exist.',
          details: exception.meta,
        });
        break;
      case 'P2022':
        // Column not found in the database
        response.status(404).json({
          message: 'The column referenced in the query does not exist.',
          details: exception.meta,
        });
        break;
      case 'P2023':
        // Database constraint violation
        response.status(400).json({
          message: 'Database constraint violation.',
          details: exception.meta,
        });
        break;
      case 'P2024':
        // Database connection error
        response.status(500).json({
          message: 'Error connecting to the database.',
        });
        break;
      case 'P2025':
        // Record not found
        response.status(404).json({
          message: 'Record not found.',
        });
        break;
      default:
        response.status(500).json({
          message: 'An unexpected database error occurred.',
        });
        break;
    }
  }
}
