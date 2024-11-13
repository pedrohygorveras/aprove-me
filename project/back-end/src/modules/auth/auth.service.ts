import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET;
  private readonly accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION;
  private readonly refreshTokenExpiration =
    process.env.REFRESH_TOKEN_EXPIRATION;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string) {
    const user = await this.usersService.findByLogin(login);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid login credentials');
  }

  async login(user: any) {
    const payload = {
      id: user.id,
      login: user.login,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.accessTokenExpiration,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.refreshTokenExpiration,
    });

    await this.usersService.saveRefreshToken(user.id, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.jwtSecret,
      });
      const user = await this.usersService.findOne(payload.id);

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException();
      }

      const newAccessToken = this.jwtService.sign(
        {
          id: user.id,
          login: user.login,
          role: user.role,
        },
        { expiresIn: this.accessTokenExpiration },
      );

      return { access_token: newAccessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}