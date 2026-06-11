# Graph Report - website  (2026-06-11)

## Corpus Check
- 64 files · ~482,943 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 320 nodes · 435 edges · 32 communities (21 shown, 11 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ac216df0`
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
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]

## God Nodes (most connected - your core abstractions)
1. `getBreadcrumbSchema()` - 23 edges
2. `compilerOptions` - 17 edges
3. `compilerOptions` - 17 edges
4. `compilerOptions` - 16 edges
5. `compilerOptions` - 16 edges
6. `getServiceSchema()` - 15 edges
7. `useSequenceCanvas()` - 13 edges
8. `init()` - 7 edges
9. `scripts` - 6 edges
10. `GlobalImageLoader` - 6 edges

## Surprising Connections (you probably didn't know these)
- `AromaSection()` --calls--> `useSequenceCanvas()`  [EXTRACTED]
  src/sections/AromaSection.tsx → src/hooks/useSequenceCanvas.ts
- `BakingSection()` --calls--> `useSequenceCanvas()`  [EXTRACTED]
  src/sections/BakingSection.tsx → src/hooks/useSequenceCanvas.ts
- `DoughSection()` --calls--> `useSequenceCanvas()`  [EXTRACTED]
  src/sections/DoughSection.tsx → src/hooks/useSequenceCanvas.ts
- `MenuSection()` --calls--> `useSequenceCanvas()`  [EXTRACTED]
  src/sections/MenuSection.tsx → src/hooks/useSequenceCanvas.ts
- `RemovingSection()` --calls--> `useSequenceCanvas()`  [EXTRACTED]
  src/sections/RemovingSection.tsx → src/hooks/useSequenceCanvas.ts

## Import Cycles
- None detected.

## Communities (32 total, 11 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.10
Nodes (12): CellConfig, WORD, ScrollProgressProps, useScrollEngine(), useScrollProgress(), useScrollReveal(), RootLayout(), App() (+4 more)

### Community 1 - "Community 1"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+10 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+9 more)

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (19): dependencies, framer-motion, gsap, lenis, lottie-web, react, react-dom, react-helmet-async (+11 more)

### Community 5 - "Community 5"
Cohesion: 0.21
Nodes (11): SequenceCanvasOptions, useSequenceCanvas(), Home(), AromaSection(), BakingSection(), DoughSection(), MenuSection(), TECH_ICONS (+3 more)

### Community 6 - "Community 6"
Cohesion: 0.13
Nodes (14): 1. Executive Summary, 2. Root Cause Analysis, 3. History of Attempts & Implementation Steps, 4. Final Solution Architecture, 5. Summary of Key Learnings, Attempt 1: In-Flow Navbar with Padding Adjustments (Initial Fixed Spacers), Attempt 2: Switched to Native CSS Sticky Layout (`position: sticky`), Attempt 3: Restored GSAP Pinning + MatchMedia Layout Decoupling (+6 more)

### Community 7 - "Community 7"
Cohesion: 0.22
Nodes (6): keysToBlock, preventDefault(), preventKeyDefault(), SectionIcons, SectionNavProps, SECTIONS

### Community 8 - "Community 8"
Cohesion: 0.32
Nodes (6): MOBILE_LINKS, NAV_LINKS, Navbar(), NavbarProps, useLottie(), UseLottieOptions

### Community 9 - "Community 9"
Cohesion: 0.29
Nodes (6): __dirname, EXTENSIONS, getAllFiles(), main(), ROOT, SCAN_DIRS

### Community 10 - "Community 10"
Cohesion: 0.38
Nodes (5): FieldErrors, FieldValid, FormState, useForm(), OrderSection()

### Community 12 - "Community 12"
Cohesion: 0.14
Nodes (19): SEOProps, About(), CaseStudy(), DATA, StudyData, CASE_STUDIES, PortfolioHub(), SERVICES (+11 more)

### Community 14 - "Community 14"
Cohesion: 0.24
Nodes (5): useHeroCanvas(), TrailParticle, useHeroMouseTrail(), HeroSection(), GlobalImageLoader

### Community 15 - "Community 15"
Cohesion: 0.50
Nodes (3): Shelf, shelves, SkillItem

### Community 16 - "Community 16"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + TypeScript + Vite

### Community 24 - "Community 24"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+10 more)

### Community 25 - "Community 25"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+9 more)

### Community 26 - "Community 26"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + TypeScript + Vite

### Community 30 - "Community 30"
Cohesion: 0.12
Nodes (16): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, sharp, tailwindcss (+8 more)

### Community 31 - "Community 31"
Cohesion: 0.46
Nodes (7): init(), initActiveNavLink(), initCtaHandlers(), initMobileMenu(), initScrollHandler(), injectStyles(), loadLottie()

## Knowledge Gaps
- **157 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+152 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `GlobalImageLoader` connect `Community 14` to `Community 0`, `Community 5`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Community 30` to `Community 4`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _157 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09982174688057041 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._