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
exports.CreateBatchDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateBatchDto {
    constructor() {
        this.processing = true;
        this.totalSuccess = 0;
        this.totalFailed = 0;
        this.total = 0;
    }
}
exports.CreateBatchDto = CreateBatchDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the batch',
        example: 'pending',
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CreateBatchDto.prototype, "processing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of successful items in the batch',
        example: 0,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBatchDto.prototype, "totalSuccess", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of failed items in the batch',
        example: 0,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBatchDto.prototype, "totalFailed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of failed items in the batch',
        example: 0,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBatchDto.prototype, "total", void 0);
//# sourceMappingURL=create-batch.dto.js.map