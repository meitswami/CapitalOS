export const CHS_PILLARS = [
  'STRATEGIC_BUSINESS',
  'FINANCIAL',
  'LIQUIDITY',
  'MANAGEMENT',
  'OPERATIONAL',
  'INDUSTRY',
  'ESG',
] as const;

export const CHS_PILLAR_LABELS: Record<string, string> = {
  STRATEGIC_BUSINESS: 'Strategic & Business',
  FINANCIAL: 'Financial',
  LIQUIDITY: 'Liquidity',
  MANAGEMENT: 'Management',
  OPERATIONAL: 'Operational',
  INDUSTRY: 'Industry',
  ESG: 'ESG',
};

export const CAPITAL_ROUTES = ['DEBT', 'EQUITY', 'STARTUP'] as const;

export const WORKFLOW_STATUSES = [
  'DRAFT',
  'SUBMITTED',
  'ANALYST_REVIEW',
  'SENIOR_ANALYST_REVIEW',
  'COMMITTEE_REVIEW',
  'APPROVED',
  'REJECTED',
  'RETURNED',
] as const;

export const PORTALS = [
  'COMPANY',
  'ANALYST',
  'LENDER',
  'INVESTOR',
  'COMMITTEE',
  'SUPER_ADMIN',
] as const;

export const COMPUTED_METRICS = [
  { code: 'REVENUE_GROWTH', name: 'Revenue Growth', unit: '%' },
  { code: 'EBITDA_GROWTH', name: 'EBITDA Growth', unit: '%' },
  { code: 'PAT_GROWTH', name: 'PAT Growth', unit: '%' },
  { code: 'DSCR', name: 'Debt Service Coverage Ratio', unit: 'x' },
  { code: 'ICR', name: 'Interest Coverage Ratio', unit: 'x' },
  { code: 'CURRENT_RATIO', name: 'Current Ratio', unit: 'x' },
  { code: 'QUICK_RATIO', name: 'Quick Ratio', unit: 'x' },
  { code: 'WORKING_CAPITAL_GAP', name: 'Working Capital Gap', unit: 'INR' },
  { code: 'DEBT_EQUITY', name: 'Debt Equity Ratio', unit: 'x' },
  { code: 'NET_DEBT_EBITDA', name: 'Net Debt / EBITDA', unit: 'x' },
  { code: 'CASH_CONVERSION_CYCLE', name: 'Cash Conversion Cycle', unit: 'days' },
] as const;

export const API_VERSION = 'v1';
