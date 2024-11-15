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
exports.DeadLetterQueuesController = void 0;
const common_1 = require("@nestjs/common");
const dead_letter_queues_service_1 = require("./dead-letter-queues.service");
const create_dead_letter_queue_dto_1 = require("./dto/create-dead-letter-queue.dto");
const update_dead_letter_queue_dto_1 = require("./dto/update-dead-letter-queue.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const dead_letter_queue_entity_1 = require("./entities/dead-letter-queue.entity");
let DeadLetterQueuesController = class DeadLetterQueuesController {
    constructor(deadLetterQueuesService) {
        this.deadLetterQueuesService = deadLetterQueuesService;
    }
    create(createDeadLetterQueueDto) {
        return this.deadLetterQueuesService.create(createDeadLetterQueueDto);
    }
    findAll(search, page = 1, limit = 10) {
        return this.deadLetterQueuesService.findAll(search, page, limit);
    }
    findOne(id) {
        return this.deadLetterQueuesService.findOne(id);
    }
    update(id, updateDeadLetterQueueDto) {
        return this.deadLetterQueuesService.update(id, updateDeadLetterQueueDto);
    }
    remove(id) {
        return this.deadLetterQueuesService.remove(id);
    }
};
exports.DeadLetterQueuesController = DeadLetterQueuesController;
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new dead letter queue item',
        description: 'Accessible only by Admin role. Creates a new dead letter queue record.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Dead letter queue item successfully created.',
        type: dead_letter_queue_entity_1.DeadLetterQueueEntity,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dead_letter_queue_dto_1.CreateDeadLetterQueueDto]),
    __metadata("design:returntype", void 0)
], DeadLetterQueuesController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve all dead letter queue items with pagination',
        description: 'Returns a paginated list of dead letter queue items. Requires authorization. Optionally filter by payableId.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        description: 'Search term to filter dead letter queue items by payableId',
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
        description: 'Number of dead letter queue items per page',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved list of dead letter queue items',
        schema: {
            example: {
                data: [
                    {
                        id: '1',
                        batchId: '1234-5678-9012-3456',
                        assignorId: '123e4567-e89b-12d3-a456-426614174000',
                        value: 1000.0,
                        emissionDate: '2024-01-01T00:00:00Z',
                        errorMessage: 'Failed to process the batch due to network timeout.',
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
], DeadLetterQueuesController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get dead letter queue item by ID',
        description: 'Fetches a dead letter queue item by its unique ID. Requires authorization.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Unique identifier of the dead letter queue item',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dead letter queue item found and retrieved successfully',
        type: dead_letter_queue_entity_1.DeadLetterQueueEntity,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Dead letter queue item not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DeadLetterQueuesController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update dead letter queue item details',
        description: 'Updates the information of a specific dead letter queue item by ID. Requires authorization.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Unique identifier of the dead letter queue item',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dead letter queue item successfully updated',
        type: dead_letter_queue_entity_1.DeadLetterQueueEntity,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Dead letter queue item not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dead_letter_queue_dto_1.UpdateDeadLetterQueueDto]),
    __metadata("design:returntype", void 0)
], DeadLetterQueuesController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a dead letter queue item',
        description: 'Deletes a specific dead letter queue item by ID. Requires authorization.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Unique identifier of the dead letter queue item',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dead letter queue item successfully deleted',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Dead letter queue item not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DeadLetterQueuesController.prototype, "remove", null);
exports.DeadLetterQueuesController = DeadLetterQueuesController = __decorate([
    (0, swagger_1.ApiTags)('Dead Letter Queues'),
    (0, swagger_1.ApiExtraModels)(create_dead_letter_queue_dto_1.CreateDeadLetterQueueDto, update_dead_letter_queue_dto_1.UpdateDeadLetterQueueDto, dead_letter_queue_entity_1.DeadLetterQueueEntity),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('dead-letter-queue'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [dead_letter_queues_service_1.DeadLetterQueuesService])
], DeadLetterQueuesController);
//# sourceMappingURL=dead-letter-queues.controller.js.map