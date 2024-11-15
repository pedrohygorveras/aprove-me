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
exports.BatchItemsController = void 0;
const common_1 = require("@nestjs/common");
const batch_items_service_1 = require("./batch-items.service");
const create_batch_item_dto_1 = require("./dto/create-batch-item.dto");
const update_batch_item_dto_1 = require("./dto/update-batch-item.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const batch_item_entity_1 = require("./entities/batch-item.entity");
let BatchItemsController = class BatchItemsController {
    constructor(batchItemsService) {
        this.batchItemsService = batchItemsService;
    }
    create(createBatchItemDto) {
        return this.batchItemsService.create(createBatchItemDto);
    }
    findAll(batchId, page = 1, limit = 10) {
        return this.batchItemsService.findAll(batchId, page, limit);
    }
    findOne(id) {
        return this.batchItemsService.findOne(id);
    }
    update(id, updateBatchItemDto) {
        return this.batchItemsService.update(id, updateBatchItemDto);
    }
    remove(id) {
        return this.batchItemsService.remove(id);
    }
};
exports.BatchItemsController = BatchItemsController;
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new batch item',
        description: 'Accessible only by Admin role. Creates a new batch item record.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Batch item successfully created.',
        type: batch_item_entity_1.BatchItemEntity,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_batch_item_dto_1.CreateBatchItemDto]),
    __metadata("design:returntype", void 0)
], BatchItemsController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve all batch items with pagination',
        description: 'Returns a paginated list of batch items. Requires authorization. Optionally filter by batch ID.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'batchId',
        required: false,
        description: 'Batch ID to filter batch items',
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
        description: 'Number of batch items per page',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved list of batch items',
        schema: {
            example: {
                data: [
                    {
                        id: '1',
                        batchId: '1234-5678-9012-3456',
                        payableId: '5678-1234-9012-3456',
                        status: 'pending',
                        retryCount: 0,
                        createdAt: '2024-01-01T00:00:00Z',
                        updatedAt: '2024-01-01T00:00:00Z',
                    },
                ],
                total: 50,
                totalPages: 5,
            },
        },
    }),
    __param(0, (0, common_1.Query)('batchId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], BatchItemsController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get batch item by ID',
        description: 'Fetches a batch item by its unique ID. Requires authorization.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Unique identifier of the batch item' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Batch item found and retrieved successfully',
        type: batch_item_entity_1.BatchItemEntity,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Batch item not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BatchItemsController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update batch item details',
        description: 'Updates the information of a specific batch item by ID. Requires authorization.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Unique identifier of the batch item' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Batch item successfully updated',
        type: batch_item_entity_1.BatchItemEntity,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Batch item not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_batch_item_dto_1.UpdateBatchItemDto]),
    __metadata("design:returntype", void 0)
], BatchItemsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a batch item',
        description: 'Deletes a specific batch item by ID. Requires authorization.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Unique identifier of the batch item' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Batch item successfully deleted',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Batch item not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BatchItemsController.prototype, "remove", null);
exports.BatchItemsController = BatchItemsController = __decorate([
    (0, swagger_1.ApiTags)('Batch Items'),
    (0, swagger_1.ApiExtraModels)(create_batch_item_dto_1.CreateBatchItemDto, update_batch_item_dto_1.UpdateBatchItemDto, batch_item_entity_1.BatchItemEntity),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('batch-item'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [batch_items_service_1.BatchItemsService])
], BatchItemsController);
//# sourceMappingURL=batch-items.controller.js.map