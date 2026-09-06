# CHEM Basics / CHEM 初探

A beginner-friendly, bilingual Form 3 chemistry classroom. Switch between Traditional Chinese and English without leaving the current lesson.

## Learn

- Common elements, photos and everyday uses
- A complete 118-element periodic table with the 20 notes elements highlighted
- Chemical formulae and rotatable 3D particle models
- Pure substances, elements, compounds and mixtures
- Physical and chemical properties and changes
- Teacher-led experiment explanations, safety, revision and quizzes

The models are simplified teaching diagrams. Colours, distances and arrangement are not exact representations. Real experiments require teacher supervision.

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

`build` produces the existing Sites deployment. `build:github` builds the same classroom as a static website in `github-dist/`, with relative asset paths for GitHub Pages. It needs no server, account, API key or database.

## GitHub Pages

The included `.github/workflows/pages.yml` publishes after a push to `main`. Repository Settings → Pages → Source should be **GitHub Actions**.

Direct links can include `?lang=en#elements` or `?lang=zh#formula`. Language is remembered only in the current browser. No student accounts or analytics are used.

## Material and image credits

Teaching scope is adapted from the supplied *2324 S3 Introducing Chemistry student*, Unit 1. The original PDF is not included. Wording and diagrams are rewritten for beginners.

Photo creators, source links and individual licences are listed in `app/photos.json` and inside the website. Wikimedia Commons GHS pictograms are public domain. Keep these attributions when reusing the site. The periodic table's factual references are in `app/periodic-sources.json`; its primary reference is [IUPAC](https://iupac.org/what-we-do/periodic-table-of-elements/).

Third-party photographs keep their stated licences. Dependencies and bundled UI components retain their upstream licences.
