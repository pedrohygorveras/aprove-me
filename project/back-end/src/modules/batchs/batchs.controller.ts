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
import { BatchsService } from './batchs.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiExtraModels,
  ApiQuery,
} from '@nestjs/swagger';
import { BatchEntity } from './entities/batch.entity';

@ApiTags('Batchs')
@ApiExtraModels(CreateBatchDto, UpdateBatchDto, BatchEntity)
@ApiBearerAuth()
@Controller('batch')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BatchsController {
  constructor(private readonly batchsService: BatchsService) {}

  /**
   * Create a new batch
   */
  @Roles('Admin')
  @Post()
  @ApiOperation({
    summary: 'Create a new batch',
    description: 'Accessible only by Admin role. Creates a new batch record.',
  })
  @ApiResponse({
    status: 201,
    description: 'Batch successfully created.',
    type: BatchEntity,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createBatchDto: CreateBatchDto) {
    return this.batchsService.create(createBatchDto);
  }

  /**
   * Retrieve all batches with pagination
   */
  @Roles('Admin')
  @Get()
  @ApiOperation({
    summary: 'Retrieve all batches with pagination',
    description: 'Returns a paginated list of batches. Requires authorization.',
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
    description: 'Number of batches per page',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved list of batches',
    schema: {
      example: {
        data: [
          {
            id: '1',
            status: 'pending',
            totalSuccess: 5,
            totalFailed: 3,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
          },
        ],
        total: 50,
        totalPages: 5,
      },
    },
  })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.batchsService.findAll(page, limit);
  }

  /**
   * Get batch by ID
   */
  @Roles('Admin')
  @Get(':id')
  @ApiOperation({
    summary: 'Get batch by ID',
    description: 'Fetches a batch by its unique ID. Requires authorization.',
  })
  @ApiParam({ name: 'id', description: 'Unique identifier of the batch' })
  @ApiResponse({
    status: 200,
    description: 'Batch found and retrieved successfully',
    type: BatchEntity,
  })
  @ApiResponse({ status: 404, description: 'Batch not found' })
  findOne(@Param('id') id: string) {
    return this.batchsService.findOne(id);
  }

  /**
   * Update batch details
   */
  @Roles('Admin')
  @Patch(':id')
  @ApiOperation({
    summary: 'Update batch details',
    description:
      'Updates the information of a specific batch by ID. Requires authorization.',
  })
  @ApiParam({ name: 'id', description: 'Unique identifier of the batch' })
  @ApiResponse({
    status: 200,
    description: 'Batch successfully updated',
    type: BatchEntity,
  })
  @ApiResponse({ status: 404, description: 'Batch not found' })
  update(@Param('id') id: string, @Body() updateBatchDto: UpdateBatchDto) {
    return this.batchsService.update(id, updateBatchDto);
  }

  /**
   * Delete a batch
   */
  @Roles('Admin')
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a batch',
    description: 'Deletes a specific batch by ID. Requires authorization.',
  })
  @ApiParam({ name: 'id', description: 'Unique identifier of the batch' })
  @ApiResponse({
    status: 200,
    description: 'Batch successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Batch not found' })
  remove(@Param('id') id: string) {
    return this.batchsService.remove(id);
  }
}
