import { PrismaClient, PortalType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const ROLES = [
  { code: 'SUPER_ADMIN', name: 'Super Administrator', portal: PortalType.SUPER_ADMIN },
  { code: 'COMPANY_ADMIN', name: 'Company Administrator', portal: PortalType.COMPANY },
  { code: 'ANALYST', name: 'Analyst', portal: PortalType.ANALYST },
  { code: 'SENIOR_ANALYST', name: 'Senior Analyst', portal: PortalType.ANALYST },
  { code: 'LENDER', name: 'Lender', portal: PortalType.LENDER },
  { code: 'INVESTOR', name: 'Investor', portal: PortalType.INVESTOR },
  { code: 'COMMITTEE_MEMBER', name: 'Committee Member', portal: PortalType.COMMITTEE },
  { code: 'COMMITTEE_CHAIR', name: 'Committee Chair', portal: PortalType.COMMITTEE },
];

const PERMISSIONS = [
  { code: 'auth:manage', name: 'Manage Authentication', module: 'auth' },
  { code: 'users:read', name: 'Read Users', module: 'users' },
  { code: 'users:create', name: 'Create Users', module: 'users' },
  { code: 'users:update', name: 'Update Users', module: 'users' },
  { code: 'users:delete', name: 'Delete Users', module: 'users' },
  { code: 'organizations:read', name: 'Read Organizations', module: 'organizations' },
  { code: 'organizations:create', name: 'Create Organizations', module: 'organizations' },
  { code: 'organizations:update', name: 'Update Organizations', module: 'organizations' },
  { code: 'masters:read', name: 'Read Master Data', module: 'masters' },
  { code: 'masters:manage', name: 'Manage Master Data', module: 'masters' },
  { code: 'industry:read', name: 'Read Industry Taxonomy', module: 'industry' },
  { code: 'industry:manage', name: 'Manage Industry Taxonomy', module: 'industry' },
  { code: 'companies:read', name: 'Read Companies', module: 'companies' },
  { code: 'companies:create', name: 'Create Companies', module: 'companies' },
  { code: 'companies:update', name: 'Update Companies', module: 'companies' },
  { code: 'companies:delete', name: 'Delete Companies', module: 'companies' },
  { code: 'documents:read', name: 'Read Documents', module: 'documents' },
  { code: 'documents:upload', name: 'Upload Documents', module: 'documents' },
  { code: 'documents:verify', name: 'Verify Documents', module: 'documents' },
  { code: 'financial:read', name: 'Read Financial Data', module: 'financial' },
  { code: 'financial:manage', name: 'Manage Financial Data', module: 'financial' },
  { code: 'chs:read', name: 'Read CHS Assessments', module: 'chs' },
  { code: 'chs:score', name: 'Score CHS Parameters', module: 'chs' },
  { code: 'chs:override', name: 'Override CHS Scores', module: 'chs' },
  { code: 'chs:approve', name: 'Approve CHS Assessments', module: 'chs' },
  { code: 'risk:read', name: 'Read Risk Matrix', module: 'risk' },
  { code: 'risk:manage', name: 'Manage Risk Matrix', module: 'risk' },
  { code: 'workflow:read', name: 'Read Workflow', module: 'workflow' },
  { code: 'workflow:action', name: 'Workflow Actions', module: 'workflow' },
  { code: 'committee:read', name: 'Read Committee', module: 'committee' },
  { code: 'committee:vote', name: 'Committee Vote', module: 'committee' },
  { code: 'committee:manage', name: 'Manage Committee', module: 'committee' },
  { code: 'deals:read', name: 'Read Deals', module: 'deals' },
  { code: 'deals:create', name: 'Create Deals', module: 'deals' },
  { code: 'deals:manage', name: 'Manage Deals', module: 'deals' },
  { code: 'debt_rail:read', name: 'Read Debt Rail', module: 'debt_rail' },
  { code: 'debt_rail:manage', name: 'Manage Debt Rail', module: 'debt_rail' },
  { code: 'equity_rail:read', name: 'Read Equity Rail', module: 'equity_rail' },
  { code: 'equity_rail:manage', name: 'Manage Equity Rail', module: 'equity_rail' },
  { code: 'startup_rail:read', name: 'Read Startup Rail', module: 'startup_rail' },
  { code: 'startup_rail:manage', name: 'Manage Startup Rail', module: 'startup_rail' },
  { code: 'reports:read', name: 'Read Reports', module: 'reports' },
  { code: 'reports:generate', name: 'Generate Reports', module: 'reports' },
  { code: 'reports:export', name: 'Export Reports', module: 'reports' },
  { code: 'audit:read', name: 'Read Audit Logs', module: 'audit' },
  { code: 'admin:full', name: 'Full Admin Access', module: 'admin' },
];

const ROLE_PERMISSION_MAP: Record<string, string[]> = {
  SUPER_ADMIN: PERMISSIONS.map((p) => p.code),
  COMPANY_ADMIN: [
    'companies:read', 'companies:update', 'documents:read', 'documents:upload',
    'financial:read', 'financial:manage', 'chs:read', 'workflow:read',
    'workflow:action', 'deals:read', 'reports:read',
  ],
  ANALYST: [
    'companies:read', 'companies:update', 'documents:read', 'documents:verify',
    'financial:read', 'financial:manage', 'chs:read', 'chs:score', 'chs:override',
    'risk:read', 'risk:manage', 'workflow:read', 'workflow:action',
    'reports:read', 'reports:generate',
  ],
  SENIOR_ANALYST: [
    'companies:read', 'companies:update', 'documents:read', 'documents:verify',
    'financial:read', 'financial:manage', 'chs:read', 'chs:score', 'chs:override',
    'chs:approve', 'risk:read', 'risk:manage', 'workflow:read', 'workflow:action',
    'reports:read', 'reports:generate', 'reports:export',
  ],
  LENDER: [
    'companies:read', 'chs:read', 'risk:read', 'deals:read', 'deals:manage',
    'debt_rail:read', 'debt_rail:manage', 'reports:read', 'reports:export',
  ],
  INVESTOR: [
    'companies:read', 'chs:read', 'risk:read', 'deals:read', 'deals:manage',
    'equity_rail:read', 'equity_rail:manage', 'startup_rail:read',
    'startup_rail:manage', 'reports:read', 'reports:export',
  ],
  COMMITTEE_MEMBER: [
    'companies:read', 'chs:read', 'risk:read', 'workflow:read',
    'committee:read', 'committee:vote', 'reports:read',
  ],
  COMMITTEE_CHAIR: [
    'companies:read', 'chs:read', 'risk:read', 'workflow:read', 'workflow:action',
    'committee:read', 'committee:vote', 'committee:manage', 'chs:approve',
    'reports:read', 'reports:generate',
  ],
};

const INDUSTRIES = [
  { code: 'MFG', name: 'Manufacturing', subSectors: ['Auto Components', 'Textiles', 'Pharma API', 'Electronics'] },
  { code: 'IT', name: 'Information Technology', subSectors: ['SaaS', 'IT Services', 'Product Engineering'] },
  { code: 'FMCG', name: 'FMCG', subSectors: ['Food & Beverages', 'Personal Care', 'Household'] },
  { code: 'RE', name: 'Real Estate', subSectors: ['Residential', 'Commercial', 'Industrial Parks'] },
  { code: 'HC', name: 'Healthcare', subSectors: ['Hospitals', 'Diagnostics', 'Medical Devices'] },
  { code: 'FIN', name: 'Financial Services', subSectors: ['NBFC', 'Insurance Broking', 'Wealth Management'] },
  { code: 'LOG', name: 'Logistics', subSectors: ['3PL', 'Cold Chain', 'Last Mile'] },
  { code: 'ENR', name: 'Energy & Renewables', subSectors: ['Solar EPC', 'Wind O&M', 'Biofuel'] },
  { code: 'AGR', name: 'Agriculture', subSectors: ['Agri Inputs', 'Food Processing', 'Dairy'] },
  { code: 'EDU', name: 'Education', subSectors: ['K-12', 'EdTech', 'Skill Development'] },
];

const PILLAR_WEIGHTS = [
  { pillar: 'STRATEGIC_BUSINESS' as const, weight: 15 },
  { pillar: 'FINANCIAL' as const, weight: 25 },
  { pillar: 'LIQUIDITY' as const, weight: 15 },
  { pillar: 'MANAGEMENT' as const, weight: 15 },
  { pillar: 'OPERATIONAL' as const, weight: 10 },
  { pillar: 'INDUSTRY' as const, weight: 10 },
  { pillar: 'ESG' as const, weight: 10 },
];

async function main() {
  console.log('Seeding CapitalOS database...');

  for (const perm of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { code: perm.code },
      update: {},
      create: perm,
    });
  }

  for (const role of ROLES) {
    const created = await prisma.role.upsert({
      where: { code: role.code },
      update: {},
      create: { ...role, isSystem: true },
    });

    const permCodes = ROLE_PERMISSION_MAP[role.code] || [];
    for (const code of permCodes) {
      const perm = await prisma.permission.findUnique({ where: { code } });
      if (perm) {
        await prisma.rolePermission.upsert({
          where: { roleId_permissionId: { roleId: created.id, permissionId: perm.id } },
          update: {},
          create: { roleId: created.id, permissionId: perm.id },
        });
      }
    }
  }

  for (const ind of INDUSTRIES) {
    const industry = await prisma.industry.upsert({
      where: { code: ind.code },
      update: {},
      create: { code: ind.code, name: ind.name },
    });

    for (const weight of PILLAR_WEIGHTS) {
      await prisma.industryPillarWeight.upsert({
        where: { industryId_pillar: { industryId: industry.id, pillar: weight.pillar } },
        update: { weight: weight.weight },
        create: { industryId: industry.id, pillar: weight.pillar, weight: weight.weight },
      });
    }

    for (let i = 0; i < ind.subSectors.length; i++) {
      const code = `${ind.code}-${String(i + 1).padStart(3, '0')}`;
      await prisma.subSector.upsert({
        where: { industryId_code: { industryId: industry.id, code } },
        update: {},
        create: { industryId: industry.id, code, name: ind.subSectors[i] },
      });
    }
  }

  const masterCategories = [
    { code: 'COMPANY_TYPE', name: 'Company Type', items: ['Private Limited', 'Public Limited', 'LLP', 'Partnership'] },
    { code: 'FACILITY_TYPE', name: 'Facility Type', items: ['Term Loan', 'Working Capital', 'CC/OD', 'LC/BG'] },
    { code: 'ROUND_TYPE', name: 'Round Type', items: ['Seed', 'Series A', 'Series B', 'Growth', 'Pre-IPO'] },
    { code: 'DOCUMENT_TYPE', name: 'Document Type', items: ['Financial Statements', 'GST Returns', 'ITR', 'Bank Statements', 'MCA Filings'] },
  ];

  for (const cat of masterCategories) {
    const category = await prisma.masterDataCategory.upsert({
      where: { code: cat.code },
      update: {},
      create: { code: cat.code, name: cat.name },
    });

    for (let i = 0; i < cat.items.length; i++) {
      await prisma.masterDataItem.upsert({
        where: { categoryId_code: { categoryId: category.id, code: `${cat.code}_${i + 1}` } },
        update: {},
        create: {
          categoryId: category.id,
          code: `${cat.code}_${i + 1}`,
          name: cat.items[i],
          sortOrder: i,
        },
      });
    }
  }

  const docCategories = [
    { code: 'FINANCIAL_STATEMENTS', name: 'Financial Statements', isRequired: true },
    { code: 'GST_RETURNS', name: 'GST Returns', isRequired: true },
    { code: 'ITR', name: 'Income Tax Returns', isRequired: true },
    { code: 'BANK_STATEMENTS', name: 'Bank Statements', isRequired: true },
    { code: 'MCA_FILINGS', name: 'MCA Filings', isRequired: false },
    { code: 'COLLATERAL_DOCS', name: 'Collateral Documents', isRequired: false },
    { code: 'ESG_REPORTS', name: 'ESG Reports', isRequired: false },
  ];

  for (const doc of docCategories) {
    await prisma.documentCategory.upsert({
      where: { code: doc.code },
      update: {},
      create: doc,
    });
  }

  const passwordHash = await bcrypt.hash('CapitalOS@2026', 12);
  const adminRole = await prisma.role.findUnique({ where: { code: 'SUPER_ADMIN' } });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@capitalos.io' },
    update: {},
    create: {
      email: 'admin@capitalos.io',
      passwordHash,
      firstName: 'System',
      lastName: 'Administrator',
      status: 'ACTIVE',
      emailVerified: true,
    },
  });

  if (adminRole) {
    const existingAdminRole = await prisma.userRole.findFirst({
      where: { userId: admin.id, roleId: adminRole.id, organizationId: null },
    });
    if (!existingAdminRole) {
      await prisma.userRole.create({ data: { userId: admin.id, roleId: adminRole.id } });
    }
  }

  // ── Dummy users per portal ──────────────────────────────────────────────
  const demoUsers = [
    { email: 'analyst@capitalos.io', firstName: 'Priya', lastName: 'Sharma', roleCode: 'ANALYST' },
    { email: 'senior@capitalos.io', firstName: 'Rajesh', lastName: 'Kumar', roleCode: 'SENIOR_ANALYST' },
    { email: 'company@acmetech.in', firstName: 'Amit', lastName: 'Patel', roleCode: 'COMPANY_ADMIN' },
    { email: 'lender@hdfcbank.demo', firstName: 'Suresh', lastName: 'Menon', roleCode: 'LENDER' },
    { email: 'investor@sequoia.demo', firstName: 'Neha', lastName: 'Reddy', roleCode: 'INVESTOR' },
    { email: 'committee@capitalos.io', firstName: 'Vikram', lastName: 'Singh', roleCode: 'COMMITTEE_CHAIR' },
  ];

  for (const demo of demoUsers) {
    const user = await prisma.user.upsert({
      where: { email: demo.email },
      update: {},
      create: {
        email: demo.email,
        passwordHash,
        firstName: demo.firstName,
        lastName: demo.lastName,
        status: 'ACTIVE',
        emailVerified: true,
      },
    });
    const role = await prisma.role.findUnique({ where: { code: demo.roleCode } });
    if (role) {
      const exists = await prisma.userRole.findFirst({
        where: { userId: user.id, roleId: role.id },
      });
      if (!exists) {
        await prisma.userRole.create({ data: { userId: user.id, roleId: role.id } });
      }
    }
  }

  // ── Organizations ─────────────────────────────────────────────────────
  const orgs = [
    { name: 'Acme Technologies Pvt Ltd', type: 'COMPANY' as const, cin: 'U72900KA2018PTC115432', gstin: '29AABCA1234A1Z5', pan: 'AABCA1234A' },
    { name: 'HDFC Bank Ltd', type: 'BANK' as const, cin: 'L65920MH1994PLC080618', pan: 'AAACH2702H' },
    { name: 'Sequoia Capital India', type: 'VC_FUND' as const, pan: 'AABCS1234F' },
    { name: 'CapitalOS Advisory', type: 'ADVISORY' as const, pan: 'AABCC5678G' },
  ];

  const createdOrgs: Record<string, string> = {};
  for (const org of orgs) {
    const existing = await prisma.organization.findFirst({ where: { name: org.name } });
    const record = existing ?? await prisma.organization.create({ data: org });
    createdOrgs[org.name] = record.id;
  }

  // ── Dummy companies ─────────────────────────────────────────────────────
  const mfgIndustry = await prisma.industry.findUnique({ where: { code: 'MFG' } });
  const itIndustry = await prisma.industry.findUnique({ where: { code: 'IT' } });
  const fmcgIndustry = await prisma.industry.findUnique({ where: { code: 'FMCG' } });

  const mfgSub = mfgIndustry
    ? await prisma.subSector.findFirst({ where: { industryId: mfgIndustry.id } })
    : null;
  const itSub = itIndustry
    ? await prisma.subSector.findFirst({ where: { industryId: itIndustry.id, code: 'IT-001' } })
    : null;
  const fmcgSub = fmcgIndustry
    ? await prisma.subSector.findFirst({ where: { industryId: fmcgIndustry.id } })
    : null;

  const companies = [
    {
      legalName: 'Acme Technologies Private Limited',
      tradeName: 'AcmeTech',
      cin: 'U72900KA2018PTC115432',
      pan: 'AABCA1234A',
      gstin: '29AABCA1234A1Z5',
      industryId: itIndustry?.id,
      subSectorId: itSub?.id,
      orgName: 'Acme Technologies Pvt Ltd',
      status: 'ACTIVE' as const,
      employeeCount: 250,
      annualRevenue: 450000000,
      profile: {
        businessDescription: 'Enterprise SaaS platform for supply chain optimization across India and SEA.',
        productsServices: 'Cloud SCM, Inventory Analytics, Vendor Portal',
        targetMarket: 'Mid-market manufacturers and distributors',
        competitivePosition: 'Top 3 in Indian SCM SaaS segment',
        website: 'https://acmetech.demo',
      },
      promoters: [
        { name: 'Amit Patel', pan: 'ABCPA1234A', shareholdingPct: 45, experienceYears: 15, isKeyPromoter: true },
        { name: 'Sneha Iyer', pan: 'ABPCI5678B', shareholdingPct: 30, experienceYears: 12, isKeyPromoter: true },
      ],
      contacts: [
        { name: 'Amit Patel', designation: 'CEO', email: 'amit@acmetech.in', phone: '+919876543210', isPrimary: true },
      ],
    },
    {
      legalName: 'GreenFoods India Private Limited',
      tradeName: 'GreenFoods',
      cin: 'U15400MH2015PTC265890',
      pan: 'AABCG2345B',
      gstin: '27AABCG2345B1Z8',
      industryId: fmcgIndustry?.id,
      subSectorId: fmcgSub?.id,
      status: 'UNDER_REVIEW' as const,
      employeeCount: 1200,
      annualRevenue: 2800000000,
      profile: {
        businessDescription: 'Organic and natural food products manufacturer with pan-India distribution.',
        productsServices: 'Organic snacks, health beverages, ready-to-eat meals',
        targetMarket: 'Health-conscious urban consumers',
        website: 'https://greenfoods.demo',
      },
      promoters: [
        { name: 'Ravi Deshmukh', shareholdingPct: 55, experienceYears: 20, isKeyPromoter: true },
      ],
      contacts: [
        { name: 'Ravi Deshmukh', designation: 'Managing Director', email: 'ravi@greenfoods.demo', isPrimary: true },
      ],
    },
    {
      legalName: 'Precision Auto Components Ltd',
      tradeName: 'Precision Auto',
      cin: 'U35999TN2010PLC076543',
      pan: 'AABCP3456C',
      gstin: '33AABCP3456C1Z2',
      industryId: mfgIndustry?.id,
      subSectorId: mfgSub?.id,
      status: 'ACTIVE' as const,
      employeeCount: 800,
      annualRevenue: 1200000000,
      profile: {
        businessDescription: 'Tier-1 auto component supplier to major OEMs in India and export markets.',
        productsServices: 'Engine components, transmission parts, EV battery housings',
        targetMarket: 'Automotive OEMs and Tier-2 suppliers',
      },
      promoters: [
        { name: 'Karthik Subramanian', shareholdingPct: 38, experienceYears: 25, isKeyPromoter: true },
        { name: 'Lakshmi Narayanan', shareholdingPct: 22, experienceYears: 18, isKeyPromoter: false },
      ],
      contacts: [
        { name: 'Karthik Subramanian', designation: 'Chairman', email: 'karthik@precisionauto.demo', isPrimary: true },
      ],
    },
  ];

  for (const co of companies) {
    if (!co.industryId || !co.subSectorId) continue;

    const company = await prisma.company.upsert({
      where: { cin: co.cin! },
      update: {},
      create: {
        legalName: co.legalName,
        tradeName: co.tradeName,
        cin: co.cin,
        pan: co.pan,
        gstin: co.gstin,
        industryId: co.industryId,
        subSectorId: co.subSectorId,
        organizationId: co.orgName ? createdOrgs[co.orgName] : undefined,
        status: co.status,
        employeeCount: co.employeeCount,
        annualRevenue: co.annualRevenue,
        incorporationDate: new Date('2015-04-01'),
        registeredAddress: 'Bangalore, Karnataka, India',
      },
    });

    if (co.profile) {
      await prisma.companyProfile.upsert({
        where: { companyId: company.id },
        update: co.profile,
        create: { companyId: company.id, ...co.profile },
      });
    }

    for (const promoter of co.promoters ?? []) {
      const exists = await prisma.promoter.findFirst({
        where: { companyId: company.id, name: promoter.name },
      });
      if (!exists) {
        await prisma.promoter.create({ data: { companyId: company.id, ...promoter } });
      }
    }

    for (const contact of co.contacts ?? []) {
      const exists = await prisma.companyContact.findFirst({
        where: { companyId: company.id, email: contact.email },
      });
      if (!exists) {
        await prisma.companyContact.create({ data: { companyId: company.id, ...contact } });
      }
    }
  }

  // ── Sample audit log ────────────────────────────────────────────────────
  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'CREATE',
      entityType: 'Seed',
      entityId: 'initial-seed',
      metadata: { message: 'CapitalOS initial seed data loaded' },
    },
  });

  console.log('Seed completed successfully.');
  console.log('');
  console.log('Login credentials (password for all: CapitalOS@2026):');
  console.log('  admin@capitalos.io       — Super Admin');
  console.log('  analyst@capitalos.io     — Analyst');
  console.log('  senior@capitalos.io      — Senior Analyst');
  console.log('  company@acmetech.in      — Company Admin');
  console.log('  lender@hdfcbank.demo     — Lender');
  console.log('  investor@sequoia.demo    — Investor');
  console.log('  committee@capitalos.io   — Committee Chair');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
