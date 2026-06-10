import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditAction } from '@capitalos/database';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const user = request.user;

    const actionMap: Record<string, AuditAction> = {
      POST: AuditAction.CREATE,
      PUT: AuditAction.UPDATE,
      PATCH: AuditAction.UPDATE,
      DELETE: AuditAction.DELETE,
      GET: AuditAction.READ,
    };

    return next.handle().pipe(
      tap(async () => {
        if (!user || method === 'GET') return;

        try {
          await this.prisma.auditLog.create({
            data: {
              userId: user.id,
              action: actionMap[method] || AuditAction.UPDATE,
              entityType: request.route?.path || request.url,
              ipAddress: request.ip,
              userAgent: request.headers['user-agent'],
              metadata: { method, url: request.url },
            },
          });
        } catch {
          // Audit failures must not block requests
        }
      }),
    );
  }
}
