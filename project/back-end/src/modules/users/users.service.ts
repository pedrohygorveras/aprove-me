import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findEmailsByRoles(roles: string[]) {
    return this.prisma.user.findMany({
      where: { role: { in: roles } },
      select: { email: true },
    });
  }

  async findByLogin(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async saveRefreshToken(id: string, refreshToken: string) {
    await this.prisma.user.update({
      where: { id },
      data: { refreshToken },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        username: createUserDto.username,
        email: createUserDto.email,
        password: hash,
        role: createUserDto.role,
      },
    });
  }

  async findAll(search?: string, page: number = 1, limit: number = 10) {
    const whereClause = search
      ? {
          OR: [
            { username: { contains: search } },
            { role: { contains: search } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: whereClause,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prisma.user.count({ where: whereClause }),
    ]);

    return {
      data: users,
      total,
      total_pages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.updatePasswordIfNeeded(id, updateUserDto);
    return this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  private async updatePasswordIfNeeded(
    id: string,
    updateUserDto: UpdateUserDto,
  ) {
    if (updateUserDto.password) {
      const user = await this.findOne(id);
      const isPasswordSame = await bcrypt.compare(
        updateUserDto.password,
        user.password,
      );
      if (!isPasswordSame) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      } else {
        delete updateUserDto.password;
      }
    }
  }
}
