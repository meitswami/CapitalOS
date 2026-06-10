# CapitalOS — UI Screen Inventory

## Global Screens

| Screen | Route | Status | Description |
|--------|-------|--------|-------------|
| Landing Page | `/` | Built | Product overview, pillars, portal links |
| Login | `/login` | Built | Email/password auth with portal routing |
| MFA Setup | `/settings/mfa` | Planned | TOTP QR code and verification |

---

## Company Portal

| Screen | Route | Phase | Description |
|--------|-------|-------|-------------|
| Dashboard | `/company` | 1 | CHS score, capital route, status |
| Company Profile | `/company/profile` | 1 | Legal info, business description |
| Documents | `/company/documents` | 2 | Upload and view document vault |
| Data Sheet | `/company/data-sheet` | 2 | Financial/regulatory data entry |
| CHS Score | `/company/chs` | 3 | View CHS breakdown and history |
| Deals | `/company/deals` | 5 | Active funding applications |

---

## Analyst Portal

| Screen | Route | Phase | Description |
|--------|-------|-------|-------------|
| Dashboard | `/analyst` | 1 | Pending reviews, workload metrics |
| Companies List | `/analyst/companies` | 1 | Searchable company directory |
| Company Detail | `/analyst/companies/[id]` | 1 | Full company view with tabs |
| Data Sheet | `/analyst/data-sheet` | 2 | Multi-tab data entry form |
| CHS Engine | `/analyst/chs` | 3 | Pillar scoring interface |
| CHS Scoring | `/analyst/chs/[id]` | 3 | Parameter-level scoring with AI suggestions |
| Override Modal | — | 3 | Reason + evidence for score overrides |
| Risk Matrix | `/analyst/risk/[id]` | 3 | Risk factor visualization |
| Industry Browser | `/analyst/industry` | 1 | Taxonomy tree with weights |
| Workflow Queue | `/analyst/workflow` | 4 | Assessment status pipeline |

---

## Lender Portal

| Screen | Route | Phase | Description |
|--------|-------|-------|-------------|
| Dashboard | `/lender` | 5 | Pipeline metrics |
| Pipeline | `/lender/pipeline` | 5 | Deal pipeline kanban |
| Deal Detail | `/lender/deals/[id]` | 5 | CHS + financial + collateral view |
| Debt Rail | `/lender/debt-rail` | 5 | Facility application management |
| Reports | `/lender/reports` | 4 | Lender report generation |

---

## Investor Portal

| Screen | Route | Phase | Description |
|--------|-------|-------|-------------|
| Dashboard | `/investor` | 5 | Deal flow metrics |
| Deal Flow | `/investor/deals` | 5 | Equity/startup opportunities |
| Equity Rail | `/investor/equity-rail` | 5 | Round management |
| Startup Rail | `/investor/startup-rail` | 5 | Startup application review |

---

## Committee Portal

| Screen | Route | Phase | Description |
|--------|-------|-------|-------------|
| Dashboard | `/committee` | 4 | Pending reviews count |
| Reviews | `/committee/reviews` | 4 | Assessment review queue |
| Review Detail | `/committee/reviews/[id]` | 4 | Full assessment + vote interface |
| Sessions | `/committee/sessions` | 4 | Committee meeting schedule |

---

## Super Admin Portal

| Screen | Route | Phase | Description |
|--------|-------|-------|-------------|
| Dashboard | `/admin` | 1 | Platform metrics |
| Users | `/admin/users` | 1 | User management CRUD |
| Organizations | `/admin/organizations` | 1 | Org management |
| Industry Taxonomy | `/admin/industry` | 1 | Industry/sub-sector admin |
| Master Data | `/admin/masters` | 1 | Lookup table management |
| CHS Parameters | `/admin/chs-parameters` | 3 | Parameter configuration |
| Audit Trail | `/admin/audit` | 1 | Searchable audit log viewer |
| System Settings | `/admin/settings` | 1 | Platform configuration |

---

## Key UI Components

| Component | Usage |
|-----------|-------|
| PortalShell | Sidebar navigation per portal |
| ChsPillarChart | Radar/bar chart for 7 pillars |
| ScoreOverrideDialog | Override with reason + evidence |
| AiSuggestionCard | AI score with confidence + reasoning |
| WorkflowStepper | Visual workflow status progression |
| FinancialDataGrid | Editable financial period grid |
| RiskHeatmap | Risk factor severity visualization |
| DocumentUploader | S3-backed file upload with categories |
| AuditLogTable | Filterable audit event table |

## Design System

- **Primary**: Slate 900 (`#0f172a`) — authority, trust
- **Accent**: Blue 800 (`#1e40af`) — intelligence, action
- **Typography**: Inter — clean, professional
- **Components**: ShadCN UI (Radix primitives)
- **Layout**: Fixed sidebar + scrollable content area
