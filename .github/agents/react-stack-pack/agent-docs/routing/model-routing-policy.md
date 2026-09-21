# model-routing-policy.md

## Purpose

This document defines execution-profile routing guidance for the React stack pack. Inherit the
frontend baseline (reasoning-demand tiers, Global Routing Rules, review lens defaults, the
api-contracts lens, and Escalation Criteria) from
`agents-core/agent-docs/routing/model-routing-policy.md`; this file adds only the React-specific
delta below.

Use `delegation: independent` only when an isolated second opinion on a completed diff materially
raises confidence (for example an authorization or shared-state change).

---

## React-specific additions

Global Routing Rules — also use **`elevated`** reasoning demand when:
- component boundaries or hook extraction are debatable

Review lens defaults — also apply:
- **composition lens** — a new shared abstraction is proposed, component/hook boundaries affect
  multiple features, or tree-wide prop/context changes are being considered.
