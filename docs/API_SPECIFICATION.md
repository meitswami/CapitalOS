# CapitalOS — API Specification

Base URL: `http://localhost:3001/api/v1`
Swagger: `http://localhost:3001/api/docs`

## Authentication

All endpoints except public routes require `Authorization: Bearer <access_token>`.

### POST /auth/register
Register a new user account.

**Body:**
```json
{
  "email": "user@company.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+91XXXXXXXXXX"
}
```

### POST /auth/login
Authenticate and receive tokens.

**Body:**
```json
{
  "email": "admin@capitalos.io",
  "password": "CapitalOS@2026",
  "mfaCode": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "admin@capitalos.io",
      "roles": ["SUPER_ADMIN"],
      "permissions": ["admin:full"],
      "portal": "SUPER_ADMIN"
    },
    "accessToken": "eyJ...",
    "refreshToken": "uuid"
  }
}
```

### POST /auth/refresh
Refresh access token.

### POST /auth/logout
Revoke refresh token. Requires auth.

### POST /auth/mfa/setup
Initialize MFA. Returns TOTP secret and otpauth URI.

### POST /auth/mfa/enable
Enable MFA after TOTP verification.

---

## Users

| Method | Endpoint | Permission | Description |
|--------|----------|------------|-------------|
| GET | /users/me | — | Current user profile |
| GET | /users | users:read | List users (paginated) |
| GET | /users/:id | users:read | Get user by ID |

**Query params:** `page`, `limit`, `search`

---

## Organizations

| Method | Endpoint | Permission | Description |
|--------|----------|------------|-------------|
| POST | /organizations | organizations:create | Create organization |
| GET | /organizations | organizations:read | List organizations |
| GET | /organizations/:id | organizations:read | Get organization |
| PATCH | /organizations/:id | organizations:update | Update organization |

---

## Master Data

| Method | Endpoint | Permission | Description |
|--------|----------|------------|-------------|
| GET | /masters | masters:read | All categories with items |
| GET | /masters/:code | masters:read | Category by code |
| GET | /masters/:code/items | masters:read | Items for category |

---

## Industry Taxonomy

| Method | Endpoint | Permission | Description |
|--------|----------|------------|-------------|
| GET | /industry | industry:read | List industries |
| GET | /industry/taxonomy | industry:read | Full taxonomy tree |
| GET | /industry/:id | industry:read | Industry with sub-sectors |
| GET | /industry/:id/sub-sectors | industry:read | Sub-sectors list |

---

## Companies

| Method | Endpoint | Permission | Description |
|--------|----------|------------|-------------|
| POST | /companies | companies:create | Create company |
| GET | /companies | companies:read | List companies |
| GET | /companies/:id | companies:read | Get company with profile |
| PATCH | /companies/:id | companies:update | Update company |
| PUT | /companies/:id/profile | companies:update | Upsert company profile |

---

## Audit Trail

| Method | Endpoint | Permission | Description |
|--------|----------|------------|-------------|
| GET | /audit | audit:read | List audit logs |

**Query params:** `page`, `limit`, `action`, `entityType`, `userId`

---

## Health

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /health | Public | Service health check |

---

## Planned APIs (Phases 2–6)

### Phase 2 — Financial & Documents
- `POST/GET /companies/:id/financial-periods`
- `PUT /financial-periods/:id/financial-data`
- `PUT /financial-periods/:id/gst-data`
- `POST /companies/:id/documents` (multipart upload)
- `GET /financial-periods/:id/computed-metrics`

### Phase 3 — CHS Engine
- `POST /companies/:id/chs-assessments`
- `POST /chs-assessments/:id/score`
- `POST /chs-assessments/:id/override`
- `GET /chs-assessments/:id/risk-matrix`
- `POST /chs-assessments/:id/ai-recommendations`

### Phase 4 — Workflow & Reporting
- `POST /workflow/:id/transition`
- `POST /committee/sessions`
- `POST /committee/reviews/:id/vote`
- `POST /reports/generate`

### Phase 5 — Capital Rails
- `POST /deals`
- `POST /deals/:id/debt-rail`
- `POST /deals/:id/equity-rail`
- `POST /deals/:id/startup-rail`

## Response Format

```json
{
  "success": true,
  "data": { },
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

## Error Format

```json
{
  "statusCode": 403,
  "message": "Required permission: companies:create",
  "error": "Forbidden"
}
```
