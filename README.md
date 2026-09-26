# CHEM Basics / CHEM 初探

A beginner-friendly, bilingual Form 3 chemistry classroom. Switch between Traditional Chinese and English without leaving the current lesson.

## Learn

- Common elements, photos and everyday uses
- A complete 118-element periodic table with the 20 notes elements highlighted
- Chemical formulae and rotatable 3D particle models
- Pure substances, elements, compounds and mixtures
- Physical and chemical properties and changes
- Teacher-led experiment explanations, safety, revision and quizzes

## Atomic Structure website

The Atomic Structure notes are published as a separate, bilingual website at `/atomic-structure/`. The home page is a lesson directory; each of the eight note topics (2.1–2.8) has its own page under `/atomic-structure/sessions/`, with three multiple-choice questions. Session pages include previous/next links and an interactive electron-shell model for the first 20 elements. The source PDF is not included in the published files.

The models are simplified teaching diagrams. Colours, distances and arrangement are not exact representations. Real experiments require teacher supervision.

## Periodic Table website

The Unit 3 notes are published as a separate, bilingual website at `/periodic-table/`. Its seven pages follow sections 3.1–3.7 under `/periodic-table/sessions/`, each with three multiple-choice checkpoints. Students can inspect the first 36 elements, compare electron shells, and explore illustrated group trends and reaction observations. The supplied Unit 3 PDF is not included in the published files.

Unit 3 electron diagrams pair dots after the fourth electron in a shell. Groups I and II include rotatable 3D reaction observations with playback and a progress slider; Group VII shows diatomic molecules in different states, while Group 0 shows separate atoms alongside full electron shells. Models use projected 3D geometry without external libraries, support touch and keyboard controls, and respect reduced-motion preferences. Reaction times are illustrative, not experimental measurements.

## Run locally

Requires Node.js 22.13 or later and npm.

```sh
npm ci
npm run dev
```

## Verify and build

```sh
npm run check
npm run build
npm run build:github
```

`build` produces the existing Sites deployment. `build:github` builds the existing classroom and copies the Atomic Structure and Periodic Table websites to `github-dist/`, including one generated route for each session. It needs no server, account, API key or database.

## GitHub Pages

The included `.github/workflows/pages.yml` publishes after a push to `main`. Repository Settings → Pages → Source should be **GitHub Actions**.

Direct links to Atomic Structure lessons use `/atomic-structure/sessions/earth/` through `/atomic-structure/sessions/shells/`; Periodic Table lessons use `/periodic-table/sessions/map/` through `/periodic-table/sessions/noble/`. Add `?lang=en` or `?lang=zh` to select a language. The main CHEM site also supports links such as `?lang=en#elements` or `?lang=zh#formula`. Language is remembered only in the current browser. No student accounts or analytics are used.

## Material and image credits

Teaching scope is adapted from the supplied *2324 S3 Introducing Chemistry student*, Unit 1. The original PDF is not included. Wording and diagrams are rewritten for beginners.

Photo creators, source links and individual licences are listed in `app/photos.json` and inside the website. Wikimedia Commons GHS pictograms are public domain. Keep these attributions when reusing the site. The periodic table's factual references are in `app/periodic-sources.json`; its primary reference is [IUPAC](https://iupac.org/what-we-do/periodic-table-of-elements/).

Third-party photographs keep their stated licences. Dependencies and bundled UI components retain their upstream licences.
