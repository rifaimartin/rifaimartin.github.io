# Node Description Batch 5 of 5

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "3d_planewindowscene_zm": "zm" | kind=code-symbol | source=src/components/3d/PlaneWindowScene.jsx:L15 | neighbors=[PlaneWindowScene.jsx]
- "layout_articlemodal_articlemodal": "ArticleModal()" | kind=code-symbol | source=src/components/layout/ArticleModal.jsx:L6 | neighbors=[ArticleModal.jsx]
- "layout_casestudyitem_casestudyitem": "CaseStudyItem()" | kind=code-symbol | source=src/components/layout/CaseStudyItem.jsx:L17 | neighbors=[CaseStudyItem.jsx]
- "layout_casestudyitem_iconmap": "iconMap" | kind=code-symbol | source=src/components/layout/CaseStudyItem.jsx:L5 | neighbors=[CaseStudyItem.jsx]
- "layout_casestudymodal_casestudymodal": "CaseStudyModal()" | kind=code-symbol | source=src/components/layout/CaseStudyModal.jsx:L4 | neighbors=[CaseStudyModal.jsx]
- "layout_educationsection_educationsection": "EducationSection()" | kind=code-symbol | source=src/components/layout/EducationSection.jsx:L6 | neighbors=[EducationSection.jsx]
- "layout_flighttimeline_companylogoavatars": "CompanyLogoAvatars()" | kind=code-symbol | source=src/components/layout/FlightTimeline.jsx:L21 | neighbors=[FlightTimeline.jsx]
- "layout_flighttimeline_flightplaneicon": "FlightPlaneIcon()" | kind=code-symbol | source=src/components/layout/FlightTimeline.jsx:L9 | neighbors=[FlightTimeline.jsx]
- "layout_flighttimeline_flighttimeline": "FlightTimeline()" | kind=code-symbol | source=src/components/layout/FlightTimeline.jsx:L50 | neighbors=[FlightTimeline.jsx]
- "layout_headerintro_headerintro": "HeaderIntro()" | kind=code-symbol | source=src/components/layout/HeaderIntro.jsx:L8 | neighbors=[HeaderIntro.jsx]
- "layout_inflightmagazine_inflightmagazine": "InFlightMagazine()" | kind=code-symbol | source=src/components/layout/InFlightMagazine.jsx:L7 | neighbors=[InFlightMagazine.jsx]
- "layout_memoriespolaroid_memoriespolaroid": "MemoriesPolaroid()" | kind=code-symbol | source=src/components/layout/MemoriesPolaroid.jsx:L5 | neighbors=[MemoriesPolaroid.jsx]
- "layout_opengymmodal_opengymmodal": "OpenGymModal()" | kind=code-symbol | source=src/components/layout/OpenGymModal.jsx:L5 | neighbors=[OpenGymModal.jsx]
- "layout_progressiveblurdock_githubicon": "GithubIcon()" | kind=code-symbol | source=src/components/layout/ProgressiveBlurDock.jsx:L6 | neighbors=[ProgressiveBlurDock.jsx]
- "layout_progressiveblurdock_linkedinicon": "LinkedinIcon()" | kind=code-symbol | source=src/components/layout/ProgressiveBlurDock.jsx:L15 | neighbors=[ProgressiveBlurDock.jsx]
- "layout_progressiveblurdock_progressiveblurdock": "ProgressiveBlurDock()" | kind=code-symbol | source=src/components/layout/ProgressiveBlurDock.jsx:L25 | neighbors=[ProgressiveBlurDock.jsx]
- "layout_projectlist_projectlist": "ProjectList()" | kind=code-symbol | source=src/components/layout/ProjectList.jsx:L6 | neighbors=[ProjectList.jsx]
- "layout_psikotestmodal_psikotestmodal": "PsikotestModal()" | kind=code-symbol | source=src/components/layout/PsikotestModal.jsx:L14 | neighbors=[PsikotestModal.jsx]
- "layout_publicprojectssection_publicprojectssection": "PublicProjectsSection()" | kind=code-symbol | source=src/components/layout/PublicProjectsSection.jsx:L6 | neighbors=[PublicProjectsSection.jsx]
- "layout_tpdbimodal_tpdbimodal": "TpdBiModal()" | kind=code-symbol | source=src/components/layout/TpdBiModal.jsx:L5 | neighbors=[TpdBiModal.jsx]
- "src_app_app": "App()" | kind=code-symbol | source=src/App.jsx:L21 | neighbors=[App.jsx]
- "utils_audio_soundeffects_constructor": ".constructor()" | kind=code-symbol | source=src/utils/audio.js:L3 | neighbors=[SoundEffects]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\acade\OneDrive\Documents\Freelance\rifaimartin.github.io\.graphify\description-instructions\batch-004.json

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
