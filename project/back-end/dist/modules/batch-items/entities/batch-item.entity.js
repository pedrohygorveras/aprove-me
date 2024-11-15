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
exports.BatchItemEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
class BatchItemEntity {
}
exports.BatchItemEntity = BatchItemEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier of the batch item',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], BatchItemEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the batch associated with this item',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], BatchItemEntity.prototype, "batchId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the payable associated with this item',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], BatchItemEntity.prototype, "payableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status of the batch item', example: 'pending' }),
    __metadata("design:type", String)
], BatchItemEntity.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of retry attempts for processing this item',
        example: 0,
    }),
    __metadata("design:type", Number)
], BatchItemEntity.prototype, "retryCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the batch item was created',
        example: '2024-01-01T00:00:00Z',
    }),
    __metadata("design:type", Date)
], BatchItemEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the batch item was last updated',
        example: '2024-01-01T00:00:00Z',
    }),
    __metadata("design:type", Date)
], BatchItemEntity.prototype, "updatedAt", void 0);
//# sourceMappingURL=batch-item.entity.js.map