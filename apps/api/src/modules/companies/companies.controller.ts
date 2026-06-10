import { Body, Controller, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto, UpdateCompanyDto, CreateCompanyProfileDto } from './dto/company.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('companies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Post()
  @RequirePermissions('companies:create')
  @ApiOperation({ summary: 'Create company' })
  create(@Body() dto: CreateCompanyDto) {
    return this.companiesService.create(dto);
  }

  @Get()
  @RequirePermissions('companies:read')
  @ApiOperation({ summary: 'List companies' })
  findAll(@Query() query: PaginationDto) {
    return this.companiesService.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('companies:read')
  @ApiOperation({ summary: 'Get company by ID' })
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  @RequirePermissions('companies:update')
  @ApiOperation({ summary: 'Update company' })
  update(@Param('id') id: string, @Body() dto: UpdateCompanyDto) {
    return this.companiesService.update(id, dto);
  }

  @Put(':id/profile')
  @RequirePermissions('companies:update')
  @ApiOperation({ summary: 'Create or update company profile' })
  upsertProfile(@Param('id') id: string, @Body() dto: CreateCompanyProfileDto) {
    return this.companiesService.upsertProfile(id, dto);
  }
}
