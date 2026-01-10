# Repository Guidelines

## Project Structure & Module Organization
Panels live under `src/app/panels/<Feature>/<Feature001>.tsx`, each owning its route logic, hooks, and fixtures; `src/app/panels/panels.ts` aggregates routes and `src/app/page.tsx` mounts the shell. Shared shells, navigation pieces, and reusable UI stay in `src/components/`, while cross-panel libs and server helpers sit in `src/libs/`. Global gradients, resets, and utility classes belong in `src/app/globals.css`. Keep static assets and mock payloads in `public/`, and mirror every panel with localized tests in `src/app/panels/<Feature>/__tests__/`.

## Build, Test, and Development Commands
- `npm run dev`: Start the Turbopack dev server with hot reload for the active panel.
- `npm run build`: Produce the optimized production bundle; run before tagging or merging release branches.
- `npm run start`: Smoke-test the built bundle in Node.
- `npm run lint`: Enforce ESLint + Prettier; treat warnings as blockers.
Testing is expected to use Jest + Testing Library; wire up `npm run test` once the suite is added and note any manual checks in PRs.

## Coding Style & Naming Conventions
Author panels as functional React components in TypeScript with two-space indentation and Bootstrap 5 utility classes. Prefer shared helpers (`.panel-*`, `.nav-shell*`, `@/components/*`) over inline styles. Components use PascalCase, hooks/utilities use camelCase, panels use numbered suffixes (`Orders001`, `Dispatch002`), and tests follow `<Component>.test.tsx`. Rely on the repo ESLint/Prettier setup; avoid ad-hoc formatting.

## Testing Guidelines
Use Jest with Testing Library for allocation journeys, navigation states, and date/filter logic. Keep fixtures local to the feature and sanitize sensitive data. Add specs under the matching panel’s `__tests__` directory, mirroring component names. Run `npm run test` before pushing once the suite exists; until then run `npm run lint` and manually exercise critical flows.

## Commit & Pull Request Guidelines
Follow Conventional Commits (`feat: align dispatch search layout`, `fix: harden order status filter`). PRs should state the problem, describe UI/API changes, reference issues, and attach screenshots or command output for visible updates. Call out gaps or follow-up work so reviewers understand remaining scope and risks.

## Security & Configuration Tips
Store environment secrets in `.env.local`, never commit credentials, and sanitize logs or mock assets. When bumping Next.js, Bootstrap, or tooling, update dependent configs (`next.config.ts`, `tsconfig.json`, lint settings`) and document migration steps. Keep Prisma connection strings in env vars and avoid embedding database details in code.
