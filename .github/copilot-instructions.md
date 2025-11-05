## Quick context for AI coding agents

This is a single-page React app built with Vite, TypeScript and Tailwind, scaffolded around GitHub's Spark UI kit. Keep edits focused, small, and consistent with the existing component patterns.

Key facts:
- App entry: `src/main.tsx` (imports `@github/spark/spark` globally).
- Main composition: `src/App.tsx` — top-level sections live in `src/components/*`.
- UI primitives: `src/components/ui/*` use class-variance-authority (`cva`) + a `cn` helper in `src/lib/utils.ts` to compose Tailwind classes.
- GitHub Spark + icon proxy: `vite.config.ts` installs `sparkPlugin()` and `createIconImportProxy()` — do NOT remove these lines (see inline comment).
- Types: project types are in `src/types` and used across `src/lib` and components.

Dev / build commands (from `package.json`):
- Start dev server: `npm run dev` (runs `vite`).
- Build: `npm run build` (runs `tsc -b --noCheck && vite build`). Note: build runs TypeScript project build before bundling.
- Preview production build: `npm run preview`.
- Lint: `npm run lint` (runs eslint).
- Notes: `npm run kill` uses `fuser` (Linux); Windows contributors should close processes via Task Manager or `npx kill-port <port>`.
- **Deployment**: GitHub Actions workflow (`.github/workflows/deploy.yml`) auto-deploys to GitHub Pages on push to `main`. Custom domain (`altostratus.com.br`) configured via `public/CNAME` (copied to `dist/` during build).

Project-specific conventions to follow when editing code:
- Styling: use Tailwind class strings composed with `cva` in `src/components/ui/*` and pass resulting className through `cn(...)` (see `Button` in `src/components/ui/button.tsx`).
- Slots / asChild pattern: many UI primitives accept `asChild` and use Radix `Slot` to render custom wrappers — preserve `data-slot` attributes for clarity and testing.
- Imports: use alias `@/` to import from `src` (configured in `tsconfig.json` and `vite.config.ts`). Prefer `@/components/...`.
- Error handling: the app uses `react-error-boundary` — top-level `ErrorBoundary` with `ErrorFallback` is in `src/main.tsx`/`ErrorFallback.tsx`. Keep boundary-friendly error messages and avoid throwing non-Error types.
- Async AI calls: code in `src/lib/github.ts` calls `window.spark.llm(...)` (Spark runtime). When changing LLM usage, keep prompts in code or in `src/lib` and ensure JSON parsing is guarded (see existing try/catch fallback).

Integration & external dependencies:
- GitHub Spark: global runtime is imported in `src/main.tsx` via `@github/spark/spark`. Use `window.spark` in browser code only.
- GitHub REST: `src/lib/github.ts` uses `fetch` to call `https://api.github.com` for public user/repos endpoints; rate limits apply.
- Icons: Phosphor icon proxy is wired in Vite — components may import icons indirectly via the proxy; do not remove the proxy plugin.

Small examples from the codebase:
- Button pattern: `src/components/ui/button.tsx` uses `cva(...)` to declare `buttonVariants` and exports `Button` that accepts `variant`, `size`, `asChild`.
- Utils: `src/lib/utils.ts` exports `cn(...inputs)` which is `clsx` + `twMerge` and is the canonical way to merge Tailwind classes.
- AI analyze flow: `src/lib/github.ts` -> `analyzeProjectWithAI` builds a prompt and calls `window.spark.llm(...,'gpt-4o-mini', true)`, then JSON.parse on result; keep the exact result shape or update callers.

When making changes:
- Keep PRs small and component-scoped (one UI primitive or one feature). Update types in `src/types` when adding public shapes.
- Run `npm run lint` locally and ensure TypeScript build (`tsc -b`) succeeds before opening a PR.
- If you modify Vite plugins or aliases, update `vite.config.ts` and `tsconfig.json` together.

If something is missing or unclear, open a minimal PR or issue and reference these files: `src/components/*`, `src/components/ui/*`, `src/lib/*`, `vite.config.ts`, `package.json`.

Questions for the repo owner:
- Should the `kill` script be adapted for Windows contributors (e.g., use `kill-port`)?
- Are there any intended workspace packages under `packages/*` (package.json defines workspaces)?

If you want, I can iterate this file to include additional examples (component lifecycle, testing patterns) — tell me which area to expand.
