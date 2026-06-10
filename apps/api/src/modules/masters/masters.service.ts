import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MastersService {
  constructor(private prisma: PrismaService) {}

  async findAllCategories() {
    const data = await this.prisma.masterDataCategory.findMany({
      where: { isActive: true },
      include: {
        items: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    });
    return { success: true, data };
  }

  async findCategoryByCode(code: string) {
    const category = await this.prisma.masterDataCategory.findUnique({
      where: { code },
      include: {
        items: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!category) throw new NotFoundException(`Category ${code} not found`);
    return { success: true, data: category };
  }

  async findItemsByCategory(categoryCode: string) {
    const result = await this.findCategoryByCode(categoryCode);
    return { success: true, data: result.data.items };
  }
}
