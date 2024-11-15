import { Test, TestingModule } from '@nestjs/testing';
import { BatchsService } from './batchs.service';
import { PrismaService } from '../../database/prisma.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';

describe('BatchsService', () => {
  let service: BatchsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BatchsService,
        {
          provide: PrismaService,
          useValue: {
            batch: {
              create: jest.fn(),
              findMany: jest.fn(),
              count: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<BatchsService>(BatchsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a batch', async () => {
      const dto: CreateBatchDto = {
        processing: true,
        totalSuccess: 5,
        totalFailed: 3,
        total: 8,
      };
      const result = {
        id: '1',
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.batch, 'create').mockResolvedValue(result);

      expect(await service.create(dto)).toEqual(result);
      expect(prisma.batch.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of batches', async () => {
      const result = {
        data: [],
        total: 0,
        total_pages: 0,
      };

      jest.spyOn(prisma.batch, 'findMany').mockResolvedValue([]);
      jest.spyOn(prisma.batch, 'count').mockResolvedValue(0);

      expect(await service.findAll(1, 10)).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a batch by ID', async () => {
      const id = '1';
      const result = {
        id,
        processing: true,
        totalSuccess: 5,
        totalFailed: 3,
        total: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.batch, 'findUnique').mockResolvedValue(result);

      expect(await service.findOne(id)).toEqual(result);
      expect(prisma.batch.findUnique).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('update', () => {
    it('should update a batch', async () => {
      const id = '1';
      const dto: UpdateBatchDto = { totalSuccess: 10 };
      const result = {
        id,
        processing: true,
        totalSuccess: 10,
        totalFailed: 3,
        total: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.batch, 'update').mockResolvedValue(result);

      expect(await service.update(id, dto)).toEqual(result);
      expect(prisma.batch.update).toHaveBeenCalledWith({
        where: { id },
        data: dto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a batch', async () => {
      const id = '1';
      const result = {
        id,
        processing: true,
        totalSuccess: 5,
        totalFailed: 3,
        total: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.batch, 'delete').mockResolvedValue(result);

      expect(await service.remove(id)).toEqual(result);
      expect(prisma.batch.delete).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
