# Node Description Batch 2 of 5

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

- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@2d91bfa5c86c7c00fc5e39b9d6b99cfc648e082f": "2d91bfa chore: update contact email to rifaimartinjham@gmail.com" | kind=Commit | source=git | neighbors=[master, e07e42f build: bundle email update, profileData.js, ProgressiveBlurDock.jsx, 6582fe3 build: clean build and deploy p…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@6582fe3c9758538f0865c6597eb0c11ba7da5d09": "6582fe3 build: clean build and deploy pipeline for GitHub Pages" | kind=Commit | source=git | neighbors=[0a01766 feat: highlight national transf…, gh-pages, master, 2d91bfa chore: update contact email to …, 9c6966a deploy: update GitHub Pages bui…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@6d096799007a1207b2d5b21313fec14ec291903e": "6d09679 docs: translate experience and project details to English" | kind=Commit | source=git | neighbors=[gh-pages, master, 0a01766 feat: highlight national transf…, profileData.js, ab28525 feat: migrate to interactive 3D…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@774fc4e0f763bf2a5a02f2f3ada44f221216e390": "774fc4e fix: make article modal header fully responsive on mobile screens" | kind=Commit | source=git | neighbors=[master, b791ec2 fix: connect flight path curve …, ArticleCharacters.jsx, ArticleModal.jsx, a89044a feat: add DANA and GoPay to mul…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@a23727831b869cf6da7bf3c3adaa996a38fde6c4": "a237278 fix: optimize mobile dock layout with responsive labels and deduplicate…" | kind=Commit | source=git | neighbors=[5a4b2ab feat: embed interactive in-app …, master, a51c4f6 feat: upgrade to photorealistic…, ProgressiveBlurDock.jsx, visitorCounter.js] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@a51c4f6f45481470253f6169dbf7329801469f87": "a51c4f6 feat: upgrade to photorealistic triple-layer aircraft window, spring dr…" | kind=Commit | source=git | neighbors=[a237278 fix: optimize mobile dock layou…, PlaneWindowScene.jsx, master, 7b21fa9 feat: progressive ambient dimmi…, HeaderIntro.jsx] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@f6a5131764a77e03befea8f7c63919113a959e43": "f6a5131 feat: integrate official company & project logo avatar badges (blu by B…" | kind=Commit | source=git | neighbors=[e966ea1 feat: add MyPertamina microserv…, master, 290fe92 feat: add Public Ventures secti…, profileData.js, FlightTimeline.jsx] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@fb937570c4894eab820584ddf1b84d603f12c580": "fb93757 docs: restore full-length historical blog writings with authentic emoti…" | kind=Commit | source=git | neighbors=[a54f9ee feat: add expressive 2D vector …, master, 319c721 fix: precisely connect lit flig…, profileData.js, ArticleCharacters.jsx] | lang=en
- "data_psikotestdata": "psikotestData.js" | kind=code-symbol | source=src/data/psikotestData.js:L1 | neighbors=[35f57e6 feat: implement full interactiv…, generatePsychotestFeedback(), PSIKOTEST_CATEGORIES, PSIKOTEST_QUESTIONS, PsikotestModal.jsx] | lang=en
- "layout_opengymmodal": "OpenGymModal.jsx" | kind=code-symbol | source=src/components/layout/OpenGymModal.jsx:L1 | neighbors=[5a4b2ab feat: embed interactive in-app …, OpenGymModal(), audio.js, soundFx, App.jsx] | lang=en
- "layout_tpdbimodal": "TpdBiModal.jsx" | kind=code-symbol | source=src/components/layout/TpdBiModal.jsx:L1 | neighbors=[5c33d42 feat: add TPD Bank Indonesia in…, TpdBiModal(), audio.js, soundFx, App.jsx] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@00c1ead14978065bae74d14111606cbfd4355026": "00c1ead rebuilding site Sun 26 Apr 2020 10:43:32 AM WIB" | kind=Commit | source=git | neighbors=[gh-pages, master, 7ee37cb rebuilding site Sun 26 Apr 2020…, 1e589bf update] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@0a32ba1cb9194174ac8fee73c4d8deb067474585": "0a32ba1 rebuilding site Sun 26 Apr 2020 06:03:11 PM WIB" | kind=Commit | source=git | neighbors=[gh-pages, master, f458519 rebuilding site Sun 26 Apr 2020…, 284c797 rebuilding site Sun 26 Apr 2020…] | lang=pt
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@0f220253f6d920004bb4677fa7d726d57485d181": "0f22025 rebuilding site Sat 28 Nov 2020 11:21:49 PM WIB" | kind=Commit | source=git | neighbors=[gh-pages, master, 445f5b1 rebuilding site Sun 06 Dec 2020…, d7c0c0c rebuilding site Thu 26 Nov 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@1a2fd46e917195322848f8b421ed808b8a61520e": "1a2fd46 change config title" | kind=Commit | source=git | neighbors=[gh-pages, master, 2bfd8f2 change config title, fd77771 change config] | lang=pt
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@1e589bf9d9f08c182131cef978d418f24308d4e7": "1e589bf update" | kind=Commit | source=git | neighbors=[gh-pages, master, 00c1ead rebuilding site Sun 26 Apr 2020…, 2bfd8f2 change config title] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@1f6e491e3cebf5595c78d61e374b8eec73de47a8": "1f6e491 rebuilding site Sat 17 Jul 2021 07:47:04 PM WIB" | kind=Commit | source=git | neighbors=[gh-pages, master, 957b93c Migrate from Hugo to Jekyll usi…, d7085f0 rebuilding site Thu 31 Dec 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@2013c3579951c0ecef2b06f145ee4c1cff5ba096": "2013c35 rebuilding site Thu 30 Jul 2020 10:20:33 AM WIB" | kind=Commit | source=git | neighbors=[gh-pages, master, a1c32c9 feat(perkara-hutang): terinspir…, fcbaedc rebuilding site Sun 10 May 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@234839a6b8fdf9008fec0cea039736519261c8c3": "234839a rebuilding site Sun 26 Apr 2020 05:47:29 PM WIB" | kind=Commit | source=git | neighbors=[gh-pages, master, e1f85b6 rebuilding site Sun 26 Apr 2020…, ec30909 rebuilding site Sun 26 Apr 2020…] | lang=pt
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@284c7976682a6e4e49c47dd0347605b6d21c061f": "284c797 rebuilding site Sun 26 Apr 2020 05:50:19 PM WIB" | kind=Commit | source=git | neighbors=[gh-pages, master, 0a32ba1 rebuilding site Sun 26 Apr 2020…, dbd92a3 rebuilding site Sun 26 Apr 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@2bfd8f2b118d1ce6b131cab57da56b805f4d852b": "2bfd8f2 change config title" | kind=Commit | source=git | neighbors=[1a2fd46 change config title, gh-pages, master, 1e589bf update] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@39fc88aa0c690c9153afc66481b160d19d4b668e": "39fc88a rebuilding site Sun 10 May 2020 08:12:40 AM WIB" | kind=Commit | source=git | neighbors=[gh-pages, master, fcbaedc rebuilding site Sun 10 May 2020…, 58d0822 rebuilding site Sun 10 May 2020…] | lang=pt
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@41984fa62ec2821be742f9dd981c3ab94c8acff9": "41984fa rebuilding site Tue 05 May 2020 10:54:26 AM WIB" | kind=Commit | source=git | neighbors=[gh-pages, master, cc075b3 rebuilding site Tue 05 May 2020…, d0c8c74 rebuilding site Tue 05 May 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@445f5b12c8492269d4c3f822e4d265e4470d9f2f": "445f5b1 rebuilding site Sun 06 Dec 2020 09:34:07 AM WIB" | kind=Commit | source=git | neighbors=[0f22025 rebuilding site Sat 28 Nov 2020…, gh-pages, master, 6c1564f rebuilding site Fri 18 Dec 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@58d0822ce16cda22557b5d5a56a74347c3f43468": "58d0822 rebuilding site Sun 10 May 2020 08:12:08 AM WIB" | kind=Commit | source=git | neighbors=[gh-pages, master, 39fc88a rebuilding site Sun 10 May 2020…, a8763b0 rebuilding site Sun 10 May 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@5eedc7e3e1d255b52c3f432ef1a9973335123d07": "5eedc7e update cv" | kind=Commit | source=git | neighbors=[gh-pages, master, ab28525 feat: migrate to interactive 3D…, 9d84b34 Update About page with professi…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@631b55d27baece83b9e1e4e334a9b4841747ecdc": "631b55d rebuilding site Wed 25 Nov 2020 08:49:39 PM WIB" | kind=Commit | source=git | neighbors=[gh-pages, master, 8d2d370 rebuilding site Wed 25 Nov 2020…, 641bc1f rebuilding site Wed 25 Nov 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@641bc1fe40bccb339b21596ddf9644e511867683": "641bc1f rebuilding site Wed 25 Nov 2020 08:47:56 PM WIB" | kind=Commit | source=git | neighbors=[gh-pages, master, 631b55d rebuilding site Wed 25 Nov 2020…, 842238f rebuilding site Wed 25 Nov 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@69d78df1f821a84802ba1170433ba7f8404b41df": "69d78df rebuilding site Fri 18 Dec 2020 05:53:00 AM WIB" | kind=Commit | source=git | neighbors=[gh-pages, master, d7085f0 rebuilding site Thu 31 Dec 2020…, a281f1e rebuilding site Fri 18 Dec 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@6c1564f69cd5e01b0cbdd45d4128cb6b59ed68f0": "6c1564f rebuilding site Fri 18 Dec 2020 05:38:12 AM WIB" | kind=Commit | source=git | neighbors=[445f5b1 rebuilding site Sun 06 Dec 2020…, gh-pages, master, f155f2e rebuilding site Fri 18 Dec 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@736098f8c734495e5a20758a3513989ebf624185": "736098f rebuilding site Fri 18 Dec 2020 05:45:31 AM WIB" | kind=Commit | source=git | neighbors=[gh-pages, master, a281f1e rebuilding site Fri 18 Dec 2020…, f155f2e rebuilding site Fri 18 Dec 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@77395e3dcfea4b0d9b207e2a26481b73536b8df4": "77395e3 Add custom 'minimal' theme with Lei Mao inspired card shadows" | kind=Commit | source=git | neighbors=[gh-pages, master, 9d84b34 Update About page with professi…, d272c85 Customize site header and navig…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@792f839e816f25daef3370438889cddb9e3ee674": "792f839 fix: compile from source entrypoint and deploy verified bundle with TPD…" | kind=Commit | source=git | neighbors=[5c33d42 feat: add TPD Bank Indonesia in…, master, 18e1143 feat(tpd): separate exam mode a…, sync-build.js] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@7e5aae284bced7bb8dcce4986e55e94e88f378f6": "7e5aae2 rebuilding site Sun 10 May 2020 08:07:59 AM WIB" | kind=Commit | source=git | neighbors=[gh-pages, master, a8763b0 rebuilding site Sun 10 May 2020…, cc075b3 rebuilding site Tue 05 May 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@7ee37cbf1147fe07ce46e8930fed35961dc4aba7": "7ee37cb rebuilding site Sun 26 Apr 2020 05:45:38 PM WIB" | kind=Commit | source=git | neighbors=[00c1ead rebuilding site Sun 26 Apr 2020…, gh-pages, master, ec30909 rebuilding site Sun 26 Apr 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@83480e32d445c6aa561906f3a6ceeeef1c1dcc9b": "83480e3 fix: import Award icon in ProgressiveBlurDock to resolve ReferenceError" | kind=Commit | source=git | neighbors=[49f53a4 fix: sync production build bund…, master, a2e27ec fix: clean stale assets and aut…, ProgressiveBlurDock.jsx] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@842238f1818c176bda2bbef5b99a200873284cea": "842238f rebuilding site Wed 25 Nov 2020 08:45:40 PM WIB" | kind=Commit | source=git | neighbors=[gh-pages, master, 641bc1f rebuilding site Wed 25 Nov 2020…, 873b9de rebuilding site Wed 25 Nov 2020…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@873b9dee8954609c30f20566148702267ef6fc28": "873b9de rebuilding site Wed 25 Nov 2020 08:37:34 PM WIB" | kind=Commit | source=git | neighbors=[gh-pages, master, 842238f rebuilding site Wed 25 Nov 2020…, a1c32c9 feat(perkara-hutang): terinspir…] | lang=nl
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@898fc96fad2387c9b19912bbf1e58242c6a2af69": "898fc96 fix: resolve blog modal styling and overlay display issue" | kind=Commit | source=git | neighbors=[master, a54f9ee feat: add expressive 2D vector …, ArticleModal.jsx, b700c8e feat: integrate historical blog…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@8d2d37088d38a1830167db1155b8d59d7a13bda9": "8d2d370 rebuilding site Wed 25 Nov 2020 08:50:25 PM WIB" | kind=Commit | source=git | neighbors=[631b55d rebuilding site Wed 25 Nov 2020…, gh-pages, master, d7c0c0c rebuilding site Thu 26 Nov 2020…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\acade\OneDrive\Documents\Freelance\rifaimartin.github.io\.graphify\description-instructions\batch-001.json

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
