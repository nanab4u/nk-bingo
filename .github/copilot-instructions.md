# Soc Ops - AI Coding Agent Instructions

## Pre-Commit Checklist
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] `npm run test` passes

## Project Overview
Social bingo game for mixers (5×5 board, find people matching prompts, get 5-in-a-row). **Vite + React 19 + TS + Tailwind v4 + localStorage**.

## Architecture

| Layer | Files | Purpose |
|-------|-------|---------|
| **Components** | `App.tsx`, `GameScreen.tsx`, `StartScreen.tsx`, `BingoBoard.tsx` | UI hierarchy, state → [useBingoGame.ts](src/hooks/useBingoGame.ts) only |
| **State** | `useBingoGame.ts` | Single hook: gameState, board, winning line, localStorage persistence |
| **Logic** | `bingoLogic.ts` (220+ tests) | Pure functions: generateBoard, toggleSquare, checkBingo, getWinningSquareIds |
| **Data** | `types/index.ts`, `questions.ts` | Domain types, 24 prompts + FREE_SPACE |

## Critical Patterns

1. **Immutable updates**: Always `.map()` the board, never mutate directly
2. **Centralized state**: All logic flows through `useBingoGame()` → components only call returned actions
3. **localStorage versioning**: `STORAGE_VERSION = 1`. Increment + migrate `validateStoredData()` on schema changes
4. **Board indexing**: 0–24 flat array, center (free space) = index 12

## Commands

```bash
npm run dev       # Vite dev server (HMR enabled)
npm run build     # TS check + bundle → dist/ (auto-deploys to GitHub Pages)
npm run test      # Vitest, jsdom, React Testing Library
npm run lint      # ESLint flat config
```

## Adding Features

| Feature | Steps |
|---------|-------|
| **New questions** | Edit [src/data/questions.ts](src/data/questions.ts) |
| **Game rules** | Extend [bingoLogic.ts](src/utils/bingoLogic.ts) + add tests |
| **UI screens** | Create component in `src/components/`, integrate into [App.tsx](src/App.tsx) |
| **State changes** | Modify [useBingoGame.ts](src/hooks/useBingoGame.ts), bump STORAGE_VERSION |

## Anti-Patterns
- ❌ Logic in components (use `bingoLogic.ts`)
- ❌ Mutating board directly (immutable only)
- ❌ Component state duplication (single hook)
- ❌ Hardcoded indices (use `BOARD_SIZE`, `CENTER_INDEX` constants)
