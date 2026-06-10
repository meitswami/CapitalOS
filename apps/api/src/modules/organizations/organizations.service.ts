import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto/organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrganizationDto) {
    const org = await this.prisma.organization.create({ data: dto });
    return { success: true, data: org };
  }

  async findAll(query: PaginationDto) {
    const { page = 1, limit = 20, search } = query;
    const skip = (page - 1) * limit;

    const where = search
      ? { name: { contains: search } }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.organization.findMany({
        where,
        skip,
        take: limit,
        include: { _count: { select: { members: true, companies: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.organization.count({ where }),
    ]);

    return {
      success: true,
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const org = await this.prisma.organization.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: { select: { id: true, email: true, firstName: true, lastName: true } },
          },
        },
        _count: { select: { companies: true } },
      },
    });

    if (!org) throw new NotFoundException('Organization not found');
    return { success: true, data: org };
  }

  async update(id: string, dto: UpdateOrganizationDto) {
    await this.findOne(id);
    const org = await this.prisma.organization.update({ where: { id }, data: dto });
    return { success: true, data: org };
  }
}
