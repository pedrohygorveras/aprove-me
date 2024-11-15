"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayablesModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const payables_service_1 = require("./payables.service");
const payables_controller_1 = require("./payables.controller");
const prisma_service_1 = require("../../database/prisma.service");
const payable_processor_1 = require("./payable.processor");
const users_service_1 = require("../users/users.service");
const dead_letter_queues_service_1 = require("../dead-letter-queues/dead-letter-queues.service");
const email_service_1 = require("./email.service");
const batchs_service_1 = require("../batchs/batchs.service");
let PayablesModule = class PayablesModule {
};
exports.PayablesModule = PayablesModule;
exports.PayablesModule = PayablesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_rabbitmq_1.RabbitMQModule.forRoot(nestjs_rabbitmq_1.RabbitMQModule, {
                exchanges: [
                    {
                        name: 'payablesExchange',
                        type: 'topic',
                    },
                ],
                uri: process.env.RABBITMQ_URI,
                connectionInitOptions: { wait: false },
            }),
        ],
        controllers: [payables_controller_1.PayablesController],
        providers: [
            payables_service_1.PayablesService,
            prisma_service_1.PrismaService,
            payable_processor_1.PayableProcessor,
            dead_letter_queues_service_1.DeadLetterQueuesService,
            email_service_1.EmailService,
            users_service_1.UsersService,
            batchs_service_1.BatchsService,
        ],
        exports: [payables_service_1.PayablesService],
    })
], PayablesModule);
//# sourceMappingURL=payables.module.js.map