# Graph Report - pizzzascript - dark theme  (2026-06-01)

## Corpus Check
- 41 files · ~1,843,225 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 187 nodes · 202 edges · 23 communities (14 shown, 9 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `94f27f71`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 23|Community 23]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `compilerOptions` - 16 edges
3. `useSequenceCanvas()` - 11 edges
4. `Scroll Animation & Sequential Layout Issues Analysis Report` - 6 edges
5. `scripts` - 5 edges
6. `App()` - 4 edges
7. `3. History of Attempts & Implementation Steps` - 4 edges
8. `useForm()` - 3 edges
9. `useHeroCanvas()` - 3 edges
10. `useScrollEngine()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `AromaSection()` --calls--> `useSequenceCanvas()`  [EXTRACTED]
  src/sections/AromaSection.tsx → src/hooks/useSequenceCanvas.ts
- `BakingSection()` --calls--> `useSequenceCanvas()`  [EXTRACTED]
  src/sections/BakingSection.tsx → src/hooks/useSequenceCanvas.ts
- `DoughSection()` --calls--> `useSequenceCanvas()`  [EXTRACTED]
  src/sections/DoughSection.tsx → src/hooks/useSequenceCanvas.ts
- `RemovingSection()` --calls--> `useSequenceCanvas()`  [EXTRACTED]
  src/sections/RemovingSection.tsx → src/hooks/useSequenceCanvas.ts
- `ToppingsSection()` --calls--> `useSequenceCanvas()`  [EXTRACTED]
  src/sections/ToppingsSection.tsx → src/hooks/useSequenceCanvas.ts

## Import Cycles
- None detected.

## Communities (23 total, 9 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.10
Nodes (9): BackToTopProps, ScrollProgressProps, useScrollEngine(), useScrollProgress(), useScrollReveal(), App(), getScrollPercent(), isReducedMotion() (+1 more)

### Community 1 - "Community 1"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+10 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+9 more)

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (16): dependencies, framer-motion, gsap, lenis, lottie-web, react, react-dom, name (+8 more)

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (16): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, sharp, tailwindcss (+8 more)

### Community 5 - "Community 5"
Cohesion: 0.28
Nodes (7): SequenceCanvasOptions, useSequenceCanvas(), AromaSection(), BakingSection(), DoughSection(), RemovingSection(), ToppingsSection()

### Community 6 - "Community 6"
Cohesion: 0.38
Nodes (5): FieldErrors, FieldValid, FormState, useForm(), OrderSection()

### Community 7 - "Community 7"
Cohesion: 0.40
Nodes (3): MOBILE_LINKS, NAV_LINKS, NavbarProps

### Community 8 - "Community 8"
Cohesion: 0.13
Nodes (14): 1. Executive Summary, 2. Root Cause Analysis, 3. History of Attempts & Implementation Steps, 4. Final Solution Architecture, 5. Summary of Key Learnings, Attempt 1: In-Flow Navbar with Padding Adjustments (Initial Fixed Spacers), Attempt 2: Switched to Native CSS Sticky Layout (`position: sticky`), Attempt 3: Restored GSAP Pinning + MatchMedia Layout Decoupling (+6 more)

### Community 10 - "Community 10"
Cohesion: 0.29
Nodes (6): __dirname, EXTENSIONS, getAllFiles(), main(), ROOT, SCAN_DIRS

### Community 11 - "Community 11"
Cohesion: 0.50
Nodes (3): Shelf, shelves, SkillItem

### Community 14 - "Community 14"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + TypeScript + Vite

## Knowledge Gaps
- **100 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+95 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 4` to `Community 3`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _100 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09788359788359788 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._