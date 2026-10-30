# Design decisions

## 2026-10-30 — Preserve the signature public frontend

Status: accepted by the founder. Applies to future homepage, onboarding and public-entry changes.

### Source of truth

The approved public frontend is **KarzalayHQ/karzalay**, `apps/frontend`, from the merged frontend baseline `8aab461` (PR7), with staging integration on `codex/public-platform-staging` (baseline `a2bbf5c`). Its live reference is **https://staging.karzalay.online**. The separate `mriganshu16/dashboard` homepage at karzalay.org is NOT the approved design source.

Authoritative files:
- `apps/frontend/app/page.tsx`: “Sprint faster. Build together.” homepage and section composition.
- `apps/frontend/app/globals.css` and `apps/frontend/styles/tokens.css`: public design tokens.
- `apps/frontend/app/layout.tsx`: fonts and root composition.
- `apps/frontend/components/ui/Navbar.tsx`: signature navigation.

Preserve the white/light background, violet gradients (#6C3CE0, #7C4DFF), pale lavender surfaces, dark plum text, rounded cards, original typography, spacing, hero visual and brand treatment. Existing app styles may evolve in their own context; workspace dark mode is not the public-homepage reference.

### Architecture and entry paths

Keep the public platform and workspace repositories separate. Add public paths in the actual public homepage, not a reconstructed copy in the workspace repo. `staging.karzalay.org/` opens the canonical public homepage on `staging.karzalay.online`; `/personal`, `/workspace`, `/login` and `/enroll` remain workspace routes. Team access is invitation-based. Public `/dashboard` goes to workspace `/workspace`, never the root, to avoid a redirect loop.

### Prevention rules

1. Read this decision and inspect the named source files before public UI work.
2. Compare against the canonical live frontend and its Git baseline. Never infer the design source from a similarly named repository or apex domain.
3. Reuse existing components, tokens and page composition. Add requested behavior without replacing branding, palette, typography or layout unless explicitly requested.
4. If the reference cannot be identified or conflicts with the user's description, resolve that ambiguity before deploying another design.
5. Verify desktop and mobile screenshots and both entry paths. Retain clearly marked staging/demo states; visual preservation does not turn sample metrics or credentials into verified claims.
6. A deployment being live is not evidence that its design was approved. Supersede wrong decisions explicitly.

### Superseded work

Workspace PR47's invented homepage and PR48's reuse of mriganshu16/dashboard were mistaken references. They are replaced with the canonical public frontend. Do not restore either as a design baseline.
