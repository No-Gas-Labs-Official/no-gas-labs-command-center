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