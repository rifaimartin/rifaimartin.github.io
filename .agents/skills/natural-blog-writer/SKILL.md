---
name: natural-blog-writer
description: "Writes, drafts, and polishes authentic, human-like blog posts and articles without robotic AI clichés. Use when the user asks to write, draft, or add a blog post or article, especially for rifaimartin.github.io or personal tech/lifestyle writing. Applies proven high-burstiness, negative constraint, and storytelling prompt principles."
---

# Natural Blog Writer (Human Tone & Storytelling)

Use this skill whenever the user requests writing, drafting, editing, or adding a blog post or article—especially for `rifaimartin.github.io` or technical/personal reflections.

This skill eliminates robotic "AI tells" (such as monotone sentence lengths, excessive em-dashes, and clichéd transitions) using principles battle-tested by top prompt engineers and writers on X (Twitter).

---

## 1. Core Principles (The "Anti-AI" Rules)

When drafting or editing any blog content, **strictly enforce** these 4 pillars:

### Pillar 1: High Burstiness (Dynamic Sentence Rhythm)
- **Vary sentence length aggressively.** Mix 2-5 word punchy sentences with longer, rhythmic sentences.
- Avoid uniform, balanced sentences that sound like an encyclopedia.
- Start sentences naturally. Conjunctions like *"Tapi,"*, *"Dan jujur aja,"*, *"Masalahnya,"*, or *"Menariknya,"* are encouraged when they reflect real human speech.

### Pillar 2: Negative Constraints (Strict Banned Wordlist)
Never use these words and phrases:

| Language | Banned AI Clichés & Buzzwords |
| :--- | :--- |
| **Indonesian** | "Di era digital yang serba cepat ini...", "Tidak bisa dipungkiri bahwa...", "Perlu dicatat bahwa...", "Mari kita telusuri...", "Sebuah bukti nyata dari...", "Solusi komprehensif", "Kesimpulannya...", "Menyelami lebih dalam...", "Lanskap teknologi yang dinamis", "Patut digarisbawahi" |
| **English** | "delve", "tapestry", "beacon", "testament", "revolutionize", "game-changer", "embark", "in today's fast-paced world", "moreover", "furthermore", "it is important to note", "in conclusion", "leverage", "robust" |

### Pillar 3: Anti-AI Formatting Tells
- **No Em-Dash (—) Addiction:** Do not pepper every paragraph with em-dashes. Use simple commas, periods, or parentheses.
- **No Rigid "Rule of Three":** Do not automatically force lists or points into groups of 3. If there are 2 points, write 2; if 4, write 4.
- **Short, Breathable Paragraphs:** 1 to 3 sentences per paragraph maximum. Generous whitespace creates readability on mobile and web.
- **No Generic "Kesimpulan" / "Conclusion" Header:** Conclude naturally with an open thought, a question, or a forward-looking reflection.

### Pillar 4: Authentic Persona & Storytelling (Rifai Martin Voice)
For posts in `rifaimartin.github.io`, match the author's distinctive voice:
- **Perspective:** Junior AI Inference Engineer & IT Middleware developer who is humble, hungry to learn, reflective, and deeply appreciative of mentors and teammates.
- **Tone:** Conversational, warm, thoughtful, blending engineering reality with practical philosophy (Stoicism, mental models, Seneca, problem-solving).
- **Style:** Can use natural Indonesian ("gue / aku" or conversational formal depending on topic), grounded in real experiences (late night debugging, meeting sampai sahur, helping friends code, Kafka analogies, low-latency AI inference).
- **Framework (Fact - Story - Ask):**
  1. **Fact:** Concrete finding, real incident, or specific technical concept.
  2. **Story:** The context, human struggle, or analogy.
  3. **Ask / Reflection:** The lesson learned, takeaway, or practical thought for the reader.

---

## 2. Article Categories for `rifaimartin.github.io`

When writing for this portfolio/blog, categorize the article into one of the established tracks:
- `Engineering Life`: Team sprints, architectural pivots, debugging war stories, dev culture.
- `AI Inference`: vLLM, CUDA, low-latency model serving, token throughput, hardware vs software efficiency.
- `Distributed Systems / Middleware`: Kafka event streaming, BI-FAST/QRIS switching, K8s microservices, latency reduction.
- `Mental Models`: Applying system architecture concepts to everyday thinking (e.g., Kafka pub/sub for the brain).
- `Philosophy`: Reflections on time, Seneca, focus, handling pressure, self-improvement, stoicism.
- `Personal Reflections`: Milestones, gratitude, learning from mentors, mentoring peers.

---

## 3. Workflow: Adding a Post to `rifaimartin.github.io`

When requested to add or update an article in `rifaimartin.github.io`:

1. **Locate Target File:**
   `src/data/profileData.js` -> `profileData.articles` array.

2. **Article Data Schema:**
   ```javascript
   {
     id: "kebab-case-unique-slug",
     title: "Judul yang Menarik, Natural, dan Tidak Kaku",
     category: "Engineering Life", // or Philosophy, AI Inference, etc.
     readTime: "3 min read",
     date: "05 Okt 2026", // format: DD MMM YYYY
     desc: "1-2 kalimat ringkasan pemantik rasa penasaran tanpa kata klise.",
     tags: ["Tag1", "Tag2", "Tag3"],
     content: `Paragraf pertama langsung to the point atau bercerita.

   Paragraf kedua memperdalam konteks atau memberikan analogi nyata.

   Paragraf ketiga memberikan insight atau takeaway yang bisa direnungkan.`
   }
   ```

3. **Placement:**
   Add new articles to the **top** of the `articles` array (so the newest post appears first).

4. **Verification & Build:**
   Run `npm run build` or inspect `src/data/profileData.js` to ensure valid JavaScript syntax without breaking existing objects.

---

## 4. Standalone Blog / Markdown Workflow

If the user wants a standalone blog post (e.g., for Medium, Substack, Dev.to, or Markdown):
1. Provide standard frontmatter (`title`, `date`, `tags`, `description`).
2. Write using Markdown with H2 (`##`) and H3 (`###`) subheaders that sound conversational (e.g., `## Kenapa Cara Lama Nggak Lagi Relevan` instead of `## Analisis Masalah`).
3. Follow the 90/10 Polish rule: Highlight 1-2 places where the user can plug in their specific personal story or real numbers.
