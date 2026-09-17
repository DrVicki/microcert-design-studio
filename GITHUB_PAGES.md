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

## One-time GitHub setting

The current GitHub integration can push repository files but received a `403 Resource not accessible by integration` response when reading Pages administration settings. The repository owner must complete this one-time configuration:

1. Open **Repository Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **`main`**.
4. Select folder **`/docs`**.
5. Save and wait for GitHub to publish the site.

This package intentionally does not add a GitHub Actions workflow. Branch-based `/docs` publishing avoids workflow-permission failures and does not require a build action.

## Validation

Run the following before any future Pages update:

```bash
pnpm pages:check
pnpm test
git diff --check
```

The Pages validation checks required files, relative assets, live-course linking, four-studio and twelve-lesson alignment, the first and last studios, the final lesson, and this deployment guide’s repository and source settings.
