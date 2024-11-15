import { Test, TestingModule } from '@nestjs/testing';
import { PayablesController } from './payables.controller';
import { PayablesService } from './payables.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';

describe('PayablesController', () => {
  let controller: PayablesController;
  let service: PayablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayablesController],
      providers: [
        {
          provide: PayablesService,
          useValue: {
            create: jest.fn(),
            createBatchWithQueue: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PayablesController>(PayablesController);
    service = module.get<PayablesService>(PayablesService);
  });

  describe('create', () => {
    it('should create a payable', async () => {
      const dto: CreatePayableDto = {
        assignorId: '123',
        value: 1000,
        emissionDate: new Date('2024-01-01T00:00:00Z'),
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
    it('should return a paginated list of payables', async () => {
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
    it('should return a payable by ID', async () => {
      const id = '1';
      const result = {
        id,
        assignorId: '123',
        value: 1000,
        emissionDate: new Date('2024-01-01T00:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a payable', async () => {
      const id = '1';
      const dto: UpdatePayableDto = { value: 2000 };
      const result = {
        id,
        assignorId: '123',
        value: 2000,
        emissionDate: new Date('2024-01-01T00:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id, dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should delete a payable', async () => {
      const id = '1';
      const result = {
        id,
        assignorId: '123',
        value: 1000,
        emissionDate: new Date('2024-01-01T00:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove(id)).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
