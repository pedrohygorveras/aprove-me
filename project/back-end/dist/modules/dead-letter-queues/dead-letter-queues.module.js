"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeadLetterQueuesModule = void 0;
const common_1 = require("@nestjs/common");
const dead_letter_queues_service_1 = require("./dead-letter-queues.service");
const dead_letter_queues_controller_1 = require("./dead-letter-queues.controller");
const prisma_service_1 = require("../../database/prisma.service");
let DeadLetterQueuesModule = class DeadLetterQueuesModule {
};
exports.DeadLetterQueuesModule = DeadLetterQueuesModule;
exports.DeadLetterQueuesModule = DeadLetterQueuesModule = __decorate([
    (0, common_1.Module)({
        controllers: [dead_letter_queues_controller_1.DeadLetterQueuesController],
        providers: [dead_letter_queues_service_1.DeadLetterQueuesService, prisma_service_1.PrismaService],
        exports: [dead_letter_queues_service_1.DeadLetterQueuesService],
    })
], DeadLetterQueuesModule);
//# sourceMappingURL=dead-letter-queues.module.js.map