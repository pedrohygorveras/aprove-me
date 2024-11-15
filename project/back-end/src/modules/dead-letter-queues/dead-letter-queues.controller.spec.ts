import { Test, TestingModule } from '@nestjs/testing';
import { DeadLetterQueuesController } from './dead-letter-queues.controller';
import { DeadLetterQueuesService } from './dead-letter-queues.service';
import { CreateDeadLetterQueueDto } from './dto/create-dead-letter-queue.dto';
import { UpdateDeadLetterQueueDto } from './dto/update-dead-letter-queue.dto';

describe('DeadLetterQueuesController', () => {
  let controller: DeadLetterQueuesController;
  let service: DeadLetterQueuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeadLetterQueuesController],
      providers: [
        {
          provide: DeadLetterQueuesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DeadLetterQueuesController>(
      DeadLetterQueuesController,
    );
    service = module.get<DeadLetterQueuesService>(DeadLetterQueuesService);
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

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of dead letter queue items', async () => {
      const result = {
        data: [],
        total: 0,
        total_pages: 0,
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll(undefined, '1', '10')).toEqual(result);
      expect(service.findAll).toHaveBeenCalledWith(undefined, 1, 10);
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

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(id);
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

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id, dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(id, dto);
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

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove(id)).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
