# Node Description Batch 4 of 5

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

- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@8dfe4561471384e44d79e71deb7dcb03f6cc5d41": "8dfe456 deploy: update full original blog text on gh-pages" | kind=Commit | source=git | neighbors=[gh-pages, 7b2a421 deploy: fix flight plan line al…, a135f0d deploy: update full-length blog…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@9fde67071b7ef0085d59d9b70bbc0b6f76551288": "9fde670 deploy: add In-Flight Magazine section on gh-pages" | kind=Commit | source=git | neighbors=[8ce3c69 deploy: update bundle with rifa…, gh-pages, 15881ed deploy: update dist bundle on g…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@a135f0d27820d24a5ce7e547ca98e0200ecd654e": "a135f0d deploy: update full-length blog posts on gh-pages" | kind=Commit | source=git | neighbors=[7d12708 deploy: update 2D characters on…, gh-pages, 8dfe456 deploy: update full original bl…] | lang=pt
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@b700c8e680223360339a95d89e41c6519b63d9a0": "b700c8e feat: integrate historical blog articles (Telkom journey, Tech Lead fra…" | kind=Commit | source=git | neighbors=[master, 898fc96 fix: resolve blog modal styling…, d019266 feat: sync ArticleModal source …] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@d2891dca9c62a566ba0e3727aac0c40549ef2d41": "d2891dc feat(tpd): expand Digit Symbol to 30 speed drill items and add numerica…" | kind=Commit | source=git | neighbors=[3bc6cb9 feat(tpd): add Mode Tebak Jenis…, master, 8e0c095 feat(tpd): add 24 visual questi…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@dd6ff9a872d63dde53c2ff66c0845bcae77337c4": "dd6ff9a deploy: update gh-pages with latest modal fix" | kind=Commit | source=git | neighbors=[17fd230 deploy: update with authentic h…, gh-pages, 4212e67 deploy: add 2D character illust…] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@e07e42f35b58e1791087f553db66628ac1d02285": "e07e42f build: bundle email update" | kind=Commit | source=git | neighbors=[2d91bfa chore: update contact email to …, master, 1043cf8 feat: add In-Flight Magazine & …] | lang=en
- "illustrations_articlecharacters_articlecharacter": "ArticleCharacter()" | kind=code-symbol | source=src/components/illustrations/ArticleCharacters.jsx:L3 | neighbors=[ArticleCharacters.jsx, ArticleModal.jsx, InFlightMagazine.jsx] | lang=en
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@0da4999299edf05b5a935e89253dd65e92a4e238": "0da4999 deploy: sync visitor counter on gh-pages" | kind=Commit | source=git | neighbors=[gh-pages, 6ecfc48 deploy: add persistent profile …] | lang=pt
- "commit:repo:github.com/rifaimartin/rifaimartin.github.io@8e0c0959b828686343b8c1a87afb89a733c548f6": "8e0c095 feat(tpd): add 24 visual questions for Diagram Venn, 3x3 Raven Matrices…" | kind=Commit | source=git | neighbors=[master, d2891dc feat(tpd): expand Digit Symbol …] | lang=en
- "data_psikotestdata_generatepsychotestfeedback": "generatePsychotestFeedback()" | kind=code-symbol | source=src/data/psikotestData.js:L314 | neighbors=[psikotestData.js, PsikotestModal.jsx] | lang=en
- "data_psikotestdata_psikotest_categories": "PSIKOTEST_CATEGORIES" | kind=code-symbol | source=src/data/psikotestData.js:L4 | neighbors=[psikotestData.js, PsikotestModal.jsx] | lang=en
- "data_psikotestdata_psikotest_questions": "PSIKOTEST_QUESTIONS" | kind=code-symbol | source=src/data/psikotestData.js:L52 | neighbors=[psikotestData.js, PsikotestModal.jsx] | lang=en
- "scripts_sync_build": "sync-build.js" | kind=code-symbol | source=scripts/sync-build.js:L1 | neighbors=[792f839 fix: compile from source entryp…, a2e27ec fix: clean stale assets and aut…] | lang=en
- "src_main": "main.jsx" | kind=code-symbol | source=src/main.jsx:L1 | neighbors=[9c6966a deploy: update GitHub Pages bui…, ab28525 feat: migrate to interactive 3D…] | lang=en
- "utils_audio_soundeffects_playcardclick": ".playCardClick()" | kind=code-symbol | source=src/utils/audio.js:L66 | neighbors=[SoundEffects, .init()] | lang=en
- "utils_audio_soundeffects_playhover": ".playHover()" | kind=code-symbol | source=src/utils/audio.js:L84 | neighbors=[SoundEffects, .init()] | lang=en
- "utils_audio_soundeffects_playnfcsuccess": ".playNfcSuccess()" | kind=code-symbol | source=src/utils/audio.js:L20 | neighbors=[SoundEffects, .init()] | lang=en
- "utils_audio_soundeffects_playshadeslide": ".playShadeSlide()" | kind=code-symbol | source=src/utils/audio.js:L102 | neighbors=[SoundEffects, .init()] | lang=en
- "utils_audio_soundeffects_playshadesnap": ".playShadeSnap()" | kind=code-symbol | source=src/utils/audio.js:L131 | neighbors=[SoundEffects, .init()] | lang=en
- "utils_audio_soundeffects_playthemetoggle": ".playThemeToggle()" | kind=code-symbol | source=src/utils/audio.js:L149 | neighbors=[SoundEffects, .init()] | lang=en
- "vite_config": "vite.config.js" | kind=code-symbol | source=vite.config.js:L1 | neighbors=[9c6966a deploy: update GitHub Pages bui…, ab28525 feat: migrate to interactive 3D…] | lang=en
- "3d_accesspasscard_accesspasscard": "AccessPassCard()" | kind=code-symbol | source=src/components/3d/AccessPassCard.jsx:L290 | neighbors=[AccessPassCard.jsx] | lang=en
- "3d_accesspasscard_cardmodel": "CardModel()" | kind=code-symbol | source=src/components/3d/AccessPassCard.jsx:L169 | neighbors=[AccessPassCard.jsx] | lang=en
- "3d_accesspasscard_createboardingpasstexture": "createBoardingPassTexture()" | kind=code-symbol | source=src/components/3d/AccessPassCard.jsx:L7 | neighbors=[AccessPassCard.jsx] | lang=en
- "3d_gatepassoverlay_gatepassoverlay": "GatePassOverlay()" | kind=code-symbol | source=src/components/3d/GatePassOverlay.jsx:L8 | neighbors=[GatePassOverlay.jsx] | lang=en
- "3d_planewindowscene_at": "at" | kind=code-symbol | source=src/components/3d/PlaneWindowScene.jsx:L13 | neighbors=[PlaneWindowScene.jsx] | lang=en
- "3d_planewindowscene_cirrusplanes": "CirrusPlanes()" | kind=code-symbol | source=src/components/3d/PlaneWindowScene.jsx:L153 | neighbors=[PlaneWindowScene.jsx] | lang=en
- "3d_planewindowscene_clipbutton": "clipButton" | kind=code-symbol | source=src/components/3d/PlaneWindowScene.jsx:L27 | neighbors=[PlaneWindowScene.jsx] | lang=en
- "3d_planewindowscene_clipglass": "clipGlass" | kind=code-symbol | source=src/components/3d/PlaneWindowScene.jsx:L25 | neighbors=[PlaneWindowScene.jsx] | lang=en
- "3d_planewindowscene_clipshuttertrack": "clipShutterTrack" | kind=code-symbol | source=src/components/3d/PlaneWindowScene.jsx:L26 | neighbors=[PlaneWindowScene.jsx] | lang=en
- "3d_planewindowscene_cloudfallback": "CloudFallback()" | kind=code-symbol | source=src/components/3d/PlaneWindowScene.jsx:L41 | neighbors=[PlaneWindowScene.jsx] | lang=en
- "3d_planewindowscene_cloudpuff": "CloudPuff()" | kind=code-symbol | source=src/components/3d/PlaneWindowScene.jsx:L203 | neighbors=[PlaneWindowScene.jsx] | lang=en
- "3d_planewindowscene_handleboxstyle": "handleBoxStyle" | kind=code-symbol | source=src/components/3d/PlaneWindowScene.jsx:L29 | neighbors=[PlaneWindowScene.jsx] | lang=en
- "3d_planewindowscene_makeclip": "makeClip()" | kind=code-symbol | source=src/components/3d/PlaneWindowScene.jsx:L22 | neighbors=[PlaneWindowScene.jsx] | lang=en
- "3d_planewindowscene_oceanplane": "OceanPlane()" | kind=code-symbol | source=src/components/3d/PlaneWindowScene.jsx:L74 | neighbors=[PlaneWindowScene.jsx] | lang=en
- "3d_planewindowscene_planewindowscene": "PlaneWindowScene()" | kind=code-symbol | source=src/components/3d/PlaneWindowScene.jsx:L326 | neighbors=[PlaneWindowScene.jsx] | lang=en
- "3d_planewindowscene_threewindowviewport": "ThreeWindowViewport()" | kind=code-symbol | source=src/components/3d/PlaneWindowScene.jsx:L274 | neighbors=[PlaneWindowScene.jsx] | lang=en
- "3d_planewindowscene_volumetriccloudscene": "VolumetricCloudScene()" | kind=code-symbol | source=src/components/3d/PlaneWindowScene.jsx:L240 | neighbors=[PlaneWindowScene.jsx] | lang=en
- "3d_planewindowscene_windowimage": "WindowImage()" | kind=code-symbol | source=src/components/3d/PlaneWindowScene.jsx:L304 | neighbors=[PlaneWindowScene.jsx] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\acade\OneDrive\Documents\Freelance\rifaimartin.github.io\.graphify\description-instructions\batch-003.json

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
