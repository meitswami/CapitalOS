# CapitalOS — Folder Structure

```
CapitalOS/
├── apps/
│   ├── api/                          # NestJS Backend
│   │   ├── src/
│   │   │   ├── main.ts               # Bootstrap + Swagger
│   │   │   ├── app.module.ts         # Root module
│   │   │   ├── health.controller.ts
│   │   │   ├── prisma/
│   │   │   │   ├── prisma.module.ts
│   │   │   │   └── prisma.service.ts
│   │   │   ├── common/
│   │   │   │   ├── decorators/       # @Public, @RequirePermissions, @CurrentUser
│   │   │   │   ├── guards/           # JwtAuthGuard, PermissionsGuard
│   │   │   │   ├── dto/              # PaginationDto
│   │   │   │   └── interceptors/     # AuditInterceptor
│   │   │   └── modules/
│   │   │       ├── auth/             # JWT, MFA, refresh tokens
│   │   │       ├── users/
│   │   │       ├── organizations/
│   │   │       ├── masters/
│   │   │       ├── industry/
│   │   │       ├── companies/
│   │   │       ├── audit/
│   │   │       ├── documents/        # Phase 2
│   │   │       ├── financial/        # Phase 2
│   │   │       ├── chs/              # Phase 3
│   │   │       ├── risk/             # Phase 3
│   │   │       ├── ai/               # Phase 3
│   │   │       ├── workflow/         # Phase 4
│   │   │       ├── committee/        # Phase 4
│   │   │       ├── reports/          # Phase 4
│   │   │       ├── deals/            # Phase 5
│   │   │       ├── debt-rail/        # Phase 5
│   │   │       ├── equity-rail/      # Phase 5
│   │   │       └── startup-rail/     # Phase 5
│   │   ├── nest-cli.json
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── web/                          # Next.js 15 Frontend
│       ├── src/
│       │   ├── app/
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx          # Landing
│       │   │   ├── login/
│       │   │   ├── company/          # Company Portal
│       │   │   ├── analyst/          # Analyst Portal
│       │   │   ├── lender/           # Lender Portal
│       │   │   ├── investor/         # Investor Portal
│       │   │   ├── committee/        # Committee Portal
│       │   │   └── admin/            # Super Admin Portal
│       │   ├── components/
│       │   │   ├── ui/               # ShadCN components
│       │   │   ├── layout/           # PortalShell, headers
│       │   │   ├── chs/              # CHS-specific components
│       │   │   ├── financial/        # Financial data components
│       │   │   └── workflow/         # Workflow components
│       │   └── lib/
│       │       ├── api.ts            # API client
│       │       └── utils.ts          # cn() helper
│       ├── next.config.ts
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   ├── database/                     # Prisma ORM
│   │   ├── prisma/
│   │   │   ├── schema.prisma         # Full platform schema
│   │   │   └── seed.ts               # Seed data
│   │   └── src/
│   │       └── index.ts
│   │
│   └── shared/                       # Shared types & constants
│       └── src/
│           ├── constants.ts          # CHS pillars, metrics
│           ├── types.ts              # Shared TypeScript types
│           └── permissions.ts        # RBAC definitions
│
├── docs/                             # Architecture documentation
│   ├── ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   ├── ER_DIAGRAM.md
│   ├── API_SPECIFICATION.md
│   ├── FOLDER_STRUCTURE.md
│   ├── UI_SCREENS.md
│   ├── USER_STORIES.md
│   ├── RBAC_MATRIX.md
│   └── DEVELOPMENT_ROADMAP.md
│
├── docker/
│   └── docker-compose.yml            # PostgreSQL, Redis, MinIO
│
├── .env.example
├── .gitignore
├── package.json                      # Root workspace
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```
