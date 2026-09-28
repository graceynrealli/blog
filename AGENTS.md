<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Code conventions (Codelog)

## Folder layout

```
app/                  Routes only: compose feature components, no business logic
components/ui/        Shared, feature-agnostic UI (Button, Card, Container, Input, ...)
components/layout/    Site chrome (header, footer, logo, skip link)
components/providers/ App-wide client providers (TanStack Query)
config/               App-wide constants: routes, navigation, site info, fonts
lib/                  Generic helpers and hooks with no feature knowledge (env, supabase, markdown, format, utils)
features/<name>/
  constants.ts        Named values: cache tags, limits, labels, error codes
  types.ts            DTOs that leave the server
  rows.ts             Shapes of database rows returned by selects
  selects.ts          PostgREST select strings
  mappers.ts          Row -> DTO
  schemas.ts          zod schemas
  queries.ts          Reads (server-only)
  actions.ts          Writes (Server Actions); a folder actions/ when there are several groups
  services/           Server-only steps shared by several actions (e.g. syncing tags, cache refresh)
  api.ts              Browser-side fetchers for this feature's /api routes
  utils/              Pure helpers, one concern per file
  hooks/              Client hooks
  components/         Components for this feature
types/database.ts     Generated from Supabase
```

## Rules

- One concern per file. Constants, types, helpers, hooks, schemas and mappers never live inline in a component, page or query file.
- No magic strings or numbers: routes come from `config/routes.ts`, cache tags and limits from the feature's `constants.ts`, env var names from `lib/env-keys.ts`.
- UI that appears in more than one place becomes a component in `components/ui`; feature components compose those instead of repeating class strings.
- Features may import from `components`, `config`, `lib` and `types`, and from another feature's `types.ts`, `constants.ts` or `components/`. Never from another feature's `queries.ts` or `actions.ts`.
- The browser never calls Supabase. Anything that reaches the browser is a DTO.
- Pure helpers get a colocated `*.test.ts`.
