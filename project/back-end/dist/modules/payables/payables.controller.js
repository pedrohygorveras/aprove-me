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
exports.PayablesController = void 0;
const common_1 = require("@nestjs/common");
const payables_service_1 = require("./payables.service");
const create_payable_dto_1 = require("./dto/create-payable.dto");
const update_payable_dto_1 = require("./dto/update-payable.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const payable_entity_1 = require("./entities/payable.entity");
let PayablesController = class PayablesController {
    constructor(payablesService) {
        this.payablesService = payablesService;
    }
    async createBatchWithQueue(batchItems) {
        return this.payablesService.createBatchWithQueue(batchItems);
    }
    create(createPayableDto) {
        return this.payablesService.create(createPayableDto);
    }
    findAll(search, page = 1, limit = 10) {
        return this.payablesService.findAll(search, page, limit);
    }
    findOne(id) {
        return this.payablesService.findOne(id);
    }
    update(id, updatePayableDto) {
        return this.payablesService.update(id, updatePayableDto);
    }
    remove(id) {
        return this.payablesService.remove(id);
    }
};
exports.PayablesController = PayablesController;
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Post)('batch'),
    (0, swagger_1.ApiOperation)({
        summary: 'Process batch of payables',
        description: 'Allows administrators to process a batch of payables. The batch is queued for asynchronous processing, with a maximum of 10,000 records.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 202,
        description: 'Batch successfully queued for asynchronous processing.',
        schema: {
            example: {
                message: 'Batch received and queued successfully',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Batch size exceeds the allowed limit.',
        schema: {
            example: {
                statusCode: 400,
                message: 'Batch size cannot exceed 10,000 payables',
                error: 'Bad Request',
            },
        },
    }),
    (0, swagger_1.ApiBody)({
        description: 'Array of CreatePayableDto objects representing the payables to be processed',
        type: [create_payable_dto_1.CreatePayableDto],
        examples: {
            exampleBatch: {
                summary: 'Example of a valid payables batch',
                value: [
                    {
                        assignorId: '123e4567-e89b-12d3-a456-426614174000',
                        value: 1000.0,
                        emissionDate: '2024-01-01T00:00:00Z',
                    },
                    {
                        assignorId: '223e4567-e89b-12d3-a456-426614174000',
                        value: 2000.0,
                        emissionDate: '2024-02-01T00:00:00Z',
                    },
                ],
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PayablesController.prototype, "createBatchWithQueue", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new payable',
        description: 'Accessible only by Admin role. Creates a new payable record.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Payable successfully created.',
        type: payable_entity_1.PayableEntity,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payable_dto_1.CreatePayableDto]),
    __metadata("design:returntype", void 0)
], PayablesController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve all payables with pagination',
        description: 'Returns a paginated list of payables. Requires authorization.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        description: 'Search term to filter payables by assignor ID or value',
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
        description: 'Number of payables per page',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved list of payables',
        schema: {
            example: {
                data: [
                    {
                        id: '1',
                        assignorId: '1234-5678-9012-3456',
                        value: 1500.0,
                        emissionDate: '2024-01-01',
                        createdAt: '2024-01-01T00:00:00Z',
                        updatedAt: '2024-01-01T00:00:00Z',
                    },
                ],
                total: 100,
                totalPages: 10,
            },
        },
    }),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], PayablesController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get payable by ID',
        description: 'Fetches a payable by its unique ID. Requires authorization.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Unique identifier of the payable' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Payable found and retrieved successfully',
        type: payable_entity_1.PayableEntity,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payable not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayablesController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update payable details',
        description: 'Updates the information of a specific payable by ID. Requires authorization.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Unique identifier of the payable' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Payable successfully updated',
        type: payable_entity_1.PayableEntity,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payable not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_payable_dto_1.UpdatePayableDto]),
    __metadata("design:returntype", void 0)
], PayablesController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a payable',
        description: 'Deletes a specific payable by ID. Requires authorization.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Unique identifier of the payable' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Payable successfully deleted',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payable not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayablesController.prototype, "remove", null);
exports.PayablesController = PayablesController = __decorate([
    (0, swagger_1.ApiTags)('Payables'),
    (0, swagger_1.ApiExtraModels)(create_payable_dto_1.CreatePayableDto, update_payable_dto_1.UpdatePayableDto, payable_entity_1.PayableEntity),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('payable'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [payables_service_1.PayablesService])
], PayablesController);
//# sourceMappingURL=payables.controller.js.map