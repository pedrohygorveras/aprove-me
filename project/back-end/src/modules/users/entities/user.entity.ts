import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({ description: 'User login', example: 'aproveme' })
  login: string;

  @ApiProperty({ description: 'User password', example: 'aproveme' })
  password: string;

  @ApiProperty({ description: 'User role', example: 'Admin' })
  role: string;

  @ApiProperty({
    description: 'Date the user was created',
    example: '2024-01-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date the user was last updated',
    example: '2024-01-01T00:00:00Z',
  })
  updatedAt: Date;
}
