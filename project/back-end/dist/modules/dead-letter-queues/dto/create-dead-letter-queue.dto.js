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
exports.CreateDeadLetterQueueDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateDeadLetterQueueDto {
}
exports.CreateDeadLetterQueueDto = CreateDeadLetterQueueDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the batch associated with this dead letter item',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)('4'),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDeadLetterQueueDto.prototype, "batchId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the assignor',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)('4'),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDeadLetterQueueDto.prototype, "assignorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Value of the payable',
        example: 1000.0,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateDeadLetterQueueDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Emission date of the payable',
        example: '2024-01-01T00:00:00Z',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], CreateDeadLetterQueueDto.prototype, "emissionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error message associated with this dead letter item',
        example: 'Failed to process the payable due to network timeout.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateDeadLetterQueueDto.prototype, "errorMessage", void 0);
//# sourceMappingURL=create-dead-letter-queue.dto.js.map