<ins>SpheraX SaaS Playwright Automation</ins>

This repository contains an end-to-end and API test framework built for the SpheraX SaaS dev environment (`dev:dev01`). The goal is to demonstrate a scalable automation approach focused on one key area of the product while keeping the solution extendable to additional flows.

## Scope & Functional Coverage

- **Chosen area:** Public Store experience (`https://store.dev01.sphrx.xyz/`) plus public IAM/Core/Notify service APIs.
- **UI scenarios (Playwright):**
  - Verify all marketplace cards load (infinite scroll) and basic smoke assertions.
  - Open a random app card, ensure product details match the card metadata.
- **API scenarios:**
  - IAM health, tenant authorization for `demo`, negative check for non-existent tenant.
  - Core service health probe.
  - Notify health, successful “Get in Touch” submission, negative validation when required fields missing.
- **Edge/negative coverage:** 
  - Invalid tenant lookup
  - incomplete Notify payload
  - request-level assertions for robustness.

## Technology Stack

- Node.js + npm
- TypeScript with Playwright Test (UI & API)
- Page Object Model, custom fixtures, and service clients
- ESLint, Prettier, TypeScript compiler checks

## Environment Matrix (dev:dev01)

| Area | URL |
| --- | --- |
| Landing | https://store.dev01.sphrx.xyz/ |
| Store (B2C) | https://app.dev01.sphrx.xyz/ |
| Demo tenant | https://demo.dev01.sphrx.xyz/ |
| IAM API v1 / v2 | https://api.dev01.sphrx.xyz/iam/swagger/v1 |
| Notify API v1 / v2 | https://api.dev01.sphrx.xyz/notify/swagger/v1 |
| Core API v1 | https://api.dev01.sphrx.xyz/core/swagger/v1 |

> UI tests default to the public Store pages, while API tests hit IAM/Core/Notify hosts through their Swagger-documented REST endpoints.

## Prerequisites

- Node.js 20+ (LTS recommended)
- npm 10+
- Git

## Installation

```bash
git clone https://github.com/svtlichnijj/spherax-saas-playwright.git
cd spherax-saas-playwright
npm install
npx playwright install --with-deps chromium
```

## Environment Variables

Use a `.env` file in the project root (loaded via `dotenv`) or export variables in your shell:

```dotenv
SPHERAX_BASE_URL=https://dev01.sphrx.xyz
SPHERAX_STORE_URL=https://store.dev01.sphrx.xyz
SPHERAX_API_URL=https://api.dev01.sphrx.xyz
```

| Variable | Purpose | Default |
| --- | --- | --- |
| `SPHERAX_BASE_URL` | Base host for Playwright UI navigation | `https://dev01.sphrx.xyz` |
| `SPHERAX_STORE_URL` | Store landing & product pages | `https://store.dev01.sphrx.xyz` |
| `SPHERAX_API_URL` | Root host for public APIs (IAM/Core/Notify) | `https://api.dev01.sphrx.xyz` |

No credentials are required for the selected public endpoints. If future flows demand auth tokens, extend the `.env` file accordingly.

## Running the Tests

```bash
# Run the entire UI + API suite
npx playwright test

# Run only UI store scenarios
npx playwright test tests/ui/store.spec.ts

# Run only API suites
npx playwright test tests/api

# View the latest HTML report
npx playwright show-report
```

### Quality Gates

```bash
npm run tsc:check    # TypeScript type-check
npm run lint:check   # ESLint
npm run lint:fix     # ESLint with auto-fix
```

## Project Structure

```
spherax-saas-playwright/
├── src/
│   ├── api/          # API clients for IAM/Core/Notify services
│   ├── fixtures/     # Custom Playwright fixtures (API + UI)
│   ├── pages/        # Page Objects (Store listing, product details)
│   └── types/        # Shared response typings
├── tests/
│   ├── api/          # Public API checks with positive/negative cases
│   └── ui/           # Store smoke scenarios
├── playwright.config.ts
├── test-results/     # Raw Playwright artifacts
└── README.md
```

## Test Design Notes

- **Page Objects & Fixtures:** UI tests rely on `StorePage` and `ProductPage` abstractions plus shared fixtures for navigation and state-less execution.
- **Service Clients:** Dedicated IAM, Core, and Notify clients encapsulate REST calls, logging each response into `temp/responses` for troubleshooting.
- **Reporting:** Playwright HTML reporter with trace retention on retry; ready for CI artifacts.
- **Scalability:** Config-driven URLs allow pointing the same suite at future environments (`SPHERAX_*` variables or CI secrets).

## What's Next (If More Time)

- Add auth-dependent flows (login/logout via Cognito) and tenant-specific dashboards.
- Extend Store coverage to filtering, search, and cart initiation.
- Integrate API contract validation (e.g., Zod/JSON schema) and response-time SLAs.
- Wire up GitHub Actions/Playwright Docker image for repeatable CI builds.
- Introduce synthetic test data seeding via IAM endpoints (tokens, tenants).


## Author

[Taras Svitlychnyi](https://github.com/svtlichnijj)

---
