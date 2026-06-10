# CapitalOS — User Stories

## Epic 1: Authentication & Security

### US-1.1 — User Registration
**As a** new user, **I want to** register with email and password **so that** I can access the platform.
- Acceptance: Email validation, password min 8 chars, bcrypt hashing, pending verification status

### US-1.2 — User Login
**As a** registered user, **I want to** log in with email/password **so that** I can access my portal.
- Acceptance: JWT access + refresh tokens, role/permission payload, audit log on login

### US-1.3 — MFA Setup
**As a** security-conscious user, **I want to** enable TOTP MFA **so that** my account is protected.
- Acceptance: QR/secret generation, verification before enable, MFA required on login

### US-1.4 — Token Refresh
**As a** logged-in user, **I want to** refresh my session **so that** I stay authenticated without re-login.
- Acceptance: Refresh token rotation, old token revoked, 7-day expiry

---

## Epic 2: Company Management (Phase 1)

### US-2.1 — Create Company
**As an** analyst, **I want to** create a company profile with industry classification **so that** assessments can begin.
- Acceptance: Industry + sub-sector required, CIN uniqueness, draft status default

### US-2.2 — Company Profile
**As a** company admin, **I want to** update business description and market position **so that** qualitative scoring has context.

### US-2.3 — Promoter Data
**As an** analyst, **I want to** record promoter details and shareholding **so that** management pillar can be scored.

---

## Epic 3: Industry Taxonomy (Phase 1)

### US-3.1 — Browse Industries
**As an** analyst, **I want to** browse 23 industries and 300+ sub-sectors **so that** I classify companies correctly.

### US-3.2 — Industry Weights
**As a** system, **I want to** apply industry-specific CHS pillar weights **so that** scoring reflects sector dynamics.

---

## Epic 4: Client Data Sheet (Phase 2)

### US-4.1 — Financial Data Entry
**As an** analyst, **I want to** enter P&L and balance sheet data **so that** financial ratios are auto-calculated.

### US-4.2 — GST/ITR/MCA Data
**As an** analyst, **I want to** enter regulatory filing data **so that** compliance and verification scores are derived.

### US-4.3 — Banking Analysis
**As an** analyst, **I want to** enter bank account data **so that** liquidity and cash flow patterns are assessed.

### US-4.4 — Auto Metrics
**As a** system, **I want to** calculate DSCR, ICR, ratios, and growth metrics **so that** analysts don't manually compute them.

---

## Epic 5: CHS Engine (Phase 3)

### US-5.1 — Auto Scoring
**As a** system, **I want to** auto-score quantitative parameters from financial data **so that** scoring is consistent.

### US-5.2 — Manual Scoring
**As an** analyst, **I want to** manually score qualitative parameters **so that** human judgment is captured.

### US-5.3 — AI Suggested Scoring
**As an** analyst, **I want to** see AI-suggested scores with confidence and reasoning **so that** I can accept or override.

### US-5.4 — Score Override
**As a** senior analyst, **I want to** override any score with reason and evidence **so that** exceptions are documented and auditable.

### US-5.5 — Capital Route Recommendation
**As a** system, **I want to** recommend Debt/Equity/Startup rail based on CHS **so that** funding is optimally routed.

---

## Epic 6: Workflow (Phase 4)

### US-6.1 — Submit for Review
**As a** company admin, **I want to** submit my assessment for analyst review **so that** the evaluation process begins.

### US-6.2 — Analyst Review
**As an** analyst, **I want to** review and advance assessments through workflow stages **so that** proper governance is maintained.

### US-6.3 — Committee Review
**As a** committee member, **I want to** review and vote on assessments **so that** credit decisions are collective.

### US-6.4 — Return for Revision
**As an** analyst, **I want to** return assessments with comments **so that** companies can address gaps.

---

## Epic 7: Reporting (Phase 4)

### US-7.1 — CHS Report
**As an** analyst, **I want to** generate a CHS report **so that** stakeholders see the full scoring breakdown.

### US-7.2 — Export PDF/Excel
**As a** lender, **I want to** export reports in PDF and Excel **so that** I can share with my credit team.

---

## Epic 8: Capital Rails (Phase 5)

### US-8.1 — Debt Rail Application
**As a** lender, **I want to** review debt facility applications with DSCR and collateral data **so that** I can make lending decisions.

### US-8.2 — Equity Rail Application
**As an** investor, **I want to** review equity rounds with valuation and use-of-funds **so that** I can evaluate investments.

### US-8.3 — Startup Rail Application
**As a** VC, **I want to** review startup applications with burn rate and traction **so that** I can assess early-stage opportunities.

---

## Epic 9: Audit & Compliance

### US-9.1 — Audit Trail
**As a** super admin, **I want to** view full audit logs **so that** all platform actions are traceable for compliance.

### US-9.2 — Override Audit
**As a** compliance officer, **I want every** score override to record user, reason, evidence, and timestamp **so that** decisions are explainable.
