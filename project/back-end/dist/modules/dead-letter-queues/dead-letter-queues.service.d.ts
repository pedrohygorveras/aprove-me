import { PrismaService } from '../../database/prisma.service';
import { CreateDeadLetterQueueDto } from './dto/create-dead-letter-queue.dto';
import { UpdateDeadLetterQueueDto } from './dto/update-dead-letter-queue.dto';
export declare class DeadLetterQueuesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDeadLetterQueueDto: CreateDeadLetterQueueDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: number;
        assignorId: string;
        emissionDate: Date;
        batchId: string;
        errorMessage: string;
    }>;
    findAll(search?: string, page?: number, limit?: number): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            value: number;
            assignorId: string;
            emissionDate: Date;
            batchId: string;
            errorMessage: string;
        }[];
        total: number;
        total_pages: number;
    }>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__DeadLetterQueueClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: number;
        assignorId: string;
        emissionDate: Date;
        batchId: string;
        errorMessage: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateDeadLetterQueueDto: UpdateDeadLetterQueueDto): import(".prisma/client").Prisma.Prisma__DeadLetterQueueClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: number;
        assignorId: string;
        emissionDate: Date;
        batchId: string;
        errorMessage: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__DeadLetterQueueClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: number;
        assignorId: string;
        emissionDate: Date;
        batchId: string;
        errorMessage: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
