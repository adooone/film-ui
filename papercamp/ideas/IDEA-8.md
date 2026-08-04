---
id: IDEA-8
title: Adopt branch-per-idea working flow
type: chore
status: idea
created: 2026-08-04
tags:
  - workflow
---

Tier 1 ([[IDEA-1]]) was built directly on main — fine for the rapid early phase, but it bypasses the status model this corpus assumes (in-progress ⇢ branch, review ⇢ PR, done ⇢ merge) and leaves no review gate.

Proposal, starting with Tier 2 ([[IDEA-2]]): one branch per idea (`feat/idea-N-short-name`), PR into main when all phases are checked, merge after the owner's showcase walkthrough. One branch per *idea*, not per phase — phases are commits. Direct-to-main stays acceptable for trivial chores (typo, config nudge).

Also adopted with this idea: workflow friction gets captured as corpus ideas instead of living in chat — same way paper-camp dogfoods its own process.
