import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { MastersModule } from './modules/masters/masters.module';
import { IndustryModule } from './modules/industry/industry.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { AuditModule } from './modules/audit/audit.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(__dirname, '../../../.env'),
        join(__dirname, '../../.env'),
        '.env',
      ],
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    PrismaModule,
    AuthModule,
    UsersModule,
    OrganizationsModule,
    MastersModule,
    IndustryModule,
    CompaniesModule,
    AuditModule,
  ],
  controllers: [HealthController],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
