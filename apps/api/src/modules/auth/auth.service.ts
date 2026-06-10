import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { authenticator } from 'otplib';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditAction } from '@capitalos/database';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new BadRequestException('Email already registered');

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
      },
      select: { id: true, email: true, firstName: true, lastName: true, status: true },
    });

    return { success: true, data: user };
  }

  async login(dto: LoginDto, ip?: string, userAgent?: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: { include: { permission: true } },
              },
            },
          },
        },
      },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Account is not active');
    }

    if (user.mfaEnabled) {
      if (!dto.mfaCode) throw new UnauthorizedException('MFA code required');
      const validMfa = authenticator.verify({
        token: dto.mfaCode,
        secret: user.mfaSecret!,
      });
      if (!validMfa) throw new UnauthorizedException('Invalid MFA code');
    }

    const tokens = await this.generateTokens(user.id, user.email);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    await this.prisma.auditLog.create({
      data: {
        userId: user.id,
        action: AuditAction.LOGIN,
        entityType: 'User',
        entityId: user.id,
        ipAddress: ip,
        userAgent,
      },
    });

    const roles = user.userRoles.map((ur) => ur.role.code);
    const permissions = [
      ...new Set(
        user.userRoles.flatMap((ur) =>
          ur.role.rolePermissions.map((rp) => rp.permission.code),
        ),
      ),
    ];

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          roles,
          permissions,
          portal: user.userRoles[0]?.role.portal,
          mfaEnabled: user.mfaEnabled,
        },
        ...tokens,
      },
    };
  }

  async refresh(refreshToken: string) {
    const stored = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!stored || stored.revoked || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.generateTokens(stored.userId, stored.user.email);

    await this.prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revoked: true },
    });

    return { success: true, data: tokens };
  }

  async logout(userId: string, refreshToken?: string) {
    if (refreshToken) {
      await this.prisma.refreshToken.updateMany({
        where: { token: refreshToken, userId },
        data: { revoked: true },
      });
    }

    await this.prisma.auditLog.create({
      data: {
        userId,
        action: AuditAction.LOGOUT,
        entityType: 'User',
        entityId: userId,
      },
    });

    return { success: true, message: 'Logged out successfully' };
  }

  async setupMfa(userId: string) {
    const secret = authenticator.generateSecret();
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BadRequestException('User not found');

    await this.prisma.user.update({
      where: { id: userId },
      data: { mfaSecret: secret },
    });

    const otpauth = authenticator.keyuri(user.email, 'CapitalOS', secret);
    return {
      success: true,
      data: { secret, otpauth },
    };
  }

  async enableMfa(userId: string, code: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.mfaSecret) throw new BadRequestException('MFA not initialized');

    const valid = authenticator.verify({ token: code, secret: user.mfaSecret });
    if (!valid) throw new BadRequestException('Invalid MFA code');

    await this.prisma.user.update({
      where: { id: userId },
      data: { mfaEnabled: true },
    });

    return { success: true, message: 'MFA enabled' };
  }

  private async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };
    const accessToken = this.jwt.sign(payload);

    const refreshToken = uuidv4();
    const expiry = this.config.get<string>('JWT_REFRESH_EXPIRY', '7d');
    const expiresAt = new Date();
    const days = parseInt(expiry) || 7;
    expiresAt.setDate(expiresAt.getDate() + days);

    await this.prisma.refreshToken.create({
      data: { token: refreshToken, userId, expiresAt },
    });

    return { accessToken, refreshToken };
  }
}
