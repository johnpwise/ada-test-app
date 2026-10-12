# README.md

This is a test note -- safe to delete

## ADA workflow

This project uses the ADA delivery workflow from the `ada-core` and `ada-react` Claude Code
plugins in the private [`johnpwise/agents`](https://github.com/johnpwise/agents) marketplace.
`.claude/settings.json` enables the plugins and `.claude/ada.json` switches the workflow on.
Project facts and safety rules are in [`AGENTS.md`](AGENTS.md).

The first time you open the project in Claude Code (CLI or VS Code), trust the `ada` marketplace
and install its plugins when asked. You need read access to `johnpwise/agents`.

Start a slice with a leading trigger:

```text
New Feature <what to build>
Bug Fix <what is wrong>
```

or run `/ada-core:deliver New Feature …` or `/ada-core:deliver Bug Fix …`. Git and Gitflow steps run
only when you ask for them by name, for example "commit and push", "create develop PR" or
"Start release 1.4.0". The full list of skills is in the `johnpwise/agents` README.
