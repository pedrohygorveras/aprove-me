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

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByLogin(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid login credentials');
  }

  async login(user: any) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
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
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: payload,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken, {
        secret: this.jwtSecret,
      });
      const user = await this.usersService.findOne(data.id);

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException();
      }

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      const newAccessToken = this.jwtService.sign(payload, {
        expiresIn: this.accessTokenExpiration,
      });

      const newRefreshToken = this.jwtService.sign(payload, {
        expiresIn: this.refreshTokenExpiration,
      });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: payload,
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
