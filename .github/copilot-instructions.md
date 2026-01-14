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

## Design System: Cozy Coffee Shop

### Color Palette
All colors defined as CSS custom properties in `@theme` block of [src/index.css](src/index.css):

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-coffee-dark` | #6b4423 | Headings, primary text, header backgrounds |
| `--color-coffee-medium` | #8b5e35 | Secondary text, hover states |
| `--color-coffee-light` | #d4a574 | Accent highlights, gradients |
| `--color-cream` | #faf5f0 | Primary backgrounds, cards, buttons (text) |
| `--color-cream-secondary` | #f5ede5 | Secondary backgrounds, gradients |
| `--color-sage` | #9ca89d | Disabled/muted states |
| `--color-sage-light` | #c5cdc8 | Borders, light accents |
| `--color-burnt-orange` | #c85a28 | Victory states, CTAs, alerts |
| `--color-marked` | #e8d5c4 | Marked square backgrounds |
| `--color-marked-border` | #c85a28 | Marked square borders (burnt orange) |
| `--color-bingo` | #d4a574 | Bingo/winning highlights (coffee light) |

### Typography
Fonts loaded via Google Fonts in [src/index.css](src/index.css):
- **Merriweather** (serif, 400/700/900) — All headings (h1–h6), titles, emphasis
- **Lora** (serif, 400/600/700) — Body text, labels, instructions
- System fallback: `serif` for graceful degradation

### Component Styling Conventions
1. **Backgrounds**: Use gradient variants for depth (`bg-gradient-to-br`, `bg-gradient-to-r`)
2. **Rounded corners**: `rounded-xl` for squares/boards, `rounded-2xl` for cards/modals, `rounded-full` for buttons
3. **Shadows**: `shadow-sm` for subtle, `shadow-lg` for cards, `shadow-2xl` for modals
4. **Transitions**: `transition-all duration-200` for interactive elements, `duration-600` for animations
5. **Hover states**: Scale transforms (`hover:scale-105`), shadow increases, color shifts (avoid opacity changes)
6. **Marked squares**: Burnt orange border + warm tan background, cream checkmark (✓)
7. **Victory state**: Gradient from burnt orange → coffee light, cream text, coffee cup emoji (☕)

### Custom Animations
- **fadeInScale** (600ms, cubic-bezier): Victory modal entrance (fade + scale-up)
- **bounce** (default Tailwind): Coffee cup emoji on victory modal

### Mobile & Responsive
- Full viewport height (`min-h-full`) on all screens
- Padding scales: `p-4` for headers/sections, `p-6` for cards
- Max-width: `max-w-sm` for centered content containers
- Board centers flexbox: `flex items-center justify-center`
- Gaps: `gap-1` on board grid for tight bingo layout

### Accessibility
- All buttons have `aria-label` or descriptive text
- Color contrast ratios meet WCAG AA (verified on coffee-dark text, cream backgrounds)
- No color-only affordances (marked squares have borders + checkmarks)
- Tap targets ≥48px min-height for mobile
- Disabled states on free space buttons
