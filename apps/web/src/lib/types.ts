export interface ApiMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  meta: ApiMeta;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  status: string;
  mfaEnabled: boolean;
  lastLoginAt?: string;
  createdAt: string;
  userRoles?: UserRole[];
}

export interface UserRole {
  role: { code: string; name: string; portal: string };
  organization?: { id: string; name: string; type: string };
}

export interface Organization {
  id: string;
  name: string;
  type: string;
  legalName?: string;
  cin?: string;
  gstin?: string;
  pan?: string;
  website?: string;
  createdAt: string;
  _count?: { members: number; companies: number };
  members?: Array<{
    user: { id: string; email: string; firstName: string; lastName: string };
  }>;
}

export interface Company {
  id: string;
  legalName: string;
  tradeName?: string;
  cin?: string;
  pan?: string;
  gstin?: string;
  status: string;
  employeeCount?: number;
  annualRevenue?: number;
  registeredAddress?: string;
  incorporationDate?: string;
  industry?: { id?: string; code?: string; name: string };
  subSector?: { id?: string; code?: string; name: string };
  profile?: CompanyProfile;
  contacts?: CompanyContact[];
  promoters?: CompanyPromoter[];
  organization?: { id: string; name: string; type: string };
}

export interface CompanyProfile {
  businessDescription?: string;
  productsServices?: string;
  targetMarket?: string;
  competitivePosition?: string;
  website?: string;
}

export interface CompanyContact {
  id: string;
  name: string;
  designation?: string;
  email?: string;
  phone?: string;
  isPrimary: boolean;
}

export interface CompanyPromoter {
  id: string;
  name: string;
  pan?: string;
  shareholdingPct?: number;
  experienceYears?: number;
  isKeyPromoter: boolean;
}

export interface Industry {
  id: string;
  code: string;
  name: string;
  _count?: { subSectors: number };
  pillarWeights?: { pillar: string; weight: string }[];
  subSectors?: SubSector[];
}

export interface SubSector {
  id: string;
  code: string;
  name: string;
}

export interface MasterCategory {
  id: string;
  code: string;
  name: string;
  description?: string;
  items: MasterItem[];
}

export interface MasterItem {
  id: string;
  code: string;
  label: string;
  sortOrder: number;
}

export interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  user?: { id: string; email: string; firstName: string; lastName: string };
}

export interface StoredUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  portal: string;
  roles: string[];
  permissions: string[];
}
