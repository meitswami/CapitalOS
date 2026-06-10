# CapitalOS — RBAC Matrix

## Roles by Portal

| Role | Portal | Description |
|------|--------|-------------|
| SUPER_ADMIN | Super Admin | Full platform access |
| COMPANY_ADMIN | Company | Company profile and data management |
| ANALYST | Analyst | CHS scoring and data sheet review |
| SENIOR_ANALYST | Analyst | Analyst + approval authority |
| LENDER | Lender | Debt pipeline and assessments |
| INVESTOR | Investor | Equity/startup deal flow |
| COMMITTEE_MEMBER | Committee | Review and vote |
| COMMITTEE_CHAIR | Committee | Committee management + approval |

## Permission Matrix

| Permission | SUPER_ADMIN | COMPANY_ADMIN | ANALYST | SENIOR_ANALYST | LENDER | INVESTOR | COMMITTEE_MEMBER | COMMITTEE_CHAIR |
|------------|:-----------:|:-------------:|:-------:|:--------------:|:------:|:--------:|:----------------:|:---------------:|
| **Auth & Users** |
| auth:manage | ✓ | | | | | | | |
| users:read | ✓ | | | | | | | |
| users:create | ✓ | | | | | | | |
| users:update | ✓ | | | | | | | |
| users:delete | ✓ | | | | | | | |
| **Organizations** |
| organizations:read | ✓ | | | | | | | |
| organizations:create | ✓ | | | | | | | |
| organizations:update | ✓ | | | | | | | |
| **Masters** |
| masters:read | ✓ | | | | | | | |
| masters:manage | ✓ | | | | | | | |
| **Industry** |
| industry:read | ✓ | | ✓ | ✓ | | | | |
| industry:manage | ✓ | | | | | | | |
| **Companies** |
| companies:read | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| companies:create | ✓ | | | | | | | |
| companies:update | ✓ | ✓ | ✓ | ✓ | | | | |
| companies:delete | ✓ | | | | | | | |
| **Documents** |
| documents:read | ✓ | ✓ | ✓ | ✓ | | | | |
| documents:upload | ✓ | ✓ | | | | | | |
| documents:verify | ✓ | | ✓ | ✓ | | | | |
| **Financial** |
| financial:read | ✓ | ✓ | ✓ | ✓ | | | | |
| financial:manage | ✓ | ✓ | ✓ | ✓ | | | | |
| **CHS** |
| chs:read | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| chs:score | ✓ | | ✓ | ✓ | | | | |
| chs:override | ✓ | | ✓ | ✓ | | | | |
| chs:approve | ✓ | | | ✓ | | | | ✓ |
| **Risk** |
| risk:read | ✓ | | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| risk:manage | ✓ | | ✓ | ✓ | | | | |
| **Workflow** |
| workflow:read | ✓ | ✓ | ✓ | ✓ | | | ✓ | ✓ |
| workflow:action | ✓ | ✓ | ✓ | ✓ | | | | ✓ |
| **Committee** |
| committee:read | ✓ | | | | | | ✓ | ✓ |
| committee:vote | ✓ | | | | | | ✓ | ✓ |
| committee:manage | ✓ | | | | | | | ✓ |
| **Deals** |
| deals:read | ✓ | ✓ | | | ✓ | ✓ | | |
| deals:create | ✓ | | | | | | | |
| deals:manage | ✓ | | | | ✓ | ✓ | | |
| **Capital Rails** |
| debt_rail:read | ✓ | | | | ✓ | | | |
| debt_rail:manage | ✓ | | | | ✓ | | | |
| equity_rail:read | ✓ | | | | | ✓ | | |
| equity_rail:manage | ✓ | | | | | ✓ | | |
| startup_rail:read | ✓ | | | | | ✓ | | |
| startup_rail:manage | ✓ | | | | | ✓ | | |
| **Reports** |
| reports:read | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| reports:generate | ✓ | | ✓ | ✓ | | | | ✓ |
| reports:export | ✓ | | | ✓ | ✓ | ✓ | | |
| **Audit** |
| audit:read | ✓ | | | | | | | |
| **Admin** |
| admin:full | ✓ | | | | | | | |

## Override Governance

CHS score overrides require:
- Permission: `chs:override`
- Mandatory fields: `reason`, `originalScore`, `overrideScore`
- Optional: `evidence`
- Auto-captured: `userId`, `timestamp`
- Stored in: `chs_overrides` table
- Logged in: `audit_logs`

## Multi-Tenant Scoping

- `user_roles.organizationId` scopes role assignment to an organization
- Company portal users see only their organization's companies
- Lender/Investor portals see deals routed to their organization
- Super Admin has global visibility
