import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../../src/modules/users/users.controller';
import { UsersService } from '../../../src/modules/users/users.service';
import { CreateUserDto } from '../../../src/modules/users/dto/create-user.dto';
import { UpdateUserDto } from '../../../src/modules/users/dto/update-user.dto';
import { UserRole } from '../../../src/modules/common/constants/permissions/role.enum';

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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        login: 'testuser@example.com',
        password: 'password',
        role: UserRole.Operator,
      };

      const result = {
        id: '1',
        ...createUserDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createUserDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [
        {
          id: '1',
          login: 'user1',
          password: 'password1',
          role: UserRole.Operator,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          login: 'user2',
          password: 'password2',
          role: UserRole.Support,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const userId = '1';
      const result = {
        id: userId,
        login: 'user1',
        password: 'password1',
        role: UserRole.Operator,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(userId)).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(userId);
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const userId = '1';
      const updateUserDto: UpdateUserDto = { role: UserRole.Auditor };
      const result = {
        id: userId,
        login: 'user1',
        password: 'password1',
        role: UserRole.Auditor,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(userId, updateUserDto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(userId, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const userId = '1';
      const result = {
        id: userId,
        login: 'user1',
        password: 'password1',
        role: UserRole.Operator,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove(userId)).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith(userId);
    });
  });
});
