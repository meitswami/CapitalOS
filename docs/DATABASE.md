# CapitalOS — Database Guide

## Where Is the Database?

CapitalOS uses **MySQL** hosted on **Hostinger**, not a local PostgreSQL instance.

| Setting | Value |
|---------|-------|
| **Host** | `auth-db1274.hstgr.io` |
| **Port** | `3306` |
| **Database** | `u334425891_capitalos` |
| **User** | `u334425891_capitalos` |
| **Admin UI** | [phpMyAdmin](https://auth-db1274.hstgr.io/index.php?db=u334425891_capitalos) |

## Connection String

Set in `.env` at project root and `packages/database/.env`:

```
DATABASE_URL="mysql://u334425891_capitalos:YOUR_URL_ENCODED_PASSWORD@auth-db1274.hstgr.io:3306/u334425891_capitalos"
```

> **Note:** URL-encode special characters in the password (`+` → `%2B`, `:` → `%3A`).

## Schema Location

The single source of truth is:

```
packages/database/prisma/schema.prisma
```

This defines **42 tables** for the full CapitalOS platform.

## Commands

```bash
# Push schema to MySQL (create/update tables)
pnpm db:push

# Load seed / dummy data
pnpm db:seed

# Regenerate Prisma client after schema changes
pnpm db:generate

# Open Prisma Studio (local GUI)
pnpm db:studio
```

## What Was Seeded

| Data | Count |
|------|-------|
| Roles | 8 |
| Permissions | 40+ |
| Industries | 10 |
| Sub-sectors | 30+ |
| Master data categories | 4 |
| Document categories | 7 |
| Users | 7 (all portals) |
| Organizations | 4 |
| Companies | 3 (with profiles, promoters, contacts) |

## Default Login (all passwords: `CapitalOS@2026`)

| Email | Role |
|-------|------|
| admin@capitalos.io | Super Admin |
| analyst@capitalos.io | Analyst |
| senior@capitalos.io | Senior Analyst |
| company@acmetech.in | Company Admin |
| lender@hdfcbank.demo | Lender |
| investor@sequoia.demo | Investor |
| committee@capitalos.io | Committee Chair |

## Local Docker (Optional)

`docker/docker-compose.yml` still includes PostgreSQL for offline dev, but **production uses Hostinger MySQL**. You can ignore Docker Postgres unless you want a fully local stack.
