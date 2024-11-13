import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

@Injectable()
export class AssignorsService {
  constructor(private prisma: PrismaService) {}

  async create(createAssignorDto: CreateAssignorDto) {
    return this.prisma.assignor.create({
      data: {
        name: createAssignorDto.name,
        email: createAssignorDto.email,
        phone: createAssignorDto.phone,
        document: createAssignorDto.document,
      },
    });
  }

  async findAll(search?: string, page: number = 1, limit: number = 10) {
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

  findOne(id: string) {
    return this.prisma.assignor.findUnique({
      where: { id },
    });
  }

  update(id: string, updateAssignorDto: UpdateAssignorDto) {
    return this.prisma.assignor.update({
      where: { id },
      data: { ...updateAssignorDto },
    });
  }

  remove(id: string) {
    return this.prisma.assignor.delete({
      where: { id },
    });
  }
}
