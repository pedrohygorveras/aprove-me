import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        name: string;
        login: string;
        email: string;
        password: string;
        role: string;
        id: string;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(search?: string, page?: number, limit?: number): Promise<{
        data: {
            name: string;
            login: string;
            email: string;
            role: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
        total_pages: number;
    }>;
    findOne(id: string): Promise<{
        name: string;
        login: string;
        email: string;
        password: string;
        role: string;
        id: string;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        login: string;
        email: string;
        password: string;
        role: string;
        id: string;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        name: string;
        login: string;
        email: string;
        password: string;
        role: string;
        id: string;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
