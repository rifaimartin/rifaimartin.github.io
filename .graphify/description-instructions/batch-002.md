# Node Description Batch 3 of 5

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@8d91ba900dcdfa78f0a9248f1be625ee971429c5": "8d91ba9 deploy restest" | kind=Commit | source=git | neighbors=[515d4c0 deploy test, gh-pages, master, fd77771 change config] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@957b93cab66a31aaed96e76b4ed5029086b4634b": "957b93c Migrate from Hugo to Jekyll using academicpages template" | kind=Commit | source=git | neighbors=[1f6e491 rebuilding site Sat 17 Jul 2021…, gh-pages, master, 9f17052 Add migration notes and next st…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@9d84b3480996ced1192f64662968fabecdb6130c": "9d84b34 Update About page with professional LinkedIn profile information" | kind=Commit | source=git | neighbors=[77395e3 Add custom 'minimal' theme with…, gh-pages, master, 5eedc7e update cv] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@9e0ac1bf6c5aef725581ffb08526d5f67c8df53b": "9e0ac1b Migrate 16 blog posts from Hugo to Jekyll" | kind=Commit | source=git | neighbors=[gh-pages, master, d272c85 Customize site header and navig…, 9f17052 Add migration notes and next st…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@9f17052771732561ed8efb9fdf3ca18350ca2f1f": "9f17052 Add migration notes and next steps documentation" | kind=Commit | source=git | neighbors=[957b93c Migrate from Hugo to Jekyll usi…, gh-pages, master, 9e0ac1b Migrate 16 blog posts from Hugo…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@a1c32c92fd876f610de6a750ed4a4fcf5348f295": "a1c32c9 feat(perkara-hutang): terinspirasi dari kisah nyata" | kind=Commit | source=git | neighbors=[2013c35 rebuilding site Thu 30 Jul 2020…, gh-pages, master, 873b9de rebuilding site Wed 25 Nov 2020…] | lang=pt
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@a281f1ecb63c104edfcdd42fee33dd138205f82c": "a281f1e rebuilding site Fri 18 Dec 2020 05:46:53 AM WIB" | kind=Commit | source=git | neighbors=[736098f rebuilding site Fri 18 Dec 2020…, gh-pages, master, 69d78df rebuilding site Fri 18 Dec 2020…] | lang=pt
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@a2e27eca311c1f3245d84af08acd567aee2d0a24": "a2e27ec fix: clean stale assets and automate sync-build workflow with verified …" | kind=Commit | source=git | neighbors=[83480e3 fix: import Award icon in Progr…, master, 5c33d42 feat: add TPD Bank Indonesia in…, sync-build.js] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@a8763b00e97b5f257923b218ef6dfaf87e0059e3": "a8763b0 rebuilding site Sun 10 May 2020 08:08:43 AM WIB" | kind=Commit | source=git | neighbors=[7e5aae2 rebuilding site Sun 10 May 2020…, gh-pages, master, 58d0822 rebuilding site Sun 10 May 2020…] | lang=pt
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@a89044ac4dfcc3b91823303a53a1f383d2f521a0": "a89044a feat: add DANA and GoPay to multi-biller payment platform integrations …" | kind=Commit | source=git | neighbors=[master, 774fc4e fix: make article modal header …, profileData.js, bc4b227 feat: add Flight Academy & Acad…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@b791ec2108fcc354058d7dd697575a66cc4834a7": "b791ec2 fix: connect flight path curve seamlessly to airplane tail and add mobi…" | kind=Commit | source=git | neighbors=[774fc4e fix: make article modal header …, master, 17614c6 feat: highlight Golden Generati…, FlightTimeline.jsx] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@cc075b37c8b3fce17e7cd2a0f40572ea0e4f0a8d": "cc075b3 rebuilding site Tue 05 May 2020 10:55:56 AM WIB" | kind=Commit | source=git | neighbors=[41984fa rebuilding site Tue 05 May 2020…, gh-pages, master, 7e5aae2 rebuilding site Sun 10 May 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@d0c8c746ba75743afc58cd42e5eb06467f43e75b": "d0c8c74 rebuilding site Tue 05 May 2020 10:37:14 AM WIB" | kind=Commit | source=git | neighbors=[gh-pages, master, 41984fa rebuilding site Tue 05 May 2020…, f458519 rebuilding site Sun 26 Apr 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@d272c859836bf55387eee5e414cccd8da585335e": "d272c85 Customize site header and navigation (Lei Mao style)" | kind=Commit | source=git | neighbors=[9e0ac1b Migrate 16 blog posts from Hugo…, gh-pages, master, 77395e3 Add custom 'minimal' theme with…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@d7085f0614c8fd01ddd071bc6022883b4c08f621": "d7085f0 rebuilding site Thu 31 Dec 2020 11:17:52 AM WIB" | kind=Commit | source=git | neighbors=[69d78df rebuilding site Fri 18 Dec 2020…, gh-pages, master, 1f6e491 rebuilding site Sat 17 Jul 2021…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@d7c0c0c4e15bb793634d96c27f899ea5d6db6f9c": "d7c0c0c rebuilding site Thu 26 Nov 2020 04:35:27 AM WIB" | kind=Commit | source=git | neighbors=[8d2d370 rebuilding site Wed 25 Nov 2020…, gh-pages, master, 0f22025 rebuilding site Sat 28 Nov 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@dbd92a31287b2863c45c68938236cfb596ac997f": "dbd92a3 rebuilding site Sun 26 Apr 2020 05:49:04 PM WIB" | kind=Commit | source=git | neighbors=[gh-pages, master, 284c797 rebuilding site Sun 26 Apr 2020…, e1f85b6 rebuilding site Sun 26 Apr 2020…] | lang=pt
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@e1f85b6c514294faf163b03d91773c19e04d9c9e": "e1f85b6 rebuilding site Sun 26 Apr 2020 05:48:41 PM WIB" | kind=Commit | source=git | neighbors=[234839a rebuilding site Sun 26 Apr 2020…, gh-pages, master, dbd92a3 rebuilding site Sun 26 Apr 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@e966ea1e1d73296d2cebd7c3963f5f706507d02b": "e966ea1 feat: add MyPertamina microservices architecture details (Command & Que…" | kind=Commit | source=git | neighbors=[17614c6 feat: highlight Golden Generati…, master, f6a5131 feat: integrate official compan…, profileData.js] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@ec30909d33c775bb5c317914f726861305306713": "ec30909 rebuilding site Sun 26 Apr 2020 05:46:17 PM WIB" | kind=Commit | source=git | neighbors=[7ee37cb rebuilding site Sun 26 Apr 2020…, gh-pages, master, 234839a rebuilding site Sun 26 Apr 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@f155f2e6aa8de8afddce5fd96046f51c3b556503": "f155f2e rebuilding site Fri 18 Dec 2020 05:42:20 AM WIB" | kind=Commit | source=git | neighbors=[6c1564f rebuilding site Fri 18 Dec 2020…, gh-pages, master, 736098f rebuilding site Fri 18 Dec 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@f45851950f975295a06025b6bd77c9ef54a5b09f": "f458519 rebuilding site Sun 26 Apr 2020 06:04:17 PM WIB" | kind=Commit | source=git | neighbors=[0a32ba1 rebuilding site Sun 26 Apr 2020…, gh-pages, master, d0c8c74 rebuilding site Tue 05 May 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@fcbaedcb9f298c4d753777e801baab248c30bec6": "fcbaedc rebuilding site Sun 10 May 2020 11:53:46 PM WIB" | kind=Commit | source=git | neighbors=[39fc88a rebuilding site Sun 10 May 2020…, gh-pages, master, 2013c35 rebuilding site Thu 30 Jul 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@fd77771a7a004f3686008640756eed374e65383a": "fd77771 change config" | kind=Commit | source=git | neighbors=[8d91ba9 deploy restest, gh-pages, master, 1a2fd46 change config title] | lang=en
- "layout_casestudymodal": "CaseStudyModal.jsx" | kind=code-symbol | source=src/components/layout/CaseStudyModal.jsx:L1 | neighbors=[9c6966a deploy: update GitHub Pages bui…, ab28525 feat: migrate to interactive 3D…, CaseStudyModal(), App.jsx] | lang=en
- "utils_visitorcounter_usevisitorcount": "useVisitorCount()" | kind=code-symbol | source=src/utils/visitorCounter.js:L7 | neighbors=[GatePassOverlay.jsx, HeaderIntro.jsx, ProgressiveBlurDock.jsx, visitorCounter.js] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@15881edf1b8a727102fe074ba39e239037eab868": "15881ed deploy: update dist bundle on gh-pages" | kind=Commit | source=git | neighbors=[gh-pages, 17fd230 deploy: update with authentic h…, 9fde670 deploy: add In-Flight Magazine …] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@17fd230b05b47acb204b5d56d2aa060ba84a0dfd": "17fd230 deploy: update with authentic historical blog reader on gh-pages" | kind=Commit | source=git | neighbors=[15881ed deploy: update dist bundle on g…, gh-pages, dd6ff9a deploy: update gh-pages with la…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@18e1143309e4c7dfb4c25a8f8256b0d879f66a91": "18e1143 feat(tpd): separate exam mode and review mode, reveal feedback only upo…" | kind=Commit | source=git | neighbors=[master, 5a9aeb7 feat(tpd): implement dual mode …, 792f839 fix: compile from source entryp…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@319c7210e01fb3611eb7094cd1d8c0ed9108113c": "319c721 fix: precisely connect lit flight path line with Flight Plan header and…" | kind=Commit | source=git | neighbors=[master, cbbce94 feat: add global real-time pers…, fb93757 docs: restore full-length histo…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@3bc6cb9aac80b3f41df4bfc97eefc63b4d5f9f3a": "3bc6cb9 feat(tpd): add Mode Tebak Jenis Soal (pattern recognition & strategy id…" | kind=Commit | source=git | neighbors=[master, d2891dc feat(tpd): expand Digit Symbol …, 5a9aeb7 feat(tpd): implement dual mode …] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@3e4fc17f29d0ed98624091335f90b60d4e4e41df": "3e4fc17 deploy: sync flight path line alignment on gh-pages" | kind=Commit | source=git | neighbors=[gh-pages, 6ecfc48 deploy: add persistent profile …, 7b2a421 deploy: fix flight plan line al…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@4212e67d44cbd036d2694b3e8c2ad99bb29844a3": "4212e67 deploy: add 2D character illustrations on gh-pages" | kind=Commit | source=git | neighbors=[gh-pages, 7d12708 deploy: update 2D characters on…, dd6ff9a deploy: update gh-pages with la…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@49f53a4eb6b3f1dbc9123ec6389a70870c1fe8fe": "49f53a4 fix: sync production build bundle into root index.html for GitHub Pages…" | kind=Commit | source=git | neighbors=[35f57e6 feat: implement full interactiv…, master, 83480e3 fix: import Award icon in Progr…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@515d4c0023b665851c95c2f29bb0a0e6529fd03b": "515d4c0 deploy test" | kind=Commit | source=git | neighbors=[gh-pages, master, 8d91ba9 deploy restest] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@5a9aeb7dd3340cbadcd92c11ee27dda4c7849a48": "5a9aeb7 feat(tpd): implement dual mode (instant drill with live feedback vs rea…" | kind=Commit | source=git | neighbors=[18e1143 feat(tpd): separate exam mode a…, master, 3bc6cb9 feat(tpd): add Mode Tebak Jenis…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@6ecfc487babba116165611086e25b1738476b760": "6ecfc48 deploy: add persistent profile view counter on gh-pages" | kind=Commit | source=git | neighbors=[3e4fc17 deploy: sync flight path line a…, gh-pages, 0da4999 deploy: sync visitor counter on…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@7b2a4211a2aa6b536a56112523e919aa603215a9": "7b2a421 deploy: fix flight plan line alignment on gh-pages" | kind=Commit | source=git | neighbors=[gh-pages, 3e4fc17 deploy: sync flight path line a…, 8dfe456 deploy: update full original bl…] | lang=pt
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@7d127083a1c1330837e7e67f8aea6f2aee4821c7": "7d12708 deploy: update 2D characters on gh-pages" | kind=Commit | source=git | neighbors=[4212e67 deploy: add 2D character illust…, gh-pages, a135f0d deploy: update full-length blog…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@8ce3c698ab9409dd9f8f910f8cc5151483185727": "8ce3c69 deploy: update bundle with rifaimartinjham@gmail.com on gh-pages" | kind=Commit | source=git | neighbors=[gh-pages, 9fde670 deploy: add In-Flight Magazine …, 9c6966a deploy: update GitHub Pages bui…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\acade\OneDrive\Documents\Freelance\rifaimartin.github.io\.graphify\description-instructions\batch-002.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
