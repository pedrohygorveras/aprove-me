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
import { PayablesService } from './payables.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
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
  ApiBody,
} from '@nestjs/swagger';
import { PayableEntity } from './entities/payable.entity';

@ApiTags('Payables')
@ApiExtraModels(CreatePayableDto, UpdatePayableDto, PayableEntity)
@ApiBearerAuth()
@Controller('payable')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) {}

  /**
   * Process batch of payables asynchronously
   */
  @Roles('Admin')
  @Post('batch')
  @ApiOperation({
    summary: 'Process batch of payables',
    description:
      'Allows administrators to process a batch of payables. The batch is queued for asynchronous processing, with a maximum of 10,000 records.',
  })
  @ApiResponse({
    status: 202,
    description: 'Batch successfully queued for asynchronous processing.',
    schema: {
      example: {
        message: 'Batch received and queued successfully',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Batch size exceeds the allowed limit.',
    schema: {
      example: {
        statusCode: 400,
        message: 'Batch size cannot exceed 10,000 payables',
        error: 'Bad Request',
      },
    },
  })
  @ApiBody({
    description:
      'Array of CreatePayableDto objects representing the payables to be processed',
    type: [CreatePayableDto],
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
  })
  async createBatchWithQueue(@Body() batchItems: CreatePayableDto[]) {
    return this.payablesService.createBatchWithQueue(batchItems);
  }

  /**
   * Create a new payable
   */
  @Roles('Admin')
  @Post()
  @ApiOperation({
    summary: 'Create a new payable',
    description: 'Accessible only by Admin role. Creates a new payable record.',
  })
  @ApiResponse({
    status: 201,
    description: 'Payable successfully created.',
    type: PayableEntity,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createPayableDto: CreatePayableDto) {
    return this.payablesService.create(createPayableDto);
  }

  /**
   * Retrieve all payables with pagination and optional filters
   */
  @Roles('Admin')
  @Get()
  @ApiOperation({
    summary: 'Retrieve all payables with pagination',
    description:
      'Returns a paginated list of payables. Requires authorization.',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search term to filter payables by assignor ID or value',
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
    description: 'Number of payables per page',
  })
  @ApiResponse({
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
  })
  findAll(
    @Query('search') search?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    return this.payablesService.findAll(search, pageNumber, limitNumber);
  }

  /**
   * Get payable by ID
   */
  @Roles('Admin')
  @Get(':id')
  @ApiOperation({
    summary: 'Get payable by ID',
    description: 'Fetches a payable by its unique ID. Requires authorization.',
  })
  @ApiParam({ name: 'id', description: 'Unique identifier of the payable' })
  @ApiResponse({
    status: 200,
    description: 'Payable found and retrieved successfully',
    type: PayableEntity,
  })
  @ApiResponse({ status: 404, description: 'Payable not found' })
  findOne(@Param('id') id: string) {
    return this.payablesService.findOne(id);
  }

  /**
   * Update payable details
   */
  @Roles('Admin')
  @Patch(':id')
  @ApiOperation({
    summary: 'Update payable details',
    description:
      'Updates the information of a specific payable by ID. Requires authorization.',
  })
  @ApiParam({ name: 'id', description: 'Unique identifier of the payable' })
  @ApiResponse({
    status: 200,
    description: 'Payable successfully updated',
    type: PayableEntity,
  })
  @ApiResponse({ status: 404, description: 'Payable not found' })
  update(@Param('id') id: string, @Body() updatePayableDto: UpdatePayableDto) {
    return this.payablesService.update(id, updatePayableDto);
  }

  /**
   * Delete a payable
   */
  @Roles('Admin')
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a payable',
    description: 'Deletes a specific payable by ID. Requires authorization.',
  })
  @ApiParam({ name: 'id', description: 'Unique identifier of the payable' })
  @ApiResponse({
    status: 200,
    description: 'Payable successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Payable not found' })
  remove(@Param('id') id: string) {
    return this.payablesService.remove(id);
  }
}
