import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class IndustryService {
  constructor(private prisma: PrismaService) {}

  async findAllIndustries(query: PaginationDto) {
    const { page = 1, limit = 50, search } = query;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { code: { contains: search } },
          ],
          isActive: true,
        }
      : { isActive: true };

    const [data, total] = await Promise.all([
      this.prisma.industry.findMany({
        where,
        skip,
        take: limit,
        include: {
          _count: { select: { subSectors: true } },
          pillarWeights: true,
        },
        orderBy: { name: 'asc' },
      }),
      this.prisma.industry.count({ where }),
    ]);

    return {
      success: true,
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findIndustryById(id: string) {
    const industry = await this.prisma.industry.findUnique({
      where: { id },
      include: {
        subSectors: { where: { isActive: true }, orderBy: { name: 'asc' } },
        pillarWeights: true,
        kpis: { where: { isActive: true } },
      },
    });

    if (!industry) throw new NotFoundException('Industry not found');
    return { success: true, data: industry };
  }

  async findSubSectors(industryId: string) {
    const data = await this.prisma.subSector.findMany({
      where: { industryId, isActive: true },
      orderBy: { name: 'asc' },
    });
    return { success: true, data };
  }

  async getTaxonomyTree() {
    const industries = await this.prisma.industry.findMany({
      where: { isActive: true },
      include: {
        subSectors: { where: { isActive: true }, orderBy: { name: 'asc' } },
        pillarWeights: true,
      },
      orderBy: { name: 'asc' },
    });
    return { success: true, data: industries };
  }
}
