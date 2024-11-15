"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PrismaExceptionFilter = class PrismaExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        switch (exception.code) {
            case 'P2002':
                response.status(409).json({
                    message: 'Unique constraint failed. Duplicate record exists.',
                    details: exception.meta?.target,
                });
                break;
            case 'P2003':
                response.status(400).json({
                    message: 'Foreign key constraint failed.',
                    details: exception.meta?.field_name,
                });
                break;
            case 'P2004':
                response.status(400).json({
                    message: 'A constraint was violated.',
                    details: exception.meta,
                });
                break;
            case 'P2005':
                response.status(400).json({
                    message: 'Invalid data format for a field.',
                    details: exception.meta,
                });
                break;
            case 'P2006':
                response.status(400).json({
                    message: 'The provided value is out of range for the field.',
                    details: exception.meta,
                });
                break;
            case 'P2007':
                response.status(404).json({
                    message: 'Record not found for update or delete operation.',
                    details: exception.meta,
                });
                break;
            case 'P2008':
                response.status(400).json({
                    message: 'Failed to parse query. Query syntax is likely incorrect.',
                });
                break;
            case 'P2009':
                response.status(400).json({
                    message: 'Required value not set for a field.',
                    details: exception.meta,
                });
                break;
            case 'P2010':
                response.status(500).json({
                    message: 'Raw query execution failed on the database.',
                    details: exception.meta,
                });
                break;
            case 'P2011':
                response.status(400).json({
                    message: 'Null constraint violation. A required field is null.',
                    details: exception.meta,
                });
                break;
            case 'P2012':
                response.status(400).json({
                    message: 'Missing a required value for the field.',
                    details: exception.meta,
                });
                break;
            case 'P2013':
                response.status(400).json({
                    message: 'Missing required `where` clause in the query.',
                });
                break;
            case 'P2014':
                response.status(400).json({
                    message: 'Referential integrity violation.',
                    details: exception.meta,
                });
                break;
            case 'P2015':
                response.status(404).json({
                    message: 'The record for an update operation was not found.',
                    details: exception.meta,
                });
                break;
            case 'P2016':
                response.status(400).json({
                    message: 'Query interpretation error. Possible invalid field.',
                    details: exception.meta,
                });
                break;
            case 'P2017':
                response.status(400).json({
                    message: 'Required records are not connected.',
                    details: exception.meta,
                });
                break;
            case 'P2018':
                response.status(400).json({
                    message: 'Record mismatch between provided IDs and database records.',
                    details: exception.meta,
                });
                break;
            case 'P2019':
                response.status(400).json({
                    message: 'Input value too large for the field.',
                    details: exception.meta,
                });
                break;
            case 'P2020':
                response.status(400).json({
                    message: 'Value too long for the column in the database.',
                    details: exception.meta,
                });
                break;
            case 'P2021':
                response.status(404).json({
                    message: 'The table referenced in the query does not exist.',
                    details: exception.meta,
                });
                break;
            case 'P2022':
                response.status(404).json({
                    message: 'The column referenced in the query does not exist.',
                    details: exception.meta,
                });
                break;
            case 'P2023':
                response.status(400).json({
                    message: 'Database constraint violation.',
                    details: exception.meta,
                });
                break;
            case 'P2024':
                response.status(500).json({
                    message: 'Error connecting to the database.',
                });
                break;
            case 'P2025':
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
};
exports.PrismaExceptionFilter = PrismaExceptionFilter;
exports.PrismaExceptionFilter = PrismaExceptionFilter = __decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError)
], PrismaExceptionFilter);
//# sourceMappingURL=prisma-exception.filter.js.map