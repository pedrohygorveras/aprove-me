import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PrismaService } from '../../database/prisma.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { BatchsService } from '../batchs/batchs.service';
export declare class PayablesService {
    private readonly prisma;
    private readonly amqpConnection;
    private readonly batchsService;
    private readonly BATCH_LIMIT;
    constructor(prisma: PrismaService, amqpConnection: AmqpConnection, batchsService: BatchsService);
    createBatchWithQueue(batchItems: CreatePayableDto[]): Promise<{
        message: string;
    }>;
    create(createPayableDto: CreatePayableDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: number;
        assignorId: string;
        emissionDate: Date;
    }>;
    findAll(search?: string, page?: number, limit?: number): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            value: number;
            assignorId: string;
            emissionDate: Date;
        }[];
        total: number;
        total_pages: number;
    }>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__PayableClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: number;
        assignorId: string;
        emissionDate: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updatePayableDto: UpdatePayableDto): import(".prisma/client").Prisma.Prisma__PayableClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: number;
        assignorId: string;
        emissionDate: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__PayableClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: number;
        assignorId: string;
        emissionDate: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
