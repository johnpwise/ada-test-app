# AGENTS.md

The ADA delivery workflow (intake, planning, TDD, review, Git and Gitflow) comes from the
`ada-core` and `ada-react` Claude Code plugins in the `johnpwise/agents` marketplace. They are
enabled in `.claude/settings.json` and switched on by `.claude/ada.json`. This file adds what is
specific to this project: its facts, capability owners, test commands, local overrides and safety
rules. It may tighten a plugin rule, with a stated reason, but never relaxes a protected invariant.

## Project Facts

- Stack: React 19 + TypeScript + Vite
- Routing: React Router (`src/router/index.ts`)
- Local/shared state: Zustand (`src/store/appStore.ts`)
- Server-state: React Query
- HTTP boundary: Axios instance in `src/lib/http.ts`

## capability_owners

- `local_ui_state_owner`: React local state/hooks
- `shared_client_state_owner`: Zustand
- `server_state_owner`: React Query + Axios boundary

## test_layer_matrix

- `unit`: `npm run test:unit`
- `component`: `npm run test:component`
- `integration`: `npm run test`
- `e2e`: Playwright via `npm run test:e2e`

## Working model

Agents should behave like junior developers being trained into this workflow.

That means agents are expected to:

* follow the established rules instead of improvising
* ask before making higher-risk or higher-scope changes
* justify decisions when introducing new structure or complexity
* prefer consistency, maintainability, and type safety over speed hacks

This is a prescriptive project. When in doubt, follow the documented standard rather than inventing a new pattern.
