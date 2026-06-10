export type PortalType =
  | 'COMPANY'
  | 'ANALYST'
  | 'LENDER'
  | 'INVESTOR'
  | 'COMMITTEE'
  | 'SUPER_ADMIN';

export type ChsPillar =
  | 'STRATEGIC_BUSINESS'
  | 'FINANCIAL'
  | 'LIQUIDITY'
  | 'MANAGEMENT'
  | 'OPERATIONAL'
  | 'INDUSTRY'
  | 'ESG';

export type WorkflowStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'ANALYST_REVIEW'
  | 'SENIOR_ANALYST_REVIEW'
  | 'COMMITTEE_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'RETURNED';

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  roles: string[];
  portal: PortalType;
  organizationId?: string;
}
