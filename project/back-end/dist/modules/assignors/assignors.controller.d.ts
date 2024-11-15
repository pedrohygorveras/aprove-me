import { AssignorsService } from './assignors.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
export declare class AssignorsController {
    private readonly assignorsService;
    constructor(assignorsService: AssignorsService);
    create(createAssignorDto: CreateAssignorDto): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string;
        document: string;
    }>;
    findAll(search?: string, page?: number, limit?: number): Promise<{
        data: {
            name: string;
            email: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string;
            document: string;
        }[];
        total: number;
        total_pages: number;
    }>;
    findOne(id: string): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string;
        document: string;
    }>;
    update(id: string, updateAssignorDto: UpdateAssignorDto): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string;
        document: string;
    }>;
    remove(id: string): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string;
        document: string;
    }>;
}
