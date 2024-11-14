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
} from '@nestjs/swagger';
import { PayableEntity } from './entities/payable.entity';

@ApiTags('Payables')
@ApiExtraModels(CreatePayableDto, UpdatePayableDto, PayableEntity)
@ApiBearerAuth()
@Controller('payables')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) {}

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
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.payablesService.findAll(search, page, limit);
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
