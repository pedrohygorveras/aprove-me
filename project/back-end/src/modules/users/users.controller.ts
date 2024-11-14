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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
import { UserEntity } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { PartialUserEntity } from './entities/partial-user.entity';

@ApiTags('Users')
@ApiExtraModels(LoginDto, CreateUserDto, UpdateUserDto, UserEntity)
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create a new user
   */
  @Roles('Admin')
  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description:
      'Accessible only by Admin role. Creates a new user with specified details.',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully created.',
    type: UserEntity,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Retrieve all users with pagination and search
   */
  @Roles('Admin')
  @Get()
  @ApiOperation({
    summary: 'Retrieve all users with pagination and search',
    description:
      'Returns a paginated list of users with optional search functionality. Requires authorization.',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search term to filter users by login or role',
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
    description: 'Number of users per page',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved list of users',
    schema: {
      example: {
        data: [
          {
            id: '1',
            name: 'User Name',
            login: 'user1',
            email: 'user1@example.com',
            role: 'Admin',
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
    return this.usersService.findAll(search, page, limit);
  }

  /**
   * Get user by ID
   */
  @Roles('Admin')
  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Fetches a user by their unique ID. Requires authorization.',
  })
  @ApiParam({ name: 'id', description: 'Unique identifier of the user' })
  @ApiResponse({
    status: 200,
    description: 'User found and retrieved successfully',
    type: PartialUserEntity,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Update user details
   */
  @Roles('Admin')
  @Patch(':id')
  @ApiOperation({
    summary: 'Update user details',
    description:
      'Updates the information of a specific user by ID. Requires authorization.',
  })
  @ApiParam({ name: 'id', description: 'Unique identifier of the user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully updated',
    type: UserEntity,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Delete a user
   */
  @Roles('Admin')
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user',
    description: 'Deletes a specific user by ID. Requires authorization.',
  })
  @ApiParam({ name: 'id', description: 'Unique identifier of the user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
