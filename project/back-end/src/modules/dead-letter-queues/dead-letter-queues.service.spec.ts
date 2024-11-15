import { Test, TestingModule } from '@nestjs/testing';
import { DeadLetterQueuesService } from './dead-letter-queues.service';
import { PrismaService } from '../../database/prisma.service';
import { CreateDeadLetterQueueDto } from './dto/create-dead-letter-queue.dto';
import { UpdateDeadLetterQueueDto } from './dto/update-dead-letter-queue.dto';

describe('DeadLetterQueuesService', () => {
  let service: DeadLetterQueuesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeadLetterQueuesService,
        {
          provide: PrismaService,
          useValue: {
            deadLetterQueue: {
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

    service = module.get<DeadLetterQueuesService>(DeadLetterQueuesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a dead letter queue item', async () => {
      const dto: CreateDeadLetterQueueDto = {
        batchId: '123',
        assignorId: '456',
        value: 1000,
        emissionDate: new Date('2024-01-01T00:00:00Z'),
        errorMessage: 'Test error message',
      };
      const result = {
        id: '1',
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.deadLetterQueue, 'create').mockResolvedValue(result);

      expect(await service.create(dto)).toEqual(result);
      expect(prisma.deadLetterQueue.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of dead letter queue items', async () => {
      const result = {
        data: [],
        total: 0,
        total_pages: 0,
      };

      jest.spyOn(prisma.deadLetterQueue, 'findMany').mockResolvedValue([]);
      jest.spyOn(prisma.deadLetterQueue, 'count').mockResolvedValue(0);

      expect(await service.findAll(undefined, 1, 10)).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a dead letter queue item by ID', async () => {
      const id = '1';
      const result = {
        id,
        batchId: '123',
        assignorId: '456',
        value: 1000,
        emissionDate: new Date('2024-01-01T00:00:00Z'),
        errorMessage: 'Test error message',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(prisma.deadLetterQueue, 'findUnique')
        .mockResolvedValue(result);

      expect(await service.findOne(id)).toEqual(result);
      expect(prisma.deadLetterQueue.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('update', () => {
    it('should update a dead letter queue item', async () => {
      const id = '1';
      const dto: UpdateDeadLetterQueueDto = { errorMessage: 'Updated error' };
      const result = {
        id,
        batchId: '123',
        assignorId: '456',
        value: 1000,
        emissionDate: new Date('2024-01-01T00:00:00Z'),
        errorMessage: 'Updated error',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.deadLetterQueue, 'update').mockResolvedValue(result);

      expect(await service.update(id, dto)).toEqual(result);
      expect(prisma.deadLetterQueue.update).toHaveBeenCalledWith({
        where: { id },
        data: dto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a dead letter queue item', async () => {
      const id = '1';
      const result = {
        id,
        batchId: '123',
        assignorId: '456',
        value: 1000,
        emissionDate: new Date('2024-01-01T00:00:00Z'),
        errorMessage: 'Test error message',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.deadLetterQueue, 'delete').mockResolvedValue(result);

      expect(await service.remove(id)).toEqual(result);
      expect(prisma.deadLetterQueue.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
