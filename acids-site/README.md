# DSE Topic IV: Acids and Bases

This self-study unit is separate from the existing F3 chapters. It follows the
user-supplied Supplementary Note (2018), printed I16–I17: 36 outcomes in six
curriculum strands, arranged into seven learning units, 23 core lessons and two
extended lessons. The EDB curriculum-document page was checked on 2026-10-11;
it still lists the Chemistry guide with June 2018 updates. A consultation draft
is not substituted for the user's chosen curriculum.

## Source and editorial decisions

- `Chem_ELECLC_Notes_T4 Acid.pdf`: 79 scanned PDF pages, inspected page by page.
  Printed page = PDF page − 1. The 96 question records include subparts; this is
  not a claim that there are exactly 96 individual answer blanks.
- `Supplementory_note_for_Chem_20180818_Eng.pdf`: PDF pages 17–18, printed
  I16–I17. `curriculum.js` preserves the English learning outcomes and provides
  Traditional Chinese teaching translations. Outcomes describe scope, not
  student completion or demonstrated practical competence.
- Solutions are attached to their questions, not counted again. Original
  diagrams are redrawn in SVG and labelled as schematics.
- `questions.js` maps source questions to outcomes; `questions-supplement.js`
  supplies a foundation/application pair for each outcome not fully assessed
  by the originals. There are 50 supplementary records.
- Source corrections are explained in the associated notes/answers: sparingly
  soluble Ca(OH)2 is a strong base; insoluble products do not prohibit a net
  ionic equation; ammonia precipitation retains NH3/H2O; Ag2O replaces unstable
  AgOH; pH of Mg(OH)2 cannot be uniquely calculated from “very slightly soluble”;
  the carbonate MCQ on PDF 49 has an ambiguity; rinse skin splashes with running
  water rather than neutralising on skin; 2c for H2SO4 needs an explicit complete
  ionisation assumption.

## Interaction

Questions always precede independently expandable hints, steps and answers.
There is no scoring, correctness feedback, checklist, account or answer upload.
An in-memory map keeps answers during language changes, question pagination and
navigation in this tab; a reload clears answers. Language is in the URL.
Question deep links use `?question=<id>#question-<id>`, including paginated and
extended groups. Formulae use Unicode charges/subscripts and literal text.

## Build and verification

- `npm run check`: existing course checks plus content/provenance/coverage checks.
- `npm run build:github`: course hub includes a separate DSE entry; generator
  creates `/acids-and-bases/`, `/revision/` and `/sessions/<id>/`.
- Sites/dev builds generate the same unit in ignored `public/acids-and-bases/`.
- `node scripts/check-acids-site.mjs --built`: static-route and cache-version check.
- Browser QA: all 25 direct lesson routes in both languages at desktop size;
  all 25 at 390px; input/reveal retention through language change; keyboard
  answer disclosure and mobile Escape/focus restoration; hidden-menu inert
  attribute; filtered index; deep links to core and paginated extended questions.
  Tables and diagrams scroll within their own containers on small screens.

Source content lives in `acids-site/`; generated copies must not be edited.
