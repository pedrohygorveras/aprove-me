export declare class DeadLetterQueueEntity {
    id: string;
    batchId: string;
    assignorId: string;
    value: number;
    emissionDate: Date;
    errorMessage: string;
    createdAt: Date;
    updatedAt: Date;
}
