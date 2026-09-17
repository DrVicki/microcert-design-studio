# Visual Direction: Micro-Certification Design Studio

## Concepts considered

| Direction | Visual language | Strength | Tradeoff |
| --- | --- | --- | --- |
| **Curriculum Fieldbook** | Midnight navy worktable, warm paper, gold proof marks, blueprint grids, numbered evidence tabs, editorial serif headlines | Makes design work feel tangible, rigorous, and submission-oriented | Requires disciplined spacing so the layered surfaces do not become visually dense |
| **Credential Foundry** | Dark industrial surfaces, bright status lights, modular components, stamped metal badge forms | Makes iteration and construction feel energetic | Can overstate technical production and underplay academic judgment |
| **Learning Observatory** | White space, data plots, survey traces, orbital competency maps, glass panels | Strong for learner evidence and evaluation | Risks feeling like an analytics product rather than a design studio |

## Selected system

The project uses **Curriculum Fieldbook**. The course should feel like a working dossier rather than a generic LMS dashboard. The primary surface is warm parchment with deep midnight navy framing; university gold is reserved for evidence, milestones, and earned completion. Electric cobalt is used sparingly for process cues and active focus. The palette is inspired by higher-education design conventions but does not reproduce or claim to be an official DeVry brand system.

Typography pairs **Fraunces** for editorial display copy with **Manrope** for interface and reading text and **IBM Plex Mono** for labels, timestamps, and evidence annotations. Layouts use asymmetric grids, generous margins, ruled section dividers, corner registration marks, and modest paper shadows. Rounded cards are limited; most content sits in squared dossier panels with clipped corners or notebook rules.

## Interaction model

The experience blends three patterns from the supplied outline. The landing page and toolkit use an **accordion-like fieldbook** for review and revisiting. The lesson path uses a **guided wizard** with visible sequence, progress, prerequisites, and previous/next controls. All working fields are **mobile-first** and save in the current browser so a learner can resume.

## Asset system

A custom text-free hero plate establishes the fieldbook metaphor. Four coordinated module plates provide a visual signature for Research, Architect, Prototype, and Refine/Evaluate. Reusable process visualizations are implemented as standalone React components in a separate gallery so they can be adapted for manual LMS integration without being embedded inside lesson copy.

## Accessibility constraints

All body copy must meet WCAG AA contrast; focus indicators remain visible; controls have explicit labels; motion respects reduced-motion preferences; completion is never communicated by color alone; and the desktop rail collapses into a linear mobile sequence without hiding prerequisites.
