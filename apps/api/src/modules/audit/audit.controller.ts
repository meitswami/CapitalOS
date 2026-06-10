import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuditService, AuditQueryDto } from './audit.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';

@ApiTags('audit')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('audit')
export class AuditController {
  constructor(private auditService: AuditService) {}

  @Get()
  @RequirePermissions('audit:read')
  @ApiOperation({ summary: 'List audit logs' })
  findAll(@Query() query: AuditQueryDto) {
    return this.auditService.findAll(query);
  }
}
