"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findEmailsByRoles(roles) {
        return this.prisma.user.findMany({
            where: { role: { in: roles } },
            select: { email: true },
        });
    }
    async findByLogin(login) {
        return this.prisma.user.findUnique({
            where: { login },
        });
    }
    async saveRefreshToken(id, refreshToken) {
        await this.prisma.user.update({
            where: { id },
            data: { refreshToken },
        });
    }
    async create(createUserDto) {
        const hash = await bcrypt.hash(createUserDto.password, 10);
        return this.prisma.user.create({
            data: {
                name: createUserDto.name,
                login: createUserDto.login,
                email: createUserDto.email,
                password: hash,
                role: createUserDto.role,
            },
        });
    }
    async findAll(search, page = 1, limit = 10) {
        const whereClause = search
            ? {
                OR: [
                    { login: { contains: search, mode: 'insensitive' } },
                    { role: { contains: search, mode: 'insensitive' } },
                ],
            }
            : {};
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where: whereClause,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
                select: {
                    id: true,
                    name: true,
                    login: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            this.prisma.user.count({ where: whereClause }),
        ]);
        return {
            data: users,
            total,
            total_pages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async update(id, updateUserDto) {
        await this.updatePasswordIfNeeded(id, updateUserDto);
        return this.prisma.user.update({
            where: { id },
            data: { ...updateUserDto },
        });
    }
    async remove(id) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
    async updatePasswordIfNeeded(id, updateUserDto) {
        if (updateUserDto.password) {
            const user = await this.findOne(id);
            const isPasswordSame = await bcrypt.compare(updateUserDto.password, user.password);
            if (!isPasswordSame) {
                updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
            }
            else {
                delete updateUserDto.password;
            }
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map