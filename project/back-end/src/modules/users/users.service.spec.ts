import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '../common/constants/permissions/role.enum';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              count: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      const dto: CreateUserDto = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password123',
        role: UserRole.Admin,
      };
      const hash = '$2a$10$fixedHashForTestingPurpose';
      const result = {
        id: '1',
        name: dto.name,
        username: dto.username,
        email: dto.email,
        password: hash,
        role: dto.role,
        refreshToken: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hash as never);
      jest.spyOn(prisma.user, 'create').mockResolvedValue(result as never);

      expect(await service.create(dto)).toEqual(result);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: { ...dto, password: hash },
      });
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of users', async () => {
      const result = {
        data: [],
        total: 0,
        total_pages: 0,
      };

      jest.spyOn(prisma.user, 'findMany').mockResolvedValue([]);
      jest.spyOn(prisma.user, 'count').mockResolvedValue(0);

      expect(await service.findAll(undefined, 1, 10)).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const id = '1';
      const result = {
        id,
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'hashedPassword123',
        role: UserRole.Admin,
        refreshToken: 'mockRefreshToken',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(result);

      expect(await service.findOne(id)).toEqual(result);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = '1';
      const dto: UpdateUserDto = { name: 'Jane Doe' };
      const result = {
        id,
        name: 'Jane Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'hashedPassword123',
        role: UserRole.Admin,
        refreshToken: 'mockRefreshToken',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.user, 'update').mockResolvedValue(result);

      expect(await service.update(id, dto)).toEqual(result);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id },
        data: dto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const id = '1';
      const result = {
        id,
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'hashedPassword123',
        role: UserRole.Admin,
        refreshToken: 'mockRefreshToken',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.user, 'delete').mockResolvedValue(result);

      expect(await service.remove(id)).toEqual(result);
      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
