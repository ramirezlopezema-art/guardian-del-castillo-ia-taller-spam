# Feature: taller-spam (Detective de mensajes)

Objective: new guided workshop (not the dragon) where students train a Naive Bayes spam filter in plain JS. Long (120 min) and short (60 min) versions.

Authorized scope: new folder `taller-spam/` only. No changes to the dragon project. No commit/push unless the user asks.

Route: delegated direct (one writer; 6+ non-trivial files, trigger = Writer). Test-first exception: educational material, verified by running the solution under node against the held-out set.

## Tasks
- [ ] T1 datos.js (train + held-out set), modelo.js starter (4 TODOs), soluciones/ (full + short starter), app.js, index.html, style.css
- [ ] T2 TALLER_LARGO.md (120 min) and TALLER_CORTO.md (60 min), with teacher notes
- [ ] T3 Verify: solution accuracy on held-out set, starters parse, markdown cross-references

## Evidence
T1-T3 done by writer: solution accuracy 0.90 on 20 held-out (vp9 fn1 fp1 vn9), 0 overlap, node --check ok on all .js, DOM ids cross-checked with a simulated DOM. Not tested in a real browser. Parent spot check: node --check re-run. No commit made.

Engram mirror: pending (not written).
