# CapitalOS — Database Schema Reference

Full schema: `packages/database/prisma/schema.prisma`

**Production database:** Hostinger MySQL — `u334425891_capitalos` on `auth-db1274.hstgr.io`  
**Admin UI:** [phpMyAdmin](https://auth-db1274.hstgr.io/index.php?db=u334425891_capitalos)

## Entity Summary (42 tables)

### Authentication & Authorization (6)
| Table | Purpose |
|-------|---------|
| `users` | User accounts with MFA support |
| `refresh_tokens` | JWT refresh token store |
| `roles` | RBAC roles mapped to portals |
| `permissions` | Granular module permissions |
| `role_permissions` | Role-permission junction |
| `user_roles` | User-role assignment with org scope |

### Organization (2)
| Table | Purpose |
|-------|---------|
| `organizations` | Multi-tenant orgs (banks, funds, companies) |
| `organization_members` | User-org membership |

### Master Data (2)
| Table | Purpose |
|-------|---------|
| `master_data_categories` | Lookup category groups |
| `master_data_items` | Lookup values |

### Industry Taxonomy (4)
| Table | Purpose |
|-------|---------|
| `industries` | 23 industry classifications |
| `sub_sectors` | 300+ sub-sector classifications |
| `industry_pillar_weights` | CHS pillar weights per industry |
| `industry_kpis` | Industry-specific KPI definitions |

### Company Management (5)
| Table | Purpose |
|-------|---------|
| `companies` | Core company entity |
| `company_profiles` | Extended business profile |
| `company_contacts` | Key contacts |
| `promoters` | Promoter/director data |

### Document Vault (2)
| Table | Purpose |
|-------|---------|
| `document_categories` | Document type taxonomy |
| `documents` | S3-backed document metadata |

### Client Data Sheet & Financial (8)
| Table | Purpose |
|-------|---------|
| `financial_periods` | Fiscal year periods |
| `financial_data` | P&L and balance sheet |
| `gst_data` | GST filing data |
| `itr_data` | Income tax return data |
| `mca_data` | MCA filing data |
| `banking_data` | Bank account analysis |
| `collateral` | Collateral records |
| `esg_data` | ESG assessment data |
| `computed_metrics` | Auto-calculated ratios |

### CHS Engine (5)
| Table | Purpose |
|-------|---------|
| `chs_parameters` | Scoring parameter definitions |
| `chs_assessments` | Assessment instances |
| `chs_pillar_scores` | 7 pillar scores |
| `chs_parameter_scores` | Individual parameter scores |
| `chs_overrides` | Manual override audit records |

### Risk Matrix (2)
| Table | Purpose |
|-------|---------|
| `risk_matrices` | Overall risk assessment |
| `risk_factors` | Individual risk factors |

### AI (1)
| Table | Purpose |
|-------|---------|
| `ai_recommendations` | AI-suggested qualitative scores |

### Workflow (2)
| Table | Purpose |
|-------|---------|
| `workflow_instances` | Assessment workflow state |
| `workflow_actions` | Status transition audit |

### Committee (3)
| Table | Purpose |
|-------|---------|
| `committee_sessions` | Committee meeting sessions |
| `committee_reviews` | Assessment reviews |
| `committee_votes` | Individual member votes |

### Deals & Capital Rails (4)
| Table | Purpose |
|-------|---------|
| `deals` | Deal pipeline |
| `debt_rail_applications` | Debt facility applications |
| `equity_rail_applications` | Equity round applications |
| `startup_rail_applications` | Startup funding applications |

### Reporting & Notifications (2)
| Table | Purpose |
|-------|---------|
| `reports` | Generated report metadata |
| `notifications` | User notifications |

### Audit (1)
| Table | Purpose |
|-------|---------|
| `audit_logs` | Full platform audit trail |

## Key Enums

- **PortalType**: COMPANY, ANALYST, LENDER, INVESTOR, COMMITTEE, SUPER_ADMIN
- **ChsPillar**: STRATEGIC_BUSINESS, FINANCIAL, LIQUIDITY, MANAGEMENT, OPERATIONAL, INDUSTRY, ESG
- **WorkflowStatus**: DRAFT → SUBMITTED → ANALYST_REVIEW → SENIOR_ANALYST_REVIEW → COMMITTEE_REVIEW → APPROVED/REJECTED/RETURNED
- **ScoringMode**: AUTO, MANUAL, AI_SUGGESTED, OVERRIDE
- **CapitalRoute**: DEBT, EQUITY, STARTUP

## Computed Financial Metrics

Auto-calculated from `financial_data` across periods:

| Metric | Formula |
|--------|---------|
| Revenue Growth | (Rev₂ - Rev₁) / Rev₁ × 100 |
| EBITDA Growth | (EBITDA₂ - EBITDA₁) / EBITDA₁ × 100 |
| PAT Growth | (PAT₂ - PAT₁) / PAT₁ × 100 |
| DSCR | EBITDA / (Interest + Principal) |
| ICR | EBITDA / Interest Expense |
| Current Ratio | Current Assets / Current Liabilities |
| Quick Ratio | (Current Assets - Inventory) / Current Liabilities |
| Working Capital Gap | Current Assets - Current Liabilities |
| Debt Equity | Total Debt / Equity |
| Net Debt EBITDA | (Total Debt - Cash) / EBITDA |
| Cash Conversion Cycle | DSO + DIO - DPO |
