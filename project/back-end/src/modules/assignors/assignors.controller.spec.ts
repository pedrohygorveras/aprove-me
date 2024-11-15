import { Test, TestingModule } from '@nestjs/testing';
import { AssignorsController } from './assignors.controller';
import { AssignorsService } from './assignors.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

describe('AssignorsController', () => {
  let controller: AssignorsController;
  let service: AssignorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorsController],
      providers: [
        {
          provide: AssignorsService,
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

    controller = module.get<AssignorsController>(AssignorsController);
    service = module.get<AssignorsService>(AssignorsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        document: dto.document,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return a list of assignors', async () => {
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

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll(undefined, '1', '10')).toEqual(result);
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

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toEqual(result);
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

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id, dto)).toEqual(result);
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

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove(id)).toEqual(result);
    });
  });
});
