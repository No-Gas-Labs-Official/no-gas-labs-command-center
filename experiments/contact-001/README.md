# NGL CONTACT — Experiment 001

Status: STEALTH. Capital deployed: $0 additional. Control: mobile-first.

PASS CONDITION: one phone-initiated session must autonomously traverse QUESTION -> DAMIEN_ASSERTION -> STEPWIRE -> EXTERNAL_OBSERVATION -> STATE_CHANGE -> ARTIFACT -> adapted QUESTION, preserve the event stream, drive the cartoon from those same events, remain founder-interruptible, and deploy no additional cash.

The cartoon may exaggerate representation. It may not invent the underlying event.

Invariant: A model's assertion is never sufficient evidence that the state it describes is correct.

## v0

The deterministic fake sensor has been removed. v0 now uses a real, unauthenticated GitHub public API observation as its first world sensor. A founder assertion triggers the stepwire; the stepwire records an ACTION; the adapter attempts to observe public No_Gas_Labs repository metadata; only a successful network response is admitted as EXTERNAL_OBSERVATION.

Network failure is recorded as a blocked RESULT, not converted into evidence.

A founder INTERRUPT stops further autonomous transitions.

## Verification

- `test-contact.cjs` tests the event ordering, blocked-sensor path, $0 capital state, and founder interrupt with a controlled observer.
- `test-live.cjs` exercises the real GitHub sensor.
- `.github/workflows/contact-001.yml` runs both on GitHub infrastructure for this experiment path.

Do not infer that a passing repository CI proves browser/mobile usability. That remains a separate gate.

## AGP world projection experiment

This branch adds a deterministic projection from the CONTACT event stream into an America's Got Problems world state. It does **not** declare CONTACT to be AGP or replace TownSquare/Mythos/Vibe lineage.

The projection is intentionally asymmetric:

- `DAMIEN_ASSERTION` and `MODEL_INFERENCE` may exist in history but cannot directly add world facts.
- `STATE_CHANGE` may add a fact only when its `basis` points backward to an admitted `EXTERNAL_OBSERVATION`.
- blocked `RESULT` and `CONTRADICTION` events survive as world pressure rather than being erased.
- an `ARTIFACT` enters projected world state only when all declared `derived_from` event references already exist.
- every accepted mutation records the exact source event sequence number.

This is a projection, not a second ledger. The event stream remains the source. Narrative/cartoon layers may dramatize projected state, but unsupported narrative cannot mutate it.

The test suite includes explicit laundering attempts: a founder assertion plus model agreement followed by a state-change claim must produce zero admitted facts, and an artifact with a nonexistent derivation must not enter the world.
