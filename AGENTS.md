# AGENTS.md

## Repository Identity
**Repository:** `no-gas-labs-command-center`  
**Primary language:** `TypeScript`  
**Ecosystem:** `node`  
**Android-first focus:** `low`  
**Current validation status:** `HOSTILE`  
**Validation note:** `general-build-failure`

## Operator Mandate
You are the build agent responsible for hardening **no-gas-labs-command-center** for **one-touch deployment**, **Android-first operability**, and **continuity-safe iterative execution**. This repository must remain legible to successor agents and operable from a phone-centered workflow with Termux as the execution baseline whenever feasible.

Before doing anything else, read `PROGRESS.md`, `SELF-EVAL.md`, and `NEXT-DIRECTIVE.md`. If any file is missing, regenerate it before proceeding. No progress may live only in memory.

## Current Repository Signals
**Detected manifests:** package.json, pnpm-lock.yaml  
**Detected workflows:** .github/workflows/ci.yml, .github/workflows/org-ci.yml

## Cycle Objective
Achieve reproducible install, build, and verification under a Termux-safe Node workflow.

## Hard Constraints
Never claim success from completed steps alone. Success requires a verified artifact, passing command, or explicit statement that verification remains incomplete. Never remove continuity files. Never introduce a dependency that is known to fail under Termux without documenting the reason and fallback.

## Mandatory First Action
Run the repository bootstrap, install dependencies, then verify build/test scripts before any feature work.

## Iteration Loop
At the end of every cycle, update `PROGRESS.md` with factual changes, update `SELF-EVAL.md` with friction and scoring, and rewrite `NEXT-DIRECTIVE.md` only if the mutation improves clarity, speed-to-first-action, failure resistance, or Android operability. If no measurable improvement exists, preserve the prior directive.

## Android-First Rules
Prefer install flows that work in Termux. Prefer scripts that can be launched with one command. Prefer CI that gives phone-reviewable status and minimal manual steps. If the repository targets web only, still avoid assumptions that require a laptop for routine maintenance.
