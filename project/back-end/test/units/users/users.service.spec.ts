import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../src/database/prisma.service';
import { UsersService } from '../../../src/modules/users/users.service';
import { CreateUserDto } from '../../../src/modules/users/dto/create-user.dto';
import { UpdateUserDto } from '../../../src/modules/users/dto/update-user.dto';
import { UserRole } from '../../../src/modules/common/constants/permissions/role.enum';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;
  let userId: string; // Stores the ID of the created user for reuse in other tests

  // Setup module and dependencies before all tests
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  // Close the Prisma connection after all tests
  afterAll(async () => {
    await prisma.$disconnect();
  });

  // Test user creation
  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        login: 'example@example.com',
        password: 'password',
        role: UserRole.Operator,
      };

      const user = await service.create(createUserDto);

      expect(user).toHaveProperty('id');
      expect(user.login).toBe('example@example.com');
      expect(user.password).toBe('password');
      expect(user.role).toBe(UserRole.Operator);
      userId = user.id;
    });
  });

  // Test retrieving all users
  describe('findAll', () => {
    it('should find all users', async () => {
      const users = await service.findAll();
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThan(0);
    });
  });

  // Test retrieving a specific user by ID
  describe('findOne', () => {
    it('should find one user', async () => {
      const user = await service.findOne(userId);
      expect(user).toHaveProperty('id', userId);
      expect(user.login).toBe('example@example.com');
    });
  });

  // Test updating a user
  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        role: UserRole.Auditor,
      };

      const updatedUser = await service.update(userId, updateUserDto);

      expect(updatedUser).toHaveProperty('id', userId);
      expect(updatedUser.role).toBe(UserRole.Auditor);
    });
  });

  // Test deleting a user
  describe('remove', () => {
    it('should remove a user', async () => {
      const deletedUser = await service.remove(userId);
      expect(deletedUser).toHaveProperty('id', userId);

      const user = await service.findOne(userId);
      expect(user).toBeNull();
    });
  });
});
