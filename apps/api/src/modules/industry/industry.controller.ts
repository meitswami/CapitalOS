import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IndustryService } from './industry.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('industry')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('industry')
export class IndustryController {
  constructor(private industryService: IndustryService) {}

  @Get()
  @RequirePermissions('industry:read')
  @ApiOperation({ summary: 'List industries' })
  findAll(@Query() query: PaginationDto) {
    return this.industryService.findAllIndustries(query);
  }

  @Get('taxonomy')
  @RequirePermissions('industry:read')
  @ApiOperation({ summary: 'Get full industry taxonomy tree' })
  getTaxonomy() {
    return this.industryService.getTaxonomyTree();
  }

  @Get(':id')
  @RequirePermissions('industry:read')
  @ApiOperation({ summary: 'Get industry by ID with sub-sectors and weights' })
  findOne(@Param('id') id: string) {
    return this.industryService.findIndustryById(id);
  }

  @Get(':id/sub-sectors')
  @RequirePermissions('industry:read')
  @ApiOperation({ summary: 'List sub-sectors for an industry' })
  findSubSectors(@Param('id') id: string) {
    return this.industryService.findSubSectors(id);
  }
}
