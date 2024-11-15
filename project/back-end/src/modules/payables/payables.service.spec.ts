import { Test, TestingModule } from '@nestjs/testing';
import { PayablesService } from './payables.service';
import { PrismaService } from '../../database/prisma.service';
import { BatchsService } from '../batchs/batchs.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';

describe('PayablesService', () => {
  let service: PayablesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayablesService,
        {
          provide: PrismaService,
          useValue: {
            payable: {
              create: jest.fn(),
              findMany: jest.fn(),
              count: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        {
          provide: BatchsService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: AmqpConnection,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PayablesService>(PayablesService);
    prisma = module.get<PrismaService>(PrismaService);
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

      jest.spyOn(prisma.payable, 'create').mockResolvedValue(result);

      expect(await service.create(dto)).toEqual(result);
      expect(prisma.payable.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of payables', async () => {
      const result = {
        data: [],
        total: 0,
        total_pages: 0,
      };

      jest.spyOn(prisma.payable, 'findMany').mockResolvedValue([]);
      jest.spyOn(prisma.payable, 'count').mockResolvedValue(0);

      expect(await service.findAll(undefined, 1, 10)).toEqual(result);
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

      jest.spyOn(prisma.payable, 'findUnique').mockResolvedValue(result);

      expect(await service.findOne(id)).toEqual(result);
      expect(prisma.payable.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
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

      jest.spyOn(prisma.payable, 'update').mockResolvedValue(result);

      expect(await service.update(id, dto)).toEqual(result);
      expect(prisma.payable.update).toHaveBeenCalledWith({
        where: { id },
        data: dto,
      });
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

      jest.spyOn(prisma.payable, 'delete').mockResolvedValue(result);

      expect(await service.remove(id)).toEqual(result);
      expect(prisma.payable.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
