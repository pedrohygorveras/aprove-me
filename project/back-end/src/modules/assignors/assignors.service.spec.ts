import { Test, TestingModule } from '@nestjs/testing';
import { AssignorsService } from './assignors.service';
import { PrismaService } from '../../database/prisma.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

describe('AssignorsService', () => {
  let service: AssignorsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignorsService,
        {
          provide: PrismaService,
          useValue: {
            assignor: {
              create: jest.fn(),
              findMany: jest.fn(),
              count: jest.fn(),
              findUniqueOrThrow: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AssignorsService>(AssignorsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an assignor', async () => {
      const dto: CreateAssignorDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        document: '12345678901',
      };
      const result = {
        id: '1',
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.assignor, 'create').mockResolvedValue(result);

      expect(await service.create(dto)).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of assignors', async () => {
      const result = {
        data: [
          {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1234567890',
            document: '12345678901',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        total: 1,
        total_pages: 1,
      };

      jest.spyOn(prisma.assignor, 'findMany').mockResolvedValue(result.data);
      jest.spyOn(prisma.assignor, 'count').mockResolvedValue(result.total);

      expect(await service.findAll(undefined, 1, 10)).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return an assignor by ID', async () => {
      const id = '1';
      const result = {
        id,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        document: '12345678901',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(prisma.assignor, 'findUniqueOrThrow')
        .mockResolvedValue(result);

      expect(await service.findOne(id)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update an assignor', async () => {
      const id = '1';
      const dto: UpdateAssignorDto = { name: 'Jane Doe' };
      const result = {
        id,
        name: 'Jane Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        document: '12345678901',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.assignor, 'update').mockResolvedValue(result);

      expect(await service.update(id, dto)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should delete an assignor', async () => {
      const id = '1';
      const result = {
        id,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        document: '12345678901',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.assignor, 'delete').mockResolvedValue(result);

      expect(await service.remove(id)).toEqual(result);
    });
  });
});
