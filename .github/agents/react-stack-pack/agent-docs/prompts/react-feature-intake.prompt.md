# react-feature-intake.prompt.md

Use this when the core prompt/orchestration agent needs a React-aware intake pass before dispatching work.

First, read and follow `agents-core/agent-docs/prompts/feature-intake-baseline.prompt.md` in this
repository (shared intake policy, trigger template, Early routing hints framing, and the
"Frontend stacks" Capture / Early routing hints / Intake output shape sections). The React stack
pack adds no further items today; also capture and return, per the baseline's frontend section:

- `capability_owners.server_state_owner` candidate (Capture)
- `capability_owners.server_state_owner` (Intake output shape)
