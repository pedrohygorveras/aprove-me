import { BatchItemsService } from './batch-items.service';
import { CreateBatchItemDto } from './dto/create-batch-item.dto';
import { UpdateBatchItemDto } from './dto/update-batch-item.dto';
export declare class BatchItemsController {
    private readonly batchItemsService;
    constructor(batchItemsService: BatchItemsService);
    create(createBatchItemDto: CreateBatchItemDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        batchId: string;
        payableId: string;
        status: string;
        retryCount: number;
    }>;
    findAll(batchId?: string, page?: number, limit?: number): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            batchId: string;
            payableId: string;
            status: string;
            retryCount: number;
        }[];
        total: number;
        total_pages: number;
    }>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__BatchItemClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        batchId: string;
        payableId: string;
        status: string;
        retryCount: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateBatchItemDto: UpdateBatchItemDto): import(".prisma/client").Prisma.Prisma__BatchItemClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        batchId: string;
        payableId: string;
        status: string;
        retryCount: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__BatchItemClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        batchId: string;
        payableId: string;
        status: string;
        retryCount: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
