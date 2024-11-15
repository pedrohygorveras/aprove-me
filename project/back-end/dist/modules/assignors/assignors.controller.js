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
exports.AssignorsController = void 0;
const common_1 = require("@nestjs/common");
const assignors_service_1 = require("./assignors.service");
const create_assignor_dto_1 = require("./dto/create-assignor.dto");
const update_assignor_dto_1 = require("./dto/update-assignor.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const assignor_entity_1 = require("./entities/assignor.entity");
let AssignorsController = class AssignorsController {
    constructor(assignorsService) {
        this.assignorsService = assignorsService;
    }
    create(createAssignorDto) {
        return this.assignorsService.create(createAssignorDto);
    }
    findAll(search, page = 1, limit = 10) {
        return this.assignorsService.findAll(search, page, limit);
    }
    findOne(id) {
        return this.assignorsService.findOne(id);
    }
    update(id, updateAssignorDto) {
        return this.assignorsService.update(id, updateAssignorDto);
    }
    remove(id) {
        return this.assignorsService.remove(id);
    }
};
exports.AssignorsController = AssignorsController;
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new assignor',
        description: 'Accessible only by Admin role. Creates a new assignor with specified details.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Assignor successfully created.',
        type: create_assignor_dto_1.CreateAssignorDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_assignor_dto_1.CreateAssignorDto]),
    __metadata("design:returntype", void 0)
], AssignorsController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve all assignors with pagination and search',
        description: 'Returns a paginated list of assignors with optional search functionality. Requires authorization.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        description: 'Search term to filter assignors by name or document',
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
        description: 'Number of assignors per page',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved list of assignors',
        schema: {
            example: {
                data: [
                    {
                        id: '1',
                        name: 'Assignor Name',
                        email: 'assignor@example.com',
                        phone: '1234567890',
                        document: '12345678901',
                        createdAt: '2024-01-01T00:00:00Z',
                        updatedAt: '2024-01-01T00:00:00Z',
                    },
                ],
                total: 50,
                totalPages: 5,
            },
        },
    }),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], AssignorsController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get assignor by ID',
        description: 'Fetches an assignor by their unique ID. Requires authorization.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Unique identifier of the assignor' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Assignor found and retrieved successfully',
        type: assignor_entity_1.AssignorEntity,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Assignor not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssignorsController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update assignor details',
        description: 'Updates the information of a specific assignor by ID. Requires authorization.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Unique identifier of the assignor' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Assignor successfully updated',
        type: assignor_entity_1.AssignorEntity,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Assignor not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_assignor_dto_1.UpdateAssignorDto]),
    __metadata("design:returntype", void 0)
], AssignorsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete an assignor',
        description: 'Deletes a specific assignor by ID. Requires authorization.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Unique identifier of the assignor' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Assignor successfully deleted',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Assignor not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssignorsController.prototype, "remove", null);
exports.AssignorsController = AssignorsController = __decorate([
    (0, swagger_1.ApiTags)('Assignors'),
    (0, swagger_1.ApiExtraModels)(create_assignor_dto_1.CreateAssignorDto, update_assignor_dto_1.UpdateAssignorDto, assignor_entity_1.AssignorEntity),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('assignor'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [assignors_service_1.AssignorsService])
], AssignorsController);
//# sourceMappingURL=assignors.controller.js.map