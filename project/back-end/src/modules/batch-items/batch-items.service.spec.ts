import { Test, TestingModule } from '@nestjs/testing';
import { BatchItemsService } from './batch-items.service';
import { PrismaService } from '../../database/prisma.service';
import { CreateBatchItemDto } from './dto/create-batch-item.dto';
import { UpdateBatchItemDto } from './dto/update-batch-item.dto';

describe('BatchItemsService', () => {
  let service: BatchItemsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BatchItemsService,
        {
          provide: PrismaService,
          useValue: {
            batchItem: {
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

    service = module.get<BatchItemsService>(BatchItemsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a batch item', async () => {
      const dto: CreateBatchItemDto = {
        batchId: '123',
        payableId: '456',
        status: 'pending',
        retryCount: 0,
      };
      const result = {
        id: '1',
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.batchItem, 'create').mockResolvedValue(result);

      expect(await service.create(dto)).toEqual(result);
      expect(prisma.batchItem.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of batch items', async () => {
      const result = {
        data: [],
        total: 0,
        total_pages: 0,
      };

      jest.spyOn(prisma.batchItem, 'findMany').mockResolvedValue([]);
      jest.spyOn(prisma.batchItem, 'count').mockResolvedValue(0);

      expect(await service.findAll(undefined, 1, 10)).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a batch item by ID', async () => {
      const id = '1';
      const result = {
        id,
        batchId: '123',
        payableId: '456',
        status: 'pending',
        retryCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.batchItem, 'findUnique').mockResolvedValue(result);

      expect(await service.findOne(id)).toEqual(result);
      expect(prisma.batchItem.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('update', () => {
    it('should update a batch item', async () => {
      const id = '1';
      const dto: UpdateBatchItemDto = { status: 'completed' };
      const result = {
        id,
        batchId: '123',
        payableId: '456',
        status: 'completed',
        retryCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.batchItem, 'update').mockResolvedValue(result);

      expect(await service.update(id, dto)).toEqual(result);
      expect(prisma.batchItem.update).toHaveBeenCalledWith({
        where: { id },
        data: dto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a batch item', async () => {
      const id = '1';
      const result = {
        id,
        batchId: '123',
        payableId: '456',
        status: 'pending',
        retryCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.batchItem, 'delete').mockResolvedValue(result);

      expect(await service.remove(id)).toEqual(result);
      expect(prisma.batchItem.delete).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
