import { Test, TestingModule } from '@nestjs/testing';
import { BatchsController } from './batchs.controller';
import { BatchsService } from './batchs.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';

describe('BatchsController', () => {
  let controller: BatchsController;
  let service: BatchsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BatchsController],
      providers: [
        {
          provide: BatchsService,
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

    controller = module.get<BatchsController>(BatchsController);
    service = module.get<BatchsService>(BatchsService);
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

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of batches', async () => {
      const result = {
        data: [],
        total: 0,
        total_pages: 0,
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll('1', '10')).toEqual(result);
      expect(service.findAll).toHaveBeenCalledWith(1, 10);
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

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(id);
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

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id, dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(id, dto);
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

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove(id)).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
