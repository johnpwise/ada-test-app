Workflow: change-home-view-subtitle-text
Source of truth: .agent-workflows/change-home-view-subtitle-text/slice-spec.json (revision 2)
Step: intake and planning complete → next: owner approves plan, then RED/GREEN
Status: awaiting-approval

Preflight (unattended, executor-owned branch):
  git status --short → clean
  base branch: develop
  base SHA: 86671b28709c36bf7356ccdd047e9cbdfe7dff73
  work branch: executor-owned (the executor creates it)

TDD state: n/a (plan-approval run; no test or production file written)
  last command: node plugins/ada-core/scripts/slice-spec.mjs merge --stage planned
  result: pass (revision 2 validated at planned stage)

Changed: .agent-workflows/change-home-view-subtitle-text/ only
Decisions:
- Classified trivial; fast path skips planning ceremony only, not the failing test or review lenses.
- Plan: add a component test in HomeView.component.test.tsx expecting "Sandbox application to showcase ADA" and no old text (RED), then change line 16 of HomeView.tsx (GREEN), then npm test and lint.
- Text used verbatim, with no trailing period, as written on the card.
- Unit, integration and e2e layers are N/A with rationale in the spec.
Blockers: none
Next action: on approval, record the approval, pass implementation-ready, continue test-first (workflow_status in-progress)
