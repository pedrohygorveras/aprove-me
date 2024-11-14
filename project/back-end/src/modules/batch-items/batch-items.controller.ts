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
import { BatchItemsService } from './batch-items.service';
import { CreateBatchItemDto } from './dto/create-batch-item.dto';
import { UpdateBatchItemDto } from './dto/update-batch-item.dto';
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
import { BatchItemEntity } from './entities/batch-item.entity';

@ApiTags('Batch Items')
@ApiExtraModels(CreateBatchItemDto, UpdateBatchItemDto, BatchItemEntity)
@ApiBearerAuth()
@Controller('batch-items')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BatchItemsController {
  constructor(private readonly batchItemsService: BatchItemsService) {}

  /**
   * Create a new batch item
   */
  @Roles('Admin')
  @Post()
  @ApiOperation({
    summary: 'Create a new batch item',
    description:
      'Accessible only by Admin role. Creates a new batch item record.',
  })
  @ApiResponse({
    status: 201,
    description: 'Batch item successfully created.',
    type: BatchItemEntity,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createBatchItemDto: CreateBatchItemDto) {
    return this.batchItemsService.create(createBatchItemDto);
  }

  /**
   * Retrieve all batch items with pagination and optional batch ID filter
   */
  @Roles('Admin')
  @Get()
  @ApiOperation({
    summary: 'Retrieve all batch items with pagination',
    description:
      'Returns a paginated list of batch items. Requires authorization. Optionally filter by batch ID.',
  })
  @ApiQuery({
    name: 'batchId',
    required: false,
    description: 'Batch ID to filter batch items',
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
    description: 'Number of batch items per page',
  })
  @ApiResponse({
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
  })
  findAll(
    @Query('batchId') batchId?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.batchItemsService.findAll(batchId, page, limit);
  }

  /**
   * Get batch item by ID
   */
  @Roles('Admin')
  @Get(':id')
  @ApiOperation({
    summary: 'Get batch item by ID',
    description:
      'Fetches a batch item by its unique ID. Requires authorization.',
  })
  @ApiParam({ name: 'id', description: 'Unique identifier of the batch item' })
  @ApiResponse({
    status: 200,
    description: 'Batch item found and retrieved successfully',
    type: BatchItemEntity,
  })
  @ApiResponse({ status: 404, description: 'Batch item not found' })
  findOne(@Param('id') id: string) {
    return this.batchItemsService.findOne(id);
  }

  /**
   * Update batch item details
   */
  @Roles('Admin')
  @Patch(':id')
  @ApiOperation({
    summary: 'Update batch item details',
    description:
      'Updates the information of a specific batch item by ID. Requires authorization.',
  })
  @ApiParam({ name: 'id', description: 'Unique identifier of the batch item' })
  @ApiResponse({
    status: 200,
    description: 'Batch item successfully updated',
    type: BatchItemEntity,
  })
  @ApiResponse({ status: 404, description: 'Batch item not found' })
  update(
    @Param('id') id: string,
    @Body() updateBatchItemDto: UpdateBatchItemDto,
  ) {
    return this.batchItemsService.update(id, updateBatchItemDto);
  }

  /**
   * Delete a batch item
   */
  @Roles('Admin')
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a batch item',
    description: 'Deletes a specific batch item by ID. Requires authorization.',
  })
  @ApiParam({ name: 'id', description: 'Unique identifier of the batch item' })
  @ApiResponse({
    status: 200,
    description: 'Batch item successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Batch item not found' })
  remove(@Param('id') id: string) {
    return this.batchItemsService.remove(id);
  }
}
