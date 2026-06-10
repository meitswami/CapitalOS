import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto/organization.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('organizations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('organizations')
export class OrganizationsController {
  constructor(private orgsService: OrganizationsService) {}

  @Post()
  @RequirePermissions('organizations:create')
  @ApiOperation({ summary: 'Create organization' })
  create(@Body() dto: CreateOrganizationDto) {
    return this.orgsService.create(dto);
  }

  @Get()
  @RequirePermissions('organizations:read')
  @ApiOperation({ summary: 'List organizations' })
  findAll(@Query() query: PaginationDto) {
    return this.orgsService.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('organizations:read')
  @ApiOperation({ summary: 'Get organization by ID' })
  findOne(@Param('id') id: string) {
    return this.orgsService.findOne(id);
  }

  @Patch(':id')
  @RequirePermissions('organizations:update')
  @ApiOperation({ summary: 'Update organization' })
  update(@Param('id') id: string, @Body() dto: UpdateOrganizationDto) {
    return this.orgsService.update(id, dto);
  }
}
