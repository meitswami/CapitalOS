import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: PaginationDto) {
    const { page = 1, limit = 20, search } = query;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { email: { contains: search } },
            { firstName: { contains: search } },
            { lastName: { contains: search } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          status: true,
          mfaEnabled: true,
          lastLoginAt: true,
          createdAt: true,
          userRoles: {
            include: { role: { select: { code: true, name: true, portal: true } } },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      success: true,
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        status: true,
        mfaEnabled: true,
        lastLoginAt: true,
        createdAt: true,
        userRoles: {
          include: {
            role: true,
            organization: { select: { id: true, name: true, type: true } },
          },
        },
      },
    });

    if (!user) throw new NotFoundException('User not found');
    return { success: true, data: user };
  }

  async getMe(userId: string) {
    return this.findOne(userId);
  }
}
