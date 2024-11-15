import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from '../common/constants/permissions/role.enum';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
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

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
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
      const result = {
        id: '1',
        name: dto.name,
        username: dto.username,
        email: dto.email,
        password: dto.password,
        role: dto.role,
        refreshToken: 'mockRefreshToken',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of users', async () => {
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
    it('should return a user by ID', async () => {
      const id = '1';
      const result = {
        id,
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'hashedpassword',
        role: 'Admin',
        refreshToken: 'mockRefreshToken',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = '1';
      const dto: UpdateUserDto = { name: 'Jane Doe' };
      const result = {
        id,
        name: dto.name,
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'hashedpassword',
        role: 'Admin',
        refreshToken: 'mockRefreshToken',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id, dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(id, dto);
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
        password: 'hashedpassword',
        role: 'Admin',
        refreshToken: 'mockRefreshToken',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove(id)).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
