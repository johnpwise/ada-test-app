# AGENTS.md

This app inherits shared workflow rules and React stack guidance from:

- `.github/agents/agents-core/AGENTS.md`
- `.github/agents/react-stack-pack/AGENTS.md`

## Project Facts

- Stack: React 18+ + TypeScript + Vite
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

### Working model

Agents should behave like junior developers being trained into this workflow.

That means agents are expected to:

* follow the established rules instead of improvising
* ask before making higher-risk or higher-scope changes
* justify decisions when introducing new structure or complexity
* prefer consistency, maintainability, and type safety over speed hacks

This is a prescriptive project. When in doubt, follow the documented standard rather than inventing a new pattern.

### Agent instruction sources

Agent guidance in this repo is sourced from:

1. root `AGENTS.md` (authoritative repo rules)
2. `.github/agents/react-stack-pack/AGENTS.md` and `.github/agents/react-stack-pack/agent-docs/...` (React stack baseline)
3. `.github/agents/agents-core/AGENTS.md` and `.github/agents/agents-core/agent-docs/...` (core workflow baseline)

When guidance conflicts, earlier items in this list take precedence.

### Workflow inheritance sync

This repo inherits workflow defaults from `.github/agents/agents-core` and `.github/agents/react-stack-pack`.
This overlay should document repo-specific facts, explicit local overrides, and approval boundaries only.

### Coding standards inheritance

Coding standards for generated React code/tests are inherited from:

- `.github/agents/react-stack-pack/agent-docs/standards/coding/*.md`
- applicable quality/workflow constraints from `.github/agents/agents-core/AGENTS.md` and `.github/agents/agents-core/agent-docs/...`

### Policy ownership map

* `agents-core`: stack-neutral workflow governance, fail-closed mechanics, handoff/checkpoint contract, and test-evidence lifecycle.
* `react-stack-pack`: React workflow triggers/gates plus React API/state/testing coding conventions.
* root `AGENTS.md`: project-specific runtime/tooling facts, architecture direction, local conventions, and concrete capability/test-tool mapping.

### Local workflow override

* Workflow artifacts must be persisted in `.agent-workflows/<workflow_id>/` for file-first routing.
* After workflow status is `closed`, `.agent-workflows/<workflow_id>/` must be deleted to avoid artifact buildup.

### Inherited workflow defaults (no local override)

* `delivery-engineer` remains the active workflow owner.
* Feature workflow entry requires a leading `New Feature` trigger.
* Bug workflow entry requires a leading `Bug Fix` trigger.
* Mandatory work-branch preflight: before workflow artifacts or code/test edits, cleanly synchronize `develop` with `origin/develop` using `git pull --ff-only origin develop`, derive a kebab-case slug, reject collisions, and create `feature/<slug>` or `bugfix/<slug>` without pushing an empty branch.
* Triggered requests run in fail-closed mode until `.agent-workflows/<workflow_id>/index.md` and the first workflow artifact is persisted.
* In fail-closed mode, the first response must report workflow ownership/routing state, not direct implementation edits.
* Every workflow step is recorded per the core `handoff-template.md` (compact Step Record; full Cross-Context Handoff Package only for a separate agent context).
* Default `Return To Agent` is `delivery-engineer.agent.md` unless an incoming handoff explicitly overrides it.
* One primary context owns the slice; re-enter the workflow-owner role explicitly only for `blocked`, `awaiting-approval`, or `ready-for-closeout`.
* Complexity is classified `trivial` vs `non-trivial` and the delivery is sequenced into TDD increments — inline, not a separate agent.
* Review is applied inline via `skills/review-change/` from `review-lens-manifest.json`: correctness always; uncertainty includes; model additions only; load only `loadReferences`. Delegate only when the Delegation Gate is met.
* API contract modelling is a plan-time use of the `skills/review-change/` api-contracts lens.
* A blocking review-lens finding routes scoped rework inline, then the manifest is regenerated before reruns.
