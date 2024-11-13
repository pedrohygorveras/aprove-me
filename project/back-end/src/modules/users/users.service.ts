import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByLogin(login: string) {
    return this.prisma.user.findUnique({
      where: { login },
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
        login: createUserDto.login,
        password: hash,
        role: createUserDto.role,
      },
    });
  }

  async findAll(search?: string, page: number = 1, limit: number = 10) {
    const whereClause = search
      ? {
          OR: [
            { login: { contains: search, mode: 'insensitive' } },
            { role: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: whereClause,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          login: true,
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

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
