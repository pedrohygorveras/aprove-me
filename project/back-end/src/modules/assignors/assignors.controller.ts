import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AssignorsService } from './assignors.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiExtraModels,
} from '@nestjs/swagger';
import { AssignorEntity } from './entities/assignor.entity';

@ApiTags('Assignors')
@ApiExtraModels(CreateAssignorDto, UpdateAssignorDto, AssignorEntity)
@ApiBearerAuth()
@Controller('assignor')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AssignorsController {
  constructor(private readonly assignorsService: AssignorsService) {}

  /**
   * Create a new assignor
   */
  @Roles('Admin', 'Operator', 'Auditor', 'Manager', 'Support')
  @Post()
  @ApiOperation({
    summary: 'Create a new assignor',
    description:
      'Accessible only by Admin role. Creates a new assignor with specified details.',
  })
  @ApiResponse({
    status: 201,
    description: 'Assignor successfully created.',
    type: CreateAssignorDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorsService.create(createAssignorDto);
  }

  /**
   * Retrieve all assignors with pagination and search
   */
  @Roles('Admin', 'Operator', 'Auditor', 'Manager', 'Support')
  @Get()
  @ApiOperation({
    summary: 'Retrieve all assignors with pagination and search',
    description:
      'Returns a paginated list of assignors with optional search functionality. Requires authorization.',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search term to filter assignors by name or document',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of assignors per page',
  })
  @ApiResponse({
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
  })
  findAll(
    @Query('search') search?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    return this.assignorsService.findAll(search, pageNumber, limitNumber);
  }

  /**
   * Get assignor by ID
   */
  @Roles('Admin', 'Operator', 'Auditor', 'Manager', 'Support')
  @Get(':id')
  @ApiOperation({
    summary: 'Get assignor by ID',
    description:
      'Fetches an assignor by their unique ID. Requires authorization.',
  })
  @ApiParam({ name: 'id', description: 'Unique identifier of the assignor' })
  @ApiResponse({
    status: 200,
    description: 'Assignor found and retrieved successfully',
    type: AssignorEntity,
  })
  @ApiResponse({ status: 404, description: 'Assignor not found' })
  findOne(@Param('id') id: string) {
    return this.assignorsService.findOne(id);
  }

  /**
   * Update assignor details
   */
  @Roles('Admin', 'Operator', 'Auditor', 'Manager', 'Support')
  @Patch(':id')
  @ApiOperation({
    summary: 'Update assignor details',
    description:
      'Updates the information of a specific assignor by ID. Requires authorization.',
  })
  @ApiParam({ name: 'id', description: 'Unique identifier of the assignor' })
  @ApiResponse({
    status: 200,
    description: 'Assignor successfully updated',
    type: AssignorEntity,
  })
  @ApiResponse({ status: 404, description: 'Assignor not found' })
  update(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto,
  ) {
    return this.assignorsService.update(id, updateAssignorDto);
  }

  /**
   * Delete an assignor
   */
  @Roles('Admin', 'Operator', 'Auditor', 'Manager', 'Support')
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an assignor',
    description: 'Deletes a specific assignor by ID. Requires authorization.',
  })
  @ApiParam({ name: 'id', description: 'Unique identifier of the assignor' })
  @ApiResponse({
    status: 200,
    description: 'Assignor successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Assignor not found' })
  remove(@Param('id') id: string) {
    return this.assignorsService.remove(id);
  }
}
