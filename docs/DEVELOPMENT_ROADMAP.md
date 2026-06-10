# CapitalOS — Development Roadmap

## Phase 1: Foundation ✅ (Current)

**Duration:** 4–6 weeks
**Status:** Implemented

| Deliverable | Status |
|-------------|--------|
| Monorepo setup (pnpm + turbo) | ✅ |
| PostgreSQL schema (42 tables) | ✅ |
| Prisma ORM + seed data | ✅ |
| NestJS API scaffold | ✅ |
| JWT auth + refresh tokens | ✅ |
| TOTP MFA | ✅ |
| RBAC with permission guards | ✅ |
| Master Data module | ✅ |
| Industry Taxonomy module | ✅ |
| Company Management module | ✅ |
| Audit Trail module | ✅ |
| Next.js 15 frontend scaffold | ✅ |
| 6 portal shells with navigation | ✅ |
| Landing page + login | ✅ |
| Docker Compose (PG, Redis, MinIO) | ✅ |
| Architecture documentation | ✅ |

---

## Phase 2: Data & Documents

**Duration:** 6–8 weeks

| Deliverable | Priority |
|-------------|----------|
| Document Vault (S3 upload/download) | P0 |
| Document verification workflow | P0 |
| Financial Period management | P0 |
| Financial Data entry (P&L, BS) | P0 |
| GST / ITR / MCA data entry | P1 |
| Banking data entry | P1 |
| Promoter & Collateral management | P1 |
| ESG data entry | P2 |
| Financial Engine (auto metrics) | P0 |
| Company Portal data sheet UI | P0 |
| Analyst data sheet review UI | P0 |

**Exit Criteria:** Analyst can enter full client data sheet; system auto-calculates 11 financial metrics.

---

## Phase 3: CHS Intelligence

**Duration:** 8–10 weeks

| Deliverable | Priority |
|-------------|----------|
| CHS parameter configuration | P0 |
| Auto-scoring engine (quantitative) | P0 |
| Manual scoring UI (qualitative) | P0 |
| AI recommendation service | P1 |
| AI suggestion accept/override UI | P1 |
| Score override with audit | P0 |
| Pillar score aggregation | P0 |
| Overall CHS calculation | P0 |
| Risk Matrix engine | P0 |
| Capital route recommendation | P1 |
| CHS dashboard visualization | P0 |

**Exit Criteria:** Full CHS assessment with 7 pillars, explainable scores, AI assistance, and risk matrix.

---

## Phase 4: Workflow & Governance

**Duration:** 6–8 weeks

| Deliverable | Priority |
|-------------|----------|
| Workflow state machine | P0 |
| Analyst review queue | P0 |
| Senior analyst approval | P0 |
| Committee session management | P0 |
| Committee voting | P0 |
| Return for revision flow | P1 |
| CHS Report generation | P0 |
| Risk Assessment Report | P0 |
| Committee Note generation | P1 |
| Lender Report | P1 |
| PDF export | P0 |
| Excel export | P1 |
| Notification service | P1 |

**Exit Criteria:** End-to-end workflow from draft to committee approval with report generation.

---

## Phase 5: Capital Rails

**Duration:** 8–10 weeks

| Deliverable | Priority |
|-------------|----------|
| Deal management | P0 |
| Debt Rail applications | P0 |
| Equity Rail applications | P0 |
| Startup Rail applications | P0 |
| Lender pipeline UI | P0 |
| Investor deal flow UI | P0 |
| Route-specific eligibility rules | P1 |
| Deal status tracking | P0 |

**Exit Criteria:** Companies routed to appropriate capital rail; lenders/investors manage deal pipeline.

---

## Phase 6: Intelligence & Monitoring

**Duration:** 10–12 weeks

| Deliverable | Priority |
|-------------|----------|
| Portfolio monitoring dashboard | P0 |
| CHS trend analysis | P1 |
| Predictive risk alerts | P1 |
| Advanced AI scoring models | P2 |
| Benchmark comparisons | P1 |
| Executive summary reports | P1 |
| Portfolio reports | P1 |
| API integrations (banking, MCA) | P2 |

**Exit Criteria:** Portfolio-level monitoring with predictive analytics and automated data feeds.

---

## Technical Debt & Cross-Cutting

| Item | Phase |
|------|-------|
| E2E test suite (Playwright) | 2 |
| Unit tests (Jest) for services | 2 |
| CI/CD pipeline (GitHub Actions) | 2 |
| Redis session/cache layer | 2 |
| Email notifications (SendGrid/SES) | 4 |
| Rate limiting per user | 2 |
| API versioning strategy | 3 |
| Database migration strategy | 1 ✅ |
| Performance monitoring (APM) | 4 |
| Security audit | 4 |
