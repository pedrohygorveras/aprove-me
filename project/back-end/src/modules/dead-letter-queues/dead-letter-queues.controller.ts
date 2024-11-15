import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DeadLetterQueuesService } from './dead-letter-queues.service';
import { CreateDeadLetterQueueDto } from './dto/create-dead-letter-queue.dto';
import { UpdateDeadLetterQueueDto } from './dto/update-dead-letter-queue.dto';
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
import { DeadLetterQueueEntity } from './entities/dead-letter-queue.entity';

@ApiTags('Dead Letter Queues')
@ApiExtraModels(
  CreateDeadLetterQueueDto,
  UpdateDeadLetterQueueDto,
  DeadLetterQueueEntity,
)
@ApiBearerAuth()
@Controller('dead-letter-queue')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DeadLetterQueuesController {
  constructor(
    private readonly deadLetterQueuesService: DeadLetterQueuesService,
  ) {}

  /**
   * Create a new dead letter queue item
   */
  @Roles('Admin')
  @Post()
  @ApiOperation({
    summary: 'Create a new dead letter queue item',
    description:
      'Accessible only by Admin role. Creates a new dead letter queue record.',
  })
  @ApiResponse({
    status: 201,
    description: 'Dead letter queue item successfully created.',
    type: DeadLetterQueueEntity,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createDeadLetterQueueDto: CreateDeadLetterQueueDto) {
    return this.deadLetterQueuesService.create(createDeadLetterQueueDto);
  }

  /**
   * Retrieve all dead letter queue items with pagination and optional payableId filter
   */
  @Roles('Admin')
  @Get()
  @ApiOperation({
    summary: 'Retrieve all dead letter queue items with pagination',
    description:
      'Returns a paginated list of dead letter queue items. Requires authorization. Optionally filter by payableId.',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search term to filter dead letter queue items by payableId',
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
    description: 'Number of dead letter queue items per page',
  })
  @ApiResponse({
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
  })
  findAll(
    @Query('search') search?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.deadLetterQueuesService.findAll(search, page, limit);
  }

  /**
   * Get dead letter queue item by ID
   */
  @Roles('Admin')
  @Get(':id')
  @ApiOperation({
    summary: 'Get dead letter queue item by ID',
    description:
      'Fetches a dead letter queue item by its unique ID. Requires authorization.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the dead letter queue item',
  })
  @ApiResponse({
    status: 200,
    description: 'Dead letter queue item found and retrieved successfully',
    type: DeadLetterQueueEntity,
  })
  @ApiResponse({ status: 404, description: 'Dead letter queue item not found' })
  findOne(@Param('id') id: string) {
    return this.deadLetterQueuesService.findOne(id);
  }

  /**
   * Update dead letter queue item details
   */
  @Roles('Admin')
  @Patch(':id')
  @ApiOperation({
    summary: 'Update dead letter queue item details',
    description:
      'Updates the information of a specific dead letter queue item by ID. Requires authorization.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the dead letter queue item',
  })
  @ApiResponse({
    status: 200,
    description: 'Dead letter queue item successfully updated',
    type: DeadLetterQueueEntity,
  })
  @ApiResponse({ status: 404, description: 'Dead letter queue item not found' })
  update(
    @Param('id') id: string,
    @Body() updateDeadLetterQueueDto: UpdateDeadLetterQueueDto,
  ) {
    return this.deadLetterQueuesService.update(id, updateDeadLetterQueueDto);
  }

  /**
   * Delete a dead letter queue item
   */
  @Roles('Admin')
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a dead letter queue item',
    description:
      'Deletes a specific dead letter queue item by ID. Requires authorization.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the dead letter queue item',
  })
  @ApiResponse({
    status: 200,
    description: 'Dead letter queue item successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Dead letter queue item not found' })
  remove(@Param('id') id: string) {
    return this.deadLetterQueuesService.remove(id);
  }
}
