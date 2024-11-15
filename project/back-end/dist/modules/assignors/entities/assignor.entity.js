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
exports.AssignorEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
class AssignorEntity {
}
exports.AssignorEntity = AssignorEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier of the assignor',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], AssignorEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the assignor',
        example: 'John Doe',
    }),
    __metadata("design:type", String)
], AssignorEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email of the assignor',
        example: 'johndoe@example.com',
    }),
    __metadata("design:type", String)
], AssignorEntity.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phone number of the assignor',
        example: '+12345678901',
    }),
    __metadata("design:type", String)
], AssignorEntity.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document identifier of the assignor',
        example: '12345678901',
    }),
    __metadata("design:type", String)
], AssignorEntity.prototype, "document", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the assignor was created',
        example: '2024-01-01T00:00:00Z',
    }),
    __metadata("design:type", Date)
], AssignorEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the assignor was last updated',
        example: '2024-01-01T00:00:00Z',
    }),
    __metadata("design:type", Date)
], AssignorEntity.prototype, "updatedAt", void 0);
//# sourceMappingURL=assignor.entity.js.map