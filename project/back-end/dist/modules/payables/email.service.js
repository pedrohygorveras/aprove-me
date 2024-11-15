"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const nodemailer = require("nodemailer");
const users_service_1 = require("../users/users.service");
let EmailService = EmailService_1 = class EmailService {
    constructor(prisma, usersService) {
        this.prisma = prisma;
        this.usersService = usersService;
        this.logger = new common_1.Logger(EmailService_1.name);
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT, 10),
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }
    async notifyUsersByRoles(message, roles) {
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
            this.logger.log(`Notification email sent to users with roles: ${roles.join(', ')}`);
        }
        catch (error) {
            this.logger.error(`Failed to send email: ${error.message}`);
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], EmailService);
//# sourceMappingURL=email.service.js.map