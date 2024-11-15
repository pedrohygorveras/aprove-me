import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findByLogin: jest.fn(),
            findOne: jest.fn(),
            saveRefreshToken: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return the user if credentials are valid', async () => {
      const mockUser = {
        id: '1',
        username: 'johndoe',
        email: 'john.doe@example.com',
        name: 'John Doe',
        password: await bcrypt.hash('password', 10),
        role: 'Admin',
        refreshToken: 'mockRefreshToken',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(usersService, 'findByLogin').mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

      const result = await service.validateUser('username', 'password');

      expect(result).toEqual(mockUser);
      expect(usersService.findByLogin).toHaveBeenCalledWith('username');
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      jest.spyOn(usersService, 'findByLogin').mockResolvedValue(null);

      await expect(
        service.validateUser('username', 'wrongpassword'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('should return access and refresh tokens along with user payload', async () => {
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
      };
      const mockAccessToken = 'mockAccessToken';
      const mockRefreshToken = 'mockRefreshToken';

      jest.spyOn(jwtService, 'sign').mockImplementation((payload, options) => {
        if (options.expiresIn === process.env.ACCESS_TOKEN_EXPIRATION) {
          return mockAccessToken;
        } else if (options.expiresIn === process.env.REFRESH_TOKEN_EXPIRATION) {
          return mockRefreshToken;
        }
      });
      jest.spyOn(usersService, 'saveRefreshToken').mockResolvedValue(undefined);

      const result = await service.login(mockUser);

      expect(result).toEqual({
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
        user: {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role,
        },
      });

      expect(usersService.saveRefreshToken).toHaveBeenCalledWith(
        mockUser.id,
        mockRefreshToken,
      );
    });
  });

  describe('login', () => {
    it('should return access and refresh tokens along with user payload', async () => {
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
        refreshToken: 'mockOldRefreshToken',
      };
      const mockAccessToken = 'mockAccessToken';
      const mockRefreshToken = 'mockRefreshToken';

      jest.spyOn(jwtService, 'sign').mockImplementation((payload, options) => {
        if (options.expiresIn === process.env.ACCESS_TOKEN_EXPIRATION) {
          return mockAccessToken;
        } else if (options.expiresIn === process.env.REFRESH_TOKEN_EXPIRATION) {
          return mockRefreshToken;
        }
      });

      jest.spyOn(usersService, 'saveRefreshToken').mockResolvedValue(undefined);

      const result = await service.login(mockUser);

      expect(result).toEqual({
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
        user: {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role,
        },
      });

      expect(usersService.saveRefreshToken).toHaveBeenCalledWith(
        mockUser.id,
        mockRefreshToken,
      );
    });
  });
});
