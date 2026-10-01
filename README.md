# README.md

This is a test note -- safe to delete

This project includes installed agent packs:

- `agents-core`: `.github/agents/agents-core`
- `react-stack-pack`: `.github/agents/react-stack-pack`

## Prompt paths

- Core prompts: `.github/agents/agents-core/agent-docs`
- React prompts: `.github/agents/react-stack-pack/agent-docs`
- Platform execution-profile mappings: `.github/agents/platforms/claude-code/execution-profile-mapping.md`, `.github/agents/platforms/codex/execution-profile-mapping.md`

## Trigger examples

Use agent spec: Delivery-Engineer
New Feature

Use agent spec: Delivery-Engineer
Bug Fix

IDE/copilot preamble text may appear before the trigger block; the first valid trigger block is authoritative.

## Working With Agents

This repo uses layered workflow guidance from `agents-core` and `react-stack-pack`, with repo-specific rules in root `AGENTS.md`.

Start here:

- [Delivery Engineer](./.github/agents/agents-core/agents/delivery-engineer.agent.md)
- [Agent Handoff Workflow](./.github/agents/agents-core/agent-docs/workflows/handoff-workflow.md)
- [Handoff Template](./.github/agents/agents-core/agent-docs/templates/handoff-template.md)
- [Workflow Orchestrator Checkpoint Template](./.github/agents/agents-core/agent-docs/templates/checkpoint-template.md)
- [React Feature Workflow Routing](./.github/agents/react-stack-pack/agent-docs/workflows/feature-workflow-routing.md)
- [React Bug Workflow Routing](./.github/agents/react-stack-pack/agent-docs/workflows/bug-workflow-routing.md)
- [Model Routing Policy](./.github/agents/react-stack-pack/agent-docs/routing/model-routing-policy.md)
- [Repo-Level AGENTS](./AGENTS.md)

Workflow defaults:

- `delivery-engineer` is the workflow owner.
- Feature workflow intake requires a leading `New Feature` trigger.
- Bug workflow intake requires a leading `Bug Fix` trigger.
- Mandatory work-branch preflight: before workflow artifacts or code/test edits, cleanly synchronize `develop` with `origin/develop` using `git pull --ff-only origin develop`, derive a kebab-case slug, reject collisions, and create `feature/<slug>` or `bugfix/<slug>` without pushing an empty branch.
- Triggered feature/bug workflow requests run in fail-closed mode until `.agent-workflows/<workflow_id>/index.md` and the first workflow artifact is persisted.
- In fail-closed mode, the first response reports workflow ownership/routing state rather than direct implementation edits.
- Workflow steps are recorded per the core `handoff-template.md` (Step Record by default).
- Default `Return To Agent` is `delivery-engineer.agent.md` unless explicitly overridden by an incoming handoff.
- One primary context owns the slice; control returns to the workflow-owner role only for `blocked`, `awaiting-approval`, or `ready-for-closeout`.
- Complexity is classified `trivial` vs `non-trivial` and the delivery is sequenced into TDD increments — inline, not a separate agent.
- A valid `review-lens-manifest.json` is required before closeout; correctness is always included, uncertainty includes, and model judgment may add but never remove.
- API contract modelling is a plan-time use of the `skills/review-change/` api-contracts lens.
- A blocking review-lens finding routes scoped rework inline, then the manifest is regenerated before reruns.
- Persist workflow artifacts in `.agent-workflows/<workflow_id>/` and delete that folder after workflow status is `closed`.

## Workflow Prompts

You can initiate the Workflow Orchestrator by starting your prompt with:

- Use agent spec: Delivery-Engineer
- .github/agents/agents-core/agent-docs/prompts/delivery-engineer-auto-loop.prompt.md
