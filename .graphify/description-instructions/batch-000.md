# Node Description Batch 1 of 5

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

- "branch:repo:github.com/rifaimartin/rifaimartin.github.io#master": "master" | kind=Branch | source=git | neighbors=[00c1ead rebuilding site Sun 26 Apr 2020…, 0a01766 feat: highlight national transf…, 0a32ba1 rebuilding site Sun 26 Apr 2020…, 0f22025 rebuilding site Sat 28 Nov 2020…, 1043cf8 feat: add In-Flight Magazine & …, 17614c6 feat: highlight Golden Generati…] | lang=en
- "branch:repo:github.com/rifaimartin/rifaimartin.github.io#gh-pages": "gh-pages" | kind=Branch | source=git | neighbors=[00c1ead rebuilding site Sun 26 Apr 2020…, 0a01766 feat: highlight national transf…, 0a32ba1 rebuilding site Sun 26 Apr 2020…, 0da4999 deploy: sync visitor counter on…, 0f22025 rebuilding site Sat 28 Nov 2020…, 15881ed deploy: update dist bundle on g…] | lang=en
- "src_app": "App.jsx" | kind=code-symbol | source=src/App.jsx:L1 | neighbors=[1043cf8 feat: add In-Flight Magazine & …, 290fe92 feat: add Public Ventures secti…, 35f57e6 feat: implement full interactiv…, 5a4b2ab feat: embed interactive in-app …, 5c33d42 feat: add TPD Bank Indonesia in…, 7b21fa9 feat: progressive ambient dimmi…] | lang=en
- "data_profiledata": "profileData.js" | kind=code-symbol | source=src/data/profileData.js:L1 | neighbors=[0a01766 feat: highlight national transf…, 1043cf8 feat: add In-Flight Magazine & …, 17614c6 feat: highlight Golden Generati…, 290fe92 feat: add Public Ventures secti…, 2d91bfa chore: update contact email to …, 35f57e6 feat: implement full interactiv…] | lang=en
- "3d_planewindowscene": "PlaneWindowScene.jsx" | kind=code-symbol | source=src/components/3d/PlaneWindowScene.jsx:L1 | neighbors=[at, CirrusPlanes(), clipButton, clipGlass, clipShutterTrack, CloudFallback()] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@ab28525774c4a899d70261583cc1e7b8ddcf12a5": "ab28525 feat: migrate to interactive 3D portfolio with mikes.cv aviation theme …" | kind=Commit | source=git | neighbors=[5eedc7e update cv, AccessPassCard.jsx, GatePassOverlay.jsx, PlaneWindowScene.jsx, gh-pages, master] | lang=en
- "layout_progressiveblurdock": "ProgressiveBlurDock.jsx" | kind=code-symbol | source=src/components/layout/ProgressiveBlurDock.jsx:L1 | neighbors=[1043cf8 feat: add In-Flight Magazine & …, 2d91bfa chore: update contact email to …, 35f57e6 feat: implement full interactiv…, 5a4b2ab feat: embed interactive in-app …, 5c33d42 feat: add TPD Bank Indonesia in…, 83480e3 fix: import Award icon in Progr…] | lang=en
- "utils_audio": "audio.js" | kind=code-symbol | source=src/utils/audio.js:L1 | neighbors=[AccessPassCard.jsx, GatePassOverlay.jsx, PlaneWindowScene.jsx, 9c6966a deploy: update GitHub Pages bui…, ab28525 feat: migrate to interactive 3D…, ArticleModal.jsx] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@9c6966ab8f02adeeb8c5a63c7d813888600201c4": "9c6966a deploy: update GitHub Pages build" | kind=Commit | source=git | neighbors=[6582fe3 build: clean build and deploy p…, AccessPassCard.jsx, GatePassOverlay.jsx, PlaneWindowScene.jsx, gh-pages, 8ce3c69 deploy: update bundle with rifa…] | lang=pt
- "utils_audio_soundfx": "soundFx" | kind=code-symbol | source=src/utils/audio.js:L167 | neighbors=[AccessPassCard.jsx, GatePassOverlay.jsx, PlaneWindowScene.jsx, ArticleModal.jsx, CaseStudyItem.jsx, EducationSection.jsx] | lang=en
- "layout_headerintro": "HeaderIntro.jsx" | kind=code-symbol | source=src/components/layout/HeaderIntro.jsx:L1 | neighbors=[7b21fa9 feat: progressive ambient dimmi…, 9c6966a deploy: update GitHub Pages bui…, a51c4f6 feat: upgrade to photorealistic…, ab28525 feat: migrate to interactive 3D…, cbbce94 feat: add global real-time pers…, PlaneWindowScene.jsx] | lang=en
- "layout_projectlist": "ProjectList.jsx" | kind=code-symbol | source=src/components/layout/ProjectList.jsx:L1 | neighbors=[290fe92 feat: add Public Ventures secti…, 35f57e6 feat: implement full interactiv…, 5a4b2ab feat: embed interactive in-app …, 5c33d42 feat: add TPD Bank Indonesia in…, 9c6966a deploy: update GitHub Pages bui…, ab28525 feat: migrate to interactive 3D…] | lang=en
- "layout_flighttimeline": "FlightTimeline.jsx" | kind=code-symbol | source=src/components/layout/FlightTimeline.jsx:L1 | neighbors=[7b21fa9 feat: progressive ambient dimmi…, 9c6966a deploy: update GitHub Pages bui…, ab28525 feat: migrate to interactive 3D…, b791ec2 fix: connect flight path curve …, f6a5131 feat: integrate official compan…, profileData.js] | lang=en
- "layout_inflightmagazine": "InFlightMagazine.jsx" | kind=code-symbol | source=src/components/layout/InFlightMagazine.jsx:L1 | neighbors=[1043cf8 feat: add In-Flight Magazine & …, a54f9ee feat: add expressive 2D vector …, d019266 feat: sync ArticleModal source …, profileData.js, profileData, ArticleCharacters.jsx] | lang=en
- "3d_gatepassoverlay": "GatePassOverlay.jsx" | kind=code-symbol | source=src/components/3d/GatePassOverlay.jsx:L1 | neighbors=[AccessPassCard.jsx, GatePassOverlay(), audio.js, soundFx, visitorCounter.js, useVisitorCount()] | lang=en
- "layout_articlemodal": "ArticleModal.jsx" | kind=code-symbol | source=src/components/layout/ArticleModal.jsx:L1 | neighbors=[774fc4e fix: make article modal header …, 898fc96 fix: resolve blog modal styling…, a54f9ee feat: add expressive 2D vector …, d019266 feat: sync ArticleModal source …, ArticleCharacters.jsx, ArticleCharacter()] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@35f57e609314431affa22fc9b45cfb11cac1022c": "35f57e6 feat: implement full interactive Banking Psychotest in-app arena with q…" | kind=Commit | source=git | neighbors=[290fe92 feat: add Public Ventures secti…, master, 49f53a4 fix: sync production build bund…, profileData.js, psikotestData.js, ProgressiveBlurDock.jsx] | lang=en
- "data_profiledata_profiledata": "profileData" | kind=code-symbol | source=src/data/profileData.js:L1 | neighbors=[profileData.js, EducationSection.jsx, FlightTimeline.jsx, HeaderIntro.jsx, InFlightMagazine.jsx, MemoriesPolaroid.jsx] | lang=en
- "layout_psikotestmodal": "PsikotestModal.jsx" | kind=code-symbol | source=src/components/layout/PsikotestModal.jsx:L1 | neighbors=[35f57e6 feat: implement full interactiv…, psikotestData.js, generatePsychotestFeedback(), PSIKOTEST_CATEGORIES, PSIKOTEST_QUESTIONS, PsikotestModal()] | lang=en
- "utils_audio_soundeffects": "SoundEffects" | kind=code-symbol | source=src/utils/audio.js:L2 | neighbors=[audio.js, .constructor(), .init(), .playCardClick(), .playHover(), .playNfcSuccess()] | lang=en
- "3d_accesspasscard": "AccessPassCard.jsx" | kind=code-symbol | source=src/components/3d/AccessPassCard.jsx:L1 | neighbors=[AccessPassCard(), CardModel(), createBoardingPassTexture(), audio.js, soundFx, GatePassOverlay.jsx] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@5c33d4292ba5a686e42af4580c228be3197908f1": "5c33d42 feat: add TPD Bank Indonesia interactive in-app simulator and launcher" | kind=Commit | source=git | neighbors=[master, 792f839 fix: compile from source entryp…, profileData.js, ProgressiveBlurDock.jsx, ProjectList.jsx, TpdBiModal.jsx] | lang=en
- "layout_educationsection": "EducationSection.jsx" | kind=code-symbol | source=src/components/layout/EducationSection.jsx:L1 | neighbors=[17614c6 feat: highlight Golden Generati…, bc4b227 feat: add Flight Academy & Acad…, profileData.js, profileData, EducationSection(), audio.js] | lang=en
- "layout_memoriespolaroid": "MemoriesPolaroid.jsx" | kind=code-symbol | source=src/components/layout/MemoriesPolaroid.jsx:L1 | neighbors=[9c6966a deploy: update GitHub Pages bui…, ab28525 feat: migrate to interactive 3D…, profileData.js, profileData, MemoriesPolaroid(), audio.js] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@1043cf8bf2f4325d5f1e6e925eaddf0e9b48cc88": "1043cf8 feat: add In-Flight Magazine & technical essays section with dock short…" | kind=Commit | source=git | neighbors=[master, d019266 feat: sync ArticleModal source …, profileData.js, InFlightMagazine.jsx, ProgressiveBlurDock.jsx, App.jsx] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@290fe92bcfbc11399a1c9a72fae7fd3fc35214af": "290fe92 feat: add Public Ventures section for Potretin and AlamNatura, remove o…" | kind=Commit | source=git | neighbors=[master, 35f57e6 feat: implement full interactiv…, profileData.js, ProjectList.jsx, PublicProjectsSection.jsx, App.jsx] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@5a4b2ab3a5f8211a033f4acd9ca73222fb641cb4": "5a4b2ab feat: embed interactive in-app OpenGym simulator modal with live demo r…" | kind=Commit | source=git | neighbors=[master, a237278 fix: optimize mobile dock layou…, OpenGymModal.jsx, ProgressiveBlurDock.jsx, ProjectList.jsx, App.jsx] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@7b21fa9bfe345ad9659449bebb393776c7e6f9e1": "7b21fa9 feat: progressive ambient dimming during shade drag and authentic curve…" | kind=Commit | source=git | neighbors=[PlaneWindowScene.jsx, master, bc4b227 feat: add Flight Academy & Acad…, FlightTimeline.jsx, HeaderIntro.jsx, App.jsx] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@cbbce9441577d5ba6d73f70b6f0c7dbdfc24a45c": "cbbce94 feat: add global real-time persistent profile view counter across all d…" | kind=Commit | source=git | neighbors=[319c721 fix: precisely connect lit flig…, GatePassOverlay.jsx, master, c3eb17c feat: integrate openGym sub-pag…, HeaderIntro.jsx, ProgressiveBlurDock.jsx] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@d019266f24d5f86bc784f6fdd5a019f9eac9ce2b": "d019266 feat: sync ArticleModal source on master" | kind=Commit | source=git | neighbors=[1043cf8 feat: add In-Flight Magazine & …, master, b700c8e feat: integrate historical blog…, profileData.js, ArticleModal.jsx, InFlightMagazine.jsx] | lang=en
- "layout_casestudyitem": "CaseStudyItem.jsx" | kind=code-symbol | source=src/components/layout/CaseStudyItem.jsx:L1 | neighbors=[9c6966a deploy: update GitHub Pages bui…, ab28525 feat: migrate to interactive 3D…, CaseStudyItem(), iconMap, audio.js, soundFx] | lang=en
- "layout_publicprojectssection": "PublicProjectsSection.jsx" | kind=code-symbol | source=src/components/layout/PublicProjectsSection.jsx:L1 | neighbors=[290fe92 feat: add Public Ventures secti…, profileData.js, profileData, PublicProjectsSection(), audio.js, soundFx] | lang=en
- "utils_audio_soundeffects_init": ".init()" | kind=code-symbol | source=src/utils/audio.js:L7 | neighbors=[SoundEffects, .playCardClick(), .playHover(), .playNfcSuccess(), .playShadeSlide(), .playShadeSnap()] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@a54f9eeca3c32a124ea06c843e557031536e7862": "a54f9ee feat: add expressive 2D vector character illustrations for all blog pos…" | kind=Commit | source=git | neighbors=[898fc96 fix: resolve blog modal styling…, master, fb93757 docs: restore full-length histo…, ArticleCharacters.jsx, ArticleModal.jsx, InFlightMagazine.jsx] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@bc4b22743b5ae7e3fb27a51d3cf57ef8abeb6eeb": "bc4b227 feat: add Flight Academy & Academic Foundations education section with …" | kind=Commit | source=git | neighbors=[7b21fa9 feat: progressive ambient dimmi…, master, a89044a feat: add DANA and GoPay to mul…, profileData.js, EducationSection.jsx, App.jsx] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@c3eb17cbdb01aa3b739ba1ae7cf599544a2eddf3": "c3eb17c feat: integrate openGym sub-page, featured card showcase and quick laun…" | kind=Commit | source=git | neighbors=[master, 5a4b2ab feat: embed interactive in-app …, profileData.js, ProgressiveBlurDock.jsx, ProjectList.jsx, cbbce94 feat: add global real-time pers…] | lang=en
- "illustrations_articlecharacters": "ArticleCharacters.jsx" | kind=code-symbol | source=src/components/illustrations/ArticleCharacters.jsx:L1 | neighbors=[774fc4e fix: make article modal header …, a54f9ee feat: add expressive 2D vector …, fb93757 docs: restore full-length histo…, ArticleCharacter(), ArticleModal.jsx, InFlightMagazine.jsx] | lang=en
- "utils_visitorcounter": "visitorCounter.js" | kind=code-symbol | source=src/utils/visitorCounter.js:L1 | neighbors=[GatePassOverlay.jsx, a237278 fix: optimize mobile dock layou…, cbbce94 feat: add global real-time pers…, HeaderIntro.jsx, ProgressiveBlurDock.jsx, useVisitorCount()] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@0a01766e070387dcf49f5f9fa6bc96baca06fe00": "0a01766 feat: highlight national transfers (BI-FAST/RTGS/SKN) and K8s microserv…" | kind=Commit | source=git | neighbors=[gh-pages, master, 6582fe3 build: clean build and deploy p…, profileData.js, 6d09679 docs: translate experience and …] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@17614c6fd2830cbc59075629c54bde5684c8388e": "17614c6 feat: highlight Golden Generation and Top Graduate honors for SMKN 1 Ci…" | kind=Commit | source=git | neighbors=[master, e966ea1 feat: add MyPertamina microserv…, profileData.js, EducationSection.jsx, b791ec2 fix: connect flight path curve …] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\acade\OneDrive\Documents\Freelance\rifaimartin.github.io\.graphify\description-instructions\batch-000.json

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
