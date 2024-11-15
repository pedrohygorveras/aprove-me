"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignorsModule = void 0;
const common_1 = require("@nestjs/common");
const assignors_service_1 = require("./assignors.service");
const assignors_controller_1 = require("./assignors.controller");
const prisma_service_1 = require("../../database/prisma.service");
let AssignorsModule = class AssignorsModule {
};
exports.AssignorsModule = AssignorsModule;
exports.AssignorsModule = AssignorsModule = __decorate([
    (0, common_1.Module)({
        controllers: [assignors_controller_1.AssignorsController],
        providers: [assignors_service_1.AssignorsService, prisma_service_1.PrismaService],
        exports: [assignors_service_1.AssignorsService],
    })
], AssignorsModule);
//# sourceMappingURL=assignors.module.js.map