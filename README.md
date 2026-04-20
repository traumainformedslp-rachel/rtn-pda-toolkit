# The Autonomy-First Toolkit

**PDA-Profile Intervention Planner for SLPs, Educators, and Clinicians**

An interactive, evidence-informed web tool for planning and documenting intervention sessions with students who present a Pathological Demand Avoidance (PDA) / Pervasive Drive for Autonomy profile. Built around declarative language, collaborative problem-solving, executive function scaffolding, and interoception — entirely in the browser, with no data transmitted or stored.

**Created by Rachel Terra Norton, MS, CCC-SLP**
[RTN Communication & Literacy](https://rachelslp.org)

---

## Features

- **Student Profile** — de-identified intake capturing strengths, interests, triggers, and IEP goals
- **Six 30-minute Session Plans** with fillable notes, response options, and declarative language swaps:
  1. The Expert Within — Strengths-based self-awareness
  2. The Flexibility Lab — Cognitive flexibility, Plan A/Plan B thinking
  3. The Co-Pilot Protocol — Collaborative negotiation with adults
  4. The Social Detective Agency — Situational awareness without masking
  5. The Body Scientist — Interoception and self-regulation
  6. Mission Control Center — Generalization and self-advocacy
- **Activity Bank** — 10+ modular mini-activities for flexible session building
- **Declarative Language Reference** — printable imperative→declarative swap sheet
- **Staff Guide** — one-page handout generator for classroom teams
- **Evidence base** — embedded citations, a references tab, and an About modal explaining the frameworks behind each session
- **Light / dark theme** with print-friendly layout
- **JSON export** — structured session data for your records (FERPA/HIPAA-compliant handling is the clinician's responsibility)
- **No data transmitted** — everything stays in the browser

## Evidence Base

This toolkit synthesizes several converging, peer-reviewed and practice-based frameworks:

- **PDA profile** — Newson (2003); O'Nions et al. (2014, 2018); Eaton (2018); PDA Society practice guidance (UK)
- **Declarative Language** — Murphy (2020), *Declarative Language Handbook*
- **Collaborative & Proactive Solutions (CPS / "Plan B")** — Greene (2014, 2021); Lives in the Balance
- **Unstuck & On Target! (executive function curriculum)** — Cannon, Kenworthy, Alexander, Werner, & Anthony (2011); Kenworthy et al. (2014) RCT in *JCPP*
- **Interoception** — Mahler (2019, 2022); Mahler et al. (2022, 2024)
- **Polyvagal Theory / Nervous System Framing** — Porges (2011); Siegel (2012)
- **Neurodiversity-affirming practice** — Milton (2012) on the Double Empathy Problem; Chapman & Botha (2023)
- **Strengths-based, autonomy-supportive practice** — Deci & Ryan (2000) Self-Determination Theory

> **Not a diagnostic instrument.** This tool supports reflective planning by qualified professionals. It is not a substitute for formal assessment, clinical judgment, or individualized treatment planning.

## Getting Started

### Option 1 — Run locally with Vite + React

```bash
git clone https://github.com/YOUR_USERNAME/rtn-pda-toolkit.git
cd rtn-pda-toolkit
npm install
npm run dev
```

### Option 2 — Static deployment

```bash
npm run build
```

The `dist/` folder can be hosted on any static server (GitHub Pages, Netlify, Vercel, etc.) with no backend required.

## Project Structure

```
rtn-pda-toolkit/
├── LICENSE              MIT License
├── README.md            This file
├── PRIVACY.md           Privacy notice for clinicians and families
├── index.html           HTML entry point
├── package.json         Node.js project configuration
├── vite.config.js       Vite build configuration
└── src/
    ├── App.jsx          Main application component
    └── main.jsx         React entry point
```

## Intended Use

- **For**: Speech-language pathologists, special educators, school psychologists, occupational therapists, counselors, behavior specialists, and trained interventionists working with students who present PDA/autonomy-driven profiles
- **With**: Students ages ~6–18 (most activities scale; language adjusts for developmental level)
- **Setting**: Push-in, pull-out, clinical, telehealth, home, and consultative service models
- **Not for**: Unsupervised use by students, diagnostic purposes, or as a substitute for individualized IEP development

## Language Note

PDA is a contested label. This toolkit uses "PDA profile" or "Pervasive Drive for Autonomy profile" and frames demand avoidance as a **nervous system response to perceived loss of autonomy**, not willful defiance. The goal throughout is *negotiation and self-advocacy*, not compliance.

## License

Code is licensed under the [MIT License](LICENSE). Educational content is shared under CC BY-NC 4.0 — attribution appreciated, non-commercial use welcome.

## Acknowledgments

- Built with [React](https://react.dev) + [Vite](https://vitejs.dev)
- Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces), [Outfit](https://fonts.google.com/specimen/Outfit), [Space Mono](https://fonts.google.com/specimen/Space+Mono) (SIL Open Font License)
- No third-party analytics, tracking, or data-collection libraries are used

## Contact

**Rachel Terra Norton, MS, CCC-SLP**
RTN Communication & Literacy
[rachelslp.org](https://rachelslp.org)
