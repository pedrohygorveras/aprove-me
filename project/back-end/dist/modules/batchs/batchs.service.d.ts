import { PrismaService } from '../../database/prisma.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
export declare class BatchsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createBatchDto: CreateBatchDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: number;
        processing: boolean;
        totalSuccess: number;
        totalFailed: number;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            total: number;
            processing: boolean;
            totalSuccess: number;
            totalFailed: number;
        }[];
        total: number;
        total_pages: number;
    }>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__BatchClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: number;
        processing: boolean;
        totalSuccess: number;
        totalFailed: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateBatchDto: UpdateBatchDto): import(".prisma/client").Prisma.Prisma__BatchClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: number;
        processing: boolean;
        totalSuccess: number;
        totalFailed: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__BatchClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: number;
        processing: boolean;
        totalSuccess: number;
        totalFailed: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
