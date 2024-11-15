import { Test, TestingModule } from '@nestjs/testing';
import { BatchItemsController } from './batch-items.controller';
import { BatchItemsService } from './batch-items.service';
import { CreateBatchItemDto } from './dto/create-batch-item.dto';
import { UpdateBatchItemDto } from './dto/update-batch-item.dto';

describe('BatchItemsController', () => {
  let controller: BatchItemsController;
  let service: BatchItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BatchItemsController],
      providers: [
        {
          provide: BatchItemsService,
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

    controller = module.get<BatchItemsController>(BatchItemsController);
    service = module.get<BatchItemsService>(BatchItemsService);
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

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of batch items', async () => {
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

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(id);
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

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id, dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(id, dto);
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

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove(id)).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
