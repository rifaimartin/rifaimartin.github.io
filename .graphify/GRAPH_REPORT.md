# Graph Report - .  (2026-09-12)

## Corpus Check
- Corpus is ~23,191 words - fits in a single context window. You may not need a graph.

## Summary
- 182 nodes · 483 edges · 14 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: ON_BRANCH: 150 · PARENT_OF: 98 · MODIFIES: 97 · contains: 47 · imports_from: 46 · imports: 31 · method: 8 · calls: 6


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 26 · Candidates: 225
- Excluded: 58 untracked · 13399 ignored · 0 sensitive · 2 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `8e0c095`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `soundFx` - 16 edges
2. `profileData` - 9 edges
3. `SoundEffects` - 9 edges
4. `useVisitorCount()` - 4 edges
5. `ArticleCharacter()` - 3 edges
6. `PSIKOTEST_CATEGORIES` - 2 edges
7. `PSIKOTEST_QUESTIONS` - 2 edges
8. `generatePsychotestFeedback()` - 2 edges
9. `at` - 1 edges
10. `zm` - 1 edges

## Surprising Connections (you probably didn't know these)
- `00c1ead rebuilding site Sun 26 Apr 2020 10:43:32 AM WIB` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 2 → community 1_
- `0a01766 feat: highlight national transfers (BI-FAST/RTGS/SKN) and K8s microservices architecture` --ON_BRANCH--> `gh-pages`  [EXTRACTED]
  git → git  _Bridges community 0 → community 2_
- `0a01766 feat: highlight national transfers (BI-FAST/RTGS/SKN) and K8s microservices architecture` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 0 → community 1_
- `0a32ba1 rebuilding site Sun 26 Apr 2020 06:03:11 PM WIB` --ON_BRANCH--> `gh-pages`  [EXTRACTED]
  git → git  _Bridges community 8 → community 2_
- `0a32ba1 rebuilding site Sun 26 Apr 2020 06:03:11 PM WIB` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 8 → community 1_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.13
Nodes (20): 0a01766 feat: highlight national transfers (BI-FAST/RTGS/SKN) and K8s microservices architecture, 1043cf8 feat: add In-Flight Magazine & technical essays section with dock shortcut, 17614c6 feat: highlight Golden Generation and Top Graduate honors for SMKN 1 Ciomas in English education section, 2d91bfa chore: update contact email to rifaimartinjham@gmail.com, 319c721 fix: precisely connect lit flight path line with Flight Plan header and airplane logo, 6582fe3 build: clean build and deploy pipeline for GitHub Pages, 6d09679 docs: translate experience and project details to English, 774fc4e fix: make article modal header fully responsive on mobile screens (+12 more)

### Community 1 - "Community 1"
Cohesion: 0.17
Nodes (22): master, 18e1143 feat(tpd): separate exam mode and review mode, reveal feedback only upon submit, 1f6e491 rebuilding site Sat 17 Jul 2021 07:47:04 PM WIB, 3bc6cb9 feat(tpd): add Mode Tebak Jenis Soal (pattern recognition & strategy identifier drill), 49f53a4 fix: sync production build bundle into root index.html for GitHub Pages rendering, 5a9aeb7 feat(tpd): implement dual mode (instant drill with live feedback vs real CAT exam), 5c33d42 feat: add TPD Bank Indonesia interactive in-app simulator and launcher, 5eedc7e update cv (+14 more)

### Community 2 - "Community 2"
Cohesion: 0.17
Nodes (22): gh-pages, 00c1ead rebuilding site Sun 26 Apr 2020 10:43:32 AM WIB, 0da4999 deploy: sync visitor counter on gh-pages, 15881ed deploy: update dist bundle on gh-pages, 17fd230 deploy: update with authentic historical blog reader on gh-pages, 1a2fd46 change config title, 1e589bf update, 2bfd8f2 change config title (+14 more)

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (8): at, clipButton, clipGlass, clipShutterTrack, handleBoxStyle, zm, 7b21fa9 feat: progressive ambient dimming during shade drag and authentic curved flight path starting under airplane tail, a51c4f6 feat: upgrade to photorealistic triple-layer aircraft window, spring drag physics, ocean glint shader and 3D volumetric clouds matching mikes.cv

### Community 4 - "Community 4"
Cohesion: 0.25
Nodes (5): 5a4b2ab feat: embed interactive in-app OpenGym simulator modal with live demo runner, a237278 fix: optimize mobile dock layout with responsive labels and deduplicate visitor counter, c3eb17c feat: integrate openGym sub-page, featured card showcase and quick launcher dock, cbbce94 feat: add global real-time persistent profile view counter across all devices, useVisitorCount()

### Community 5 - "Community 5"
Cohesion: 0.22
Nodes (3): 9c6966a deploy: update GitHub Pages build, ab28525 feat: migrate to interactive 3D portfolio with mikes.cv aviation theme and updated BCA Digital Squad Lead CV, iconMap

### Community 6 - "Community 6"
Cohesion: 0.27
Nodes (1): soundFx

### Community 7 - "Community 7"
Cohesion: 0.31
Nodes (2): 290fe92 feat: add Public Ventures section for Potretin and AlamNatura, remove openGym source code button, and keep pure white logo background in dark mode, profileData

### Community 8 - "Community 8"
Cohesion: 0.22
Nodes (9): 0a32ba1 rebuilding site Sun 26 Apr 2020 06:03:11 PM WIB, 39fc88a rebuilding site Sun 10 May 2020 08:12:40 AM WIB, 41984fa rebuilding site Tue 05 May 2020 10:54:26 AM WIB, 58d0822 rebuilding site Sun 10 May 2020 08:12:08 AM WIB, 7e5aae2 rebuilding site Sun 10 May 2020 08:07:59 AM WIB, a8763b0 rebuilding site Sun 10 May 2020 08:08:43 AM WIB, cc075b3 rebuilding site Tue 05 May 2020 10:55:56 AM WIB, d0c8c74 rebuilding site Tue 05 May 2020 10:37:14 AM WIB (+1 more)

### Community 9 - "Community 9"
Cohesion: 0.39
Nodes (1): SoundEffects

### Community 10 - "Community 10"
Cohesion: 0.25
Nodes (8): 0f22025 rebuilding site Sat 28 Nov 2020 11:21:49 PM WIB, 445f5b1 rebuilding site Sun 06 Dec 2020 09:34:07 AM WIB, 631b55d rebuilding site Wed 25 Nov 2020 08:49:39 PM WIB, 6c1564f rebuilding site Fri 18 Dec 2020 05:38:12 AM WIB, 736098f rebuilding site Fri 18 Dec 2020 05:45:31 AM WIB, 8d2d370 rebuilding site Wed 25 Nov 2020 08:50:25 PM WIB, d7c0c0c rebuilding site Thu 26 Nov 2020 04:35:27 AM WIB, f155f2e rebuilding site Fri 18 Dec 2020 05:42:20 AM WIB

### Community 11 - "Community 11"
Cohesion: 0.48
Nodes (4): 35f57e6 feat: implement full interactive Banking Psychotest in-app arena with question bank, timer, radar score analytics, and AI coaching feedback, generatePsychotestFeedback(), PSIKOTEST_CATEGORIES, PSIKOTEST_QUESTIONS

### Community 12 - "Community 12"
Cohesion: 0.33
Nodes (6): 2013c35 rebuilding site Thu 30 Jul 2020 10:20:33 AM WIB, 641bc1f rebuilding site Wed 25 Nov 2020 08:47:56 PM WIB, 842238f rebuilding site Wed 25 Nov 2020 08:45:40 PM WIB, 873b9de rebuilding site Wed 25 Nov 2020 08:37:34 PM WIB, a1c32c9 feat(perkara-hutang): terinspirasi dari kisah nyata, fcbaedc rebuilding site Sun 10 May 2020 11:53:46 PM WIB

### Community 13 - "Community 13"
Cohesion: 0.40
Nodes (5): 234839a rebuilding site Sun 26 Apr 2020 05:47:29 PM WIB, 284c797 rebuilding site Sun 26 Apr 2020 05:50:19 PM WIB, dbd92a3 rebuilding site Sun 26 Apr 2020 05:49:04 PM WIB, e1f85b6 rebuilding site Sun 26 Apr 2020 05:48:41 PM WIB, ec30909 rebuilding site Sun 26 Apr 2020 05:46:17 PM WIB

## Knowledge Gaps
- **7 isolated node(s):** `at`, `zm`, `clipGlass`, `clipShutterTrack`, `clipButton` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 6`** (1 nodes): `soundFx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 7`** (2 nodes): `290fe92 feat: add Public Ventures section for Potretin and AlamNatura, remove openGym source code button, and keep pure white logo background in dark mode`, `profileData`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (1 nodes): `SoundEffects`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SoundEffects` connect `Community 9` to `Community 6`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Why does `soundFx` connect `Community 6` to `Community 4`, `Community 3`, `Community 0`, `Community 5`, `Community 7`, `Community 11`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `profileData` connect `Community 7` to `Community 0`, `Community 5`, `Community 4`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **What connects `at`, `zm`, `clipGlass` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.13227513227513227 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._