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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
class BatchEntity {
}
exports.BatchEntity = BatchEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier of the batch',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], BatchEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the batch',
        example: 'pending',
    }),
    __metadata("design:type", Boolean)
], BatchEntity.prototype, "processing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of successful items in the batch',
        example: 0,
    }),
    __metadata("design:type", Number)
], BatchEntity.prototype, "totalSuccess", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of failed items in the batch',
        example: 0,
    }),
    __metadata("design:type", Number)
], BatchEntity.prototype, "totalFailed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number in the batch',
        example: 0,
    }),
    __metadata("design:type", Number)
], BatchEntity.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the batch was created',
        example: '2024-01-01T00:00:00Z',
    }),
    __metadata("design:type", Date)
], BatchEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the batch was last updated',
        example: '2024-01-01T00:00:00Z',
    }),
    __metadata("design:type", Date)
], BatchEntity.prototype, "updatedAt", void 0);
//# sourceMappingURL=batch.entity.js.map