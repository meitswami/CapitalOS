import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateCompanyDto, UpdateCompanyDto, CreateCompanyProfileDto } from './dto/company.dto';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCompanyDto) {
    const company = await this.prisma.company.create({
      data: {
        ...dto,
        incorporationDate: dto.incorporationDate ? new Date(dto.incorporationDate) : undefined,
      },
      include: {
        industry: { select: { id: true, code: true, name: true } },
        subSector: { select: { id: true, code: true, name: true } },
      },
    });
    return { success: true, data: company };
  }

  async findAll(query: PaginationDto) {
    const { page = 1, limit = 20, search } = query;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { legalName: { contains: search } },
            { tradeName: { contains: search } },
            { cin: { contains: search } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.company.findMany({
        where,
        skip,
        take: limit,
        include: {
          industry: { select: { code: true, name: true } },
          subSector: { select: { code: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.company.count({ where }),
    ]);

    return {
      success: true,
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        industry: true,
        subSector: true,
        profile: true,
        contacts: true,
        promoters: true,
        organization: { select: { id: true, name: true, type: true } },
      },
    });

    if (!company) throw new NotFoundException('Company not found');
    return { success: true, data: company };
  }

  async update(id: string, dto: UpdateCompanyDto) {
    await this.findOne(id);
    const company = await this.prisma.company.update({ where: { id }, data: dto });
    return { success: true, data: company };
  }

  async upsertProfile(companyId: string, dto: CreateCompanyProfileDto) {
    await this.findOne(companyId);
    const profile = await this.prisma.companyProfile.upsert({
      where: { companyId },
      update: dto,
      create: { companyId, ...dto },
    });
    return { success: true, data: profile };
  }
}
