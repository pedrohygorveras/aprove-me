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
exports.DeadLetterQueueEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
class DeadLetterQueueEntity {
}
exports.DeadLetterQueueEntity = DeadLetterQueueEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier of the dead letter queue item',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], DeadLetterQueueEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the payable associated with this dead letter item',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], DeadLetterQueueEntity.prototype, "batchId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the assignor associated with the payable',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], DeadLetterQueueEntity.prototype, "assignorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Value of the payable', example: 1000.0 }),
    __metadata("design:type", Number)
], DeadLetterQueueEntity.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Emission date of the payable',
        example: '2024-01-01T00:00:00Z',
    }),
    __metadata("design:type", Date)
], DeadLetterQueueEntity.prototype, "emissionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error message associated with this dead letter item',
        example: 'Failed to process the payable due to network timeout.',
    }),
    __metadata("design:type", String)
], DeadLetterQueueEntity.prototype, "errorMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the dead letter item was created',
        example: '2024-01-01T00:00:00Z',
    }),
    __metadata("design:type", Date)
], DeadLetterQueueEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the dead letter item was last updated',
        example: '2024-01-02T00:00:00Z',
    }),
    __metadata("design:type", Date)
], DeadLetterQueueEntity.prototype, "updatedAt", void 0);
//# sourceMappingURL=dead-letter-queue.entity.js.map