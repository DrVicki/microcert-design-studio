# GitHub Pages Publishing Guide

## Publishing target

The repository is **[DrVicki/microcert-design-studio](https://github.com/DrVicki/microcert-design-studio)**. The static companion is prepared for branch-based GitHub Pages publishing from the `main` branch and `/docs` folder.

The expected project-site address is:

> **https://drvicki.github.io/microcert-design-studio/**

The interactive, database-backed course remains available at:

> **https://microcertds-vvhxhqkn.manus.space/**

## Architecture boundary

GitHub Pages hosts only the public course companion: course purpose, instructor profile, curriculum, lesson objectives, applied activities, deliverables, public references, and links to the live application. The live application retains registration records, authentication, the administrator dashboard, sequential lesson progress, knowledge checks, notebook entries, proposal exports, and completion certificates.

No participant names, email addresses, progress, notebook entries, proposal content, or certificates are stored in the `/docs` package.

## Active GitHub Pages setting

GitHub Pages is enabled with the following branch-based configuration:

1. **Build and deployment:** Deploy from a branch
2. **Branch:** `main`
3. **Folder:** `/docs`
4. **HTTPS:** Required on the default `github.io` domain

The site was published and verified at **https://drvicki.github.io/microcert-design-studio/**. This package intentionally does not add a GitHub Actions workflow. Branch-based `/docs` publishing avoids workflow-permission failures and does not require a build action. Future pushes to `main` that change `/docs` will trigger a Pages rebuild automatically.

## Validation

Run the following before any future Pages update:

```bash
pnpm pages:check
pnpm test
git diff --check
```

The Pages validation checks required files, relative assets, live-course linking, four-studio and twelve-lesson alignment, the first and last studios, the final lesson, and this deployment guide’s repository and source settings.
