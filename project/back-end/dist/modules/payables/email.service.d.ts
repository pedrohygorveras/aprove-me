import { PrismaService } from '../../database/prisma.service';
import { UsersService } from '../users/users.service';
export declare class EmailService {
    private readonly prisma;
    private readonly usersService;
    private readonly logger;
    private transporter;
    constructor(prisma: PrismaService, usersService: UsersService);
    notifyUsersByRoles(message: string, roles: string[]): Promise<void>;
}
