import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findEmailsByRoles(roles: string[]): Promise<{
        email: string;
    }[]>;
    findByLogin(login: string): Promise<{
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
    saveRefreshToken(id: string, refreshToken: string): Promise<void>;
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
    private updatePasswordIfNeeded;
}
