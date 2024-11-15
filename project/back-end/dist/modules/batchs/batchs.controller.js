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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchsController = void 0;
const common_1 = require("@nestjs/common");
const batchs_service_1 = require("./batchs.service");
const create_batch_dto_1 = require("./dto/create-batch.dto");
const update_batch_dto_1 = require("./dto/update-batch.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const batch_entity_1 = require("./entities/batch.entity");
let BatchsController = class BatchsController {
    constructor(batchsService) {
        this.batchsService = batchsService;
    }
    create(createBatchDto) {
        return this.batchsService.create(createBatchDto);
    }
    findAll(page = 1, limit = 10) {
        return this.batchsService.findAll(page, limit);
    }
    findOne(id) {
        return this.batchsService.findOne(id);
    }
    update(id, updateBatchDto) {
        return this.batchsService.update(id, updateBatchDto);
    }
    remove(id) {
        return this.batchsService.remove(id);
    }
};
exports.BatchsController = BatchsController;
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new batch',
        description: 'Accessible only by Admin role. Creates a new batch record.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Batch successfully created.',
        type: batch_entity_1.BatchEntity,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_batch_dto_1.CreateBatchDto]),
    __metadata("design:returntype", void 0)
], BatchsController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve all batches with pagination',
        description: 'Returns a paginated list of batches. Requires authorization.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number for pagination',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of batches per page',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved list of batches',
        schema: {
            example: {
                data: [
                    {
                        id: '1',
                        processing: true,
                        totalSuccess: 5,
                        totalFailed: 3,
                        total: 8,
                        createdAt: '2024-01-01T00:00:00Z',
                        updatedAt: '2024-01-01T00:00:00Z',
                    },
                ],
                total: 50,
                totalPages: 5,
            },
        },
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], BatchsController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get batch by ID',
        description: 'Fetches a batch by its unique ID. Requires authorization.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Unique identifier of the batch' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Batch found and retrieved successfully',
        type: batch_entity_1.BatchEntity,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Batch not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BatchsController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update batch details',
        description: 'Updates the information of a specific batch by ID. Requires authorization.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Unique identifier of the batch' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Batch successfully updated',
        type: batch_entity_1.BatchEntity,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Batch not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_batch_dto_1.UpdateBatchDto]),
    __metadata("design:returntype", void 0)
], BatchsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a batch',
        description: 'Deletes a specific batch by ID. Requires authorization.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Unique identifier of the batch' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Batch successfully deleted',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Batch not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BatchsController.prototype, "remove", null);
exports.BatchsController = BatchsController = __decorate([
    (0, swagger_1.ApiTags)('Batchs'),
    (0, swagger_1.ApiExtraModels)(create_batch_dto_1.CreateBatchDto, update_batch_dto_1.UpdateBatchDto, batch_entity_1.BatchEntity),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('batch'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [batchs_service_1.BatchsService])
], BatchsController);
//# sourceMappingURL=batchs.controller.js.map