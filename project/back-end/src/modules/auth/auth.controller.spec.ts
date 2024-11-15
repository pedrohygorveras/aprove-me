import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            refreshToken: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a JWT token and user info on successful login', async () => {
      const mockUser = {
        id: '123',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
      };
      const mockTokens = {
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken',
        user: mockUser,
      };

      jest.spyOn(service, 'login').mockResolvedValue(mockTokens);

      const result = await controller.login({ user: mockUser });

      expect(result).toEqual(mockTokens);
      expect(service.login).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('refreshToken', () => {
    it('should return new tokens when a valid refresh token is provided', async () => {
      const mockRefreshToken = 'mockRefreshToken';
      const mockTokens = {
        accessToken: 'newMockAccessToken',
        refreshToken: 'newMockRefreshToken',
        user: {
          id: '123',
          name: 'John Doe',
          email: 'john.doe@example.com',
          role: 'Admin',
        },
      };

      jest.spyOn(service, 'refreshToken').mockResolvedValue(mockTokens);

      const result = await controller.refreshToken(mockRefreshToken);

      expect(result).toEqual(mockTokens);
      expect(service.refreshToken).toHaveBeenCalledWith(mockRefreshToken);
    });

    it('should throw UnauthorizedException if refresh token is invalid', async () => {
      const mockRefreshToken = 'invalidRefreshToken';

      jest
        .spyOn(service, 'refreshToken')
        .mockRejectedValue(new UnauthorizedException('Invalid refresh token'));

      await expect(controller.refreshToken(mockRefreshToken)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(service.refreshToken).toHaveBeenCalledWith(mockRefreshToken);
    });
  });
});
