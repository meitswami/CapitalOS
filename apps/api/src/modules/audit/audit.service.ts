import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { AuditAction } from '@capitalos/database';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AuditQueryDto extends PaginationDto {
  @ApiPropertyOptional({ enum: AuditAction })
  @IsOptional()
  @IsEnum(AuditAction)
  action?: AuditAction;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  entityType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userId?: string;
}

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: AuditQueryDto) {
    const { page = 1, limit = 50, action, entityType, userId } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(action && { action }),
      ...(entityType && { entityType }),
      ...(userId && { userId }),
    };

    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: { select: { id: true, email: true, firstName: true, lastName: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return {
      success: true,
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }
}
