import { ApiProperty } from '@nestjs/swagger';

export class AssignorEntity {
  @ApiProperty({
    description: 'Unique identifier of the assignor',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the assignor',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Email of the assignor',
    example: 'johndoe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Phone number of the assignor',
    example: '+12345678901',
  })
  phone: string;

  @ApiProperty({
    description: 'Document identifier of the assignor',
    example: '12345678901',
  })
  document: string;

  @ApiProperty({
    description: 'Date when the assignor was created',
    example: '2024-01-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the assignor was last updated',
    example: '2024-01-01T00:00:00Z',
  })
  updatedAt: Date;
}
