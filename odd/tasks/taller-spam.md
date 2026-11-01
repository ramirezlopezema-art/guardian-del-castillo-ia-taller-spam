# Feature: taller-spam (Detective de mensajes)

Objective: new guided workshop (not the dragon) where students train a Naive Bayes spam filter in plain JS. Long (120 min) and short (60 min) versions.

Authorized scope: new folder `taller-spam/` only. No changes to the dragon project. No commit/push unless the user asks.

Route: delegated direct (one writer; 6+ non-trivial files, trigger = Writer). Test-first exception: educational material, verified by running the solution under node against the held-out set.

## Tasks
- [ ] T1 datos.js (train + held-out set), modelo.js starter (4 TODOs), soluciones/ (full + short starter), app.js, index.html, style.css
- [ ] T2 TALLER_LARGO.md (120 min) and TALLER_CORTO.md (60 min), with teacher notes
- [ ] T3 Verify: solution accuracy on held-out set, starters parse, markdown cross-references

## Scope change (accepted by user)
Short version now 2 h, long version 8 h, both self-contained for students who missed the dragon project (include AI/ML/neural nets/NLP/chatbots/LLM/ethics foundations). T1-T3 reopened as T4-T6 below.
- [ ] T4 reglas.js (lexicon baseline from part 1) + UI comparison rules vs learned
- [ ] T5 Rewrite TALLER_CORTO.md (120 min) and TALLER_LARGO.md as index + largo/ modules (480 min), richer explanations
- [ ] T6 Verify code, recompute quoted numbers, cross-references

## Evidence
T4-T6 done by writer (uncommitted): rules filter 0.80 vs learned 0.90 on PRUEBA, 8 modules sum 480 min, short sums 120, 0 broken links, snippets run under node, not tested in a real browser. Parent spot check: node --check on all .js.
Earlier T1-T3 done by writer: solution accuracy 0.90 on 20 held-out (vp9 fn1 fp1 vn9), 0 overlap, node --check ok on all .js, DOM ids cross-checked with a simulated DOM. Not tested in a real browser. Parent spot check: node --check re-run. No commit made.

Engram mirror: pending (not written).
