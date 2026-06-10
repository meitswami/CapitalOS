# CapitalOS

**Capital Intelligence Operating System** — Assess, route, monitor, and fund businesses using the proprietary Capital Health Score (CHS) framework.

## What CapitalOS Is

CapitalOS is NOT a loan management system, CRM, or credit-scoring black box. It is a unified operating system connecting:

- Borrowers and Companies
- Capital Advisors
- Banks and NBFCs
- Venture Capital and Private Equity Funds
- Family Offices and Investment Committees

## Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, ShadCN UI
- **Backend:** NestJS, TypeScript
- **Database:** MySQL (Hostinger) with Prisma ORM
- **Cache:** Redis 7
- **Storage:** S3-compatible (MinIO)
- **Auth:** JWT + Refresh Tokens + TOTP MFA
- **Authorization:** RBAC with granular permissions

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 10+
- Docker (for PostgreSQL, Redis, MinIO)

### 1. Configure Database

Set `DATABASE_URL` in `.env` (see `.env.example`). Production uses **Hostinger MySQL**:

```
mysql://USER:PASSWORD@auth-db1274.hstgr.io:3306/u334425891_capitalos
```

Manage tables via [phpMyAdmin](https://auth-db1274.hstgr.io/index.php?db=u334425891_capitalos).

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Setup Database

```bash
pnpm db:push
pnpm db:seed
```

### 4. Start Development

```bash
pnpm dev
```

| Service | URL |
|---------|-----|
| Web App | http://localhost:3000 |
| API | http://localhost:3001/api/v1 |
| Swagger Docs | http://localhost:3001/api/docs |
| MinIO Console | http://localhost:9001 |

### Default Admin

- **Email:** admin@capitalos.io
- **Password:** CapitalOS@2026

## Project Structure

```
apps/api/          → NestJS backend
apps/web/          → Next.js frontend
packages/database/ → Prisma schema & migrations
packages/shared/   → Shared types, constants, permissions
docs/              → Architecture documentation
docker/            → Docker Compose services
```

## Portals

| Portal | Route | Users |
|--------|-------|-------|
| Company | `/company` | Borrowers, company admins |
| Analyst | `/analyst` | Credit analysts, advisors |
| Lender | `/lender` | Banks, NBFCs |
| Investor | `/investor` | VC, PE, family offices |
| Committee | `/committee` | Credit committee members |
| Super Admin | `/admin` | Platform administrators |

## CHS Framework

7 Pillars with industry-specific weights:

1. Strategic & Business
2. Financial
3. Liquidity
4. Management
5. Operational
6. Industry
7. ESG

## Documentation

| Document | Path |
|----------|------|
| Architecture | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Database Schema | [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) |
| ER Diagram | [docs/ER_DIAGRAM.md](docs/ER_DIAGRAM.md) |
| API Specification | [docs/API_SPECIFICATION.md](docs/API_SPECIFICATION.md) |
| RBAC Matrix | [docs/RBAC_MATRIX.md](docs/RBAC_MATRIX.md) |
| User Stories | [docs/USER_STORIES.md](docs/USER_STORIES.md) |
| UI Screens | [docs/UI_SCREENS.md](docs/UI_SCREENS.md) |
| Development Roadmap | [docs/DEVELOPMENT_ROADMAP.md](docs/DEVELOPMENT_ROADMAP.md) |
| Folder Structure | [docs/FOLDER_STRUCTURE.md](docs/FOLDER_STRUCTURE.md) |

## Development Phases

| Phase | Scope | Status |
|-------|-------|--------|
| 1 | Auth, RBAC, Masters, Industry, Companies | **Complete** |
| 2 | Client Data Sheet, Financial Engine, Documents | Planned |
| 3 | CHS Engine, Risk Matrix, AI Recommendations | Planned |
| 4 | Workflow, Committee, Reporting | Planned |
| 5 | Debt, Equity, Startup Rails | Planned |
| 6 | Portfolio Monitoring, Predictive Analytics | Planned |

## License

Proprietary — All rights reserved.
