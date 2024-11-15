import { PrismaService } from '../../database/prisma.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { BatchEntity } from '../batchs/entities/batch.entity';
interface HandleProcessPayableProps {
    payables: CreatePayableDto[];
    batch: BatchEntity;
}
export declare class PayableProcessor {
    private readonly prisma;
    constructor(prisma: PrismaService);
    handleProcessPayable(payload: HandleProcessPayableProps): Promise<HandleProcessPayableProps>;
}
export {};
