import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

@Injectable()
export class AssignorsService {
  constructor(private prisma: PrismaService) {}

  async create(createAssignorDto: CreateAssignorDto) {
    return this.prisma.assignor.create({
      data: { ...createAssignorDto },
    });
  }

  async findAll(search?: string, page = 1, limit = 10) {
    const whereClause = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { document: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [assignors, total] = await Promise.all([
      this.prisma.assignor.findMany({
        where: whereClause,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          document: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prisma.assignor.count({ where: whereClause }),
    ]);

    return {
      data: assignors,
      total,
      total_pages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    return this.prisma.assignor.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: string, updateAssignorDto: UpdateAssignorDto) {
    return this.prisma.assignor.update({
      where: { id },
      data: { ...updateAssignorDto },
    });
  }

  async remove(id: string) {
    return this.prisma.assignor.delete({
      where: { id },
    });
  }
}
