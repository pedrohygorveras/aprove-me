"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchItemsModule = void 0;
const common_1 = require("@nestjs/common");
const batch_items_service_1 = require("./batch-items.service");
const batch_items_controller_1 = require("./batch-items.controller");
const prisma_service_1 = require("../../database/prisma.service");
let BatchItemsModule = class BatchItemsModule {
};
exports.BatchItemsModule = BatchItemsModule;
exports.BatchItemsModule = BatchItemsModule = __decorate([
    (0, common_1.Module)({
        controllers: [batch_items_controller_1.BatchItemsController],
        providers: [batch_items_service_1.BatchItemsService, prisma_service_1.PrismaService],
        exports: [batch_items_service_1.BatchItemsService],
    })
], BatchItemsModule);
//# sourceMappingURL=batch-items.module.js.map