import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({ description: 'Username', example: 'aproveme' })
  username: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'johndoe@example.com',
  })
  email: string;

  @ApiProperty({ description: 'User password', example: 'aproveme' })
  password?: string;

  @ApiProperty({ description: 'User role', example: 'Admin' })
  role: string;

  @ApiProperty({
    description: 'User refresh token for session management',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    nullable: true,
  })
  refreshToken?: string;

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
