import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AssignorsModule } from './modules/assignors/assignors.module';
import { PayablesModule } from './modules/payables/payables.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    AssignorsModule,
    PayablesModule,
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
