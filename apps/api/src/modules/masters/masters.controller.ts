import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MastersService } from './masters.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';

@ApiTags('masters')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('masters')
export class MastersController {
  constructor(private mastersService: MastersService) {}

  @Get()
  @RequirePermissions('masters:read')
  @ApiOperation({ summary: 'List all master data categories with items' })
  findAll() {
    return this.mastersService.findAllCategories();
  }

  @Get(':code')
  @RequirePermissions('masters:read')
  @ApiOperation({ summary: 'Get master data category by code' })
  findByCode(@Param('code') code: string) {
    return this.mastersService.findCategoryByCode(code);
  }

  @Get(':code/items')
  @RequirePermissions('masters:read')
  @ApiOperation({ summary: 'Get items for a master data category' })
  findItems(@Param('code') code: string) {
    return this.mastersService.findItemsByCategory(code);
  }
}
