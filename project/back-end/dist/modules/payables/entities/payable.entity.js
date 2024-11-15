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
exports.PayableEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
class PayableEntity {
}
exports.PayableEntity = PayableEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier of the payable',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], PayableEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the assignor associated with the payable',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], PayableEntity.prototype, "assignorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Value of the payable', example: 1000.0 }),
    __metadata("design:type", Number)
], PayableEntity.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Emission date of the payable',
        example: '2024-01-01T00:00:00Z',
    }),
    __metadata("design:type", Date)
], PayableEntity.prototype, "emissionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the payable was created',
        example: '2024-01-01T00:00:00Z',
    }),
    __metadata("design:type", Date)
], PayableEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the payable was last updated',
        example: '2024-01-01T00:00:00Z',
    }),
    __metadata("design:type", Date)
], PayableEntity.prototype, "updatedAt", void 0);
//# sourceMappingURL=payable.entity.js.map