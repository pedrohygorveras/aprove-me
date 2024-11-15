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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.jwtSecret = process.env.JWT_SECRET;
        this.accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION;
        this.refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION;
    }
    async validateUser(login, password) {
        const user = await this.usersService.findByLogin(login);
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        throw new common_1.UnauthorizedException('Invalid login credentials');
    }
    async login(user) {
        const payload = {
            id: user.id,
            login: user.login,
            role: user.role,
        };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.accessTokenExpiration,
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.refreshTokenExpiration,
        });
        await this.usersService.saveRefreshToken(user.id, refreshToken);
        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.jwtSecret,
            });
            const user = await this.usersService.findOne(payload.id);
            if (!user || user.refreshToken !== refreshToken) {
                throw new common_1.UnauthorizedException();
            }
            const newAccessToken = this.jwtService.sign({
                id: user.id,
                login: user.login,
                role: user.role,
            }, { expiresIn: this.accessTokenExpiration });
            return {
                accessToken: newAccessToken,
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            };
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map