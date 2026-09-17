# GitHub Pages Companion Validation

## Static package checks

The `pnpm pages:check` command passed all 20 checks: required Pages files exist, linked assets use project-safe relative paths, the public companion links to the live application, the static/live boundary is explicit, four studios and twelve lessons are aligned, the first and last studio titles and final lesson title match the live course, all studio artwork resolves, and the deployment guide names the exact repository, branch, `/docs` source, and expected Pages URL.

The existing application also passed all eight unit tests, TypeScript checking, production build, and `git diff --check` after the Pages package was added.

## Preview server setup

The first temporary preview attempt failed because BusyBox is not installed. The Vite preview then started but initially blocked the sandbox public host. This is a local preview configuration issue rather than a Pages asset issue; the preview server will be restarted with the sandbox hostname explicitly allowed before visual review.

## Desktop preview

After restarting Vite with the sandbox host allowed, the public companion loaded successfully with its title, relative artwork, sticky navigation, hero, course metrics, instructor profile, all four module studios, twelve lessons, deliverables, external sources, and live-application links. The desktop page had no obvious horizontal overflow or missing images. The final module summary was activated; a direct DOM-state check will confirm the details element changed state because the viewport capture did not display its expanded lesson region.

The rendered DOM contains twelve lesson cards and five live-application links, all resolving to `https://microcertds-vvhxhqkn.manus.space/`. The portrait and signature loaded at their expected intrinsic dimensions, and the page reported no horizontal overflow. Native `<details>` behavior was verified by expanding Module Studio 4; Lessons 10–12 appeared immediately beneath the module summary with objectives, activities, and notebook deliverables.

## Mobile preview

A 390 × 844 Chromium capture confirmed the mobile header, MC monogram, menu trigger, live-Fieldbook action, responsive hero artwork, large editorial title, descriptive copy, and stacked primary/secondary actions fit without clipping or horizontal overflow. A second headless capture using a `#curriculum` fragment did not wait for script-rendered anchor placement and therefore was not used as visual evidence; curriculum responsiveness remains covered by the CSS breakpoint review and the successful browser-rendered desktop accordion test.

## GitHub publication

Commit `7628fe1` (`Add GitHub Pages course companion`) was pushed to `DrVicki/microcert-design-studio` on `main`. The GitHub API credential could push repository content but returned `403 Resource not accessible by integration` for Pages administration. Using the repository owner’s logged-in browser, GitHub Pages was configured to **Deploy from a branch** with branch **main** and folder **/docs**. GitHub confirmed that the site was being built from that source with HTTPS required on the default domain.

A deterministic HTTP check reached `https://drvicki.github.io/microcert-design-studio/` on the third attempt with status 200 and the expected title, **Micro-Certification Fieldbook | Public Course Companion**.

## Live-site verification

The published address opened successfully in the repository owner’s browser with the expected title and complete visual design. The hero artwork, navigation, course promise, instructor welcome, four studio summaries, first studio’s lesson cards, Proposal Dossier map, static/live boundary, public sources, and final live-course call to action all rendered on the HTTPS GitHub Pages domain. A direct DOM-console audit is unsupported in My Browser, so the live page was validated through its rendered content and screenshot, while the equivalent local package had already passed DOM counts, image loading, link-target, accordion, and overflow checks.

## GitHub Pages disconnection

At the user’s request, the existing GitHub Pages site was unpublished through repository settings. GitHub confirmed that unpublishing removed the currently served site, while also warning that the configured `main` → `/docs` source could rebuild it. The remaining disconnection step is therefore to set the Pages source branch to **None**. The proposed custom-domain file was removed before publication and no `micro-cert-fieldbook.org` or misspelled `mocro-cert-fieldbook.org` reference remains in the repository.

GitHub Pages was then fully disabled by changing the publication source from `main` → `/docs` to **None** and saving. Repository settings now state: **“GitHub Pages is currently disabled.”** This prevents the retained static source files from automatically rebuilding or being served.

## Registration-link update after disconnection

The reusable static companion now separates registration from course access. Both **Register for the Fieldbook** buttons resolve to the user-supplied Microsoft Forms URL, while all `data-live-link` actions continue to resolve to `https://microcertds-vvhxhqkn.manus.space/`. A headless-browser DOM render verified both destinations after JavaScript initialization. The `docs/CNAME` file is absent.

The revised `pnpm pages:check` passed 23 checks, including disabled-domain safeguards and both destination URLs. All eight application tests, TypeScript validation, the full production build, and `git diff --check` also passed.

## Final external verification

After source removal, `https://drvicki.github.io/microcert-design-studio/` returned HTTP 404 on the first check, and the GitHub Pages API returned `404 Not Found` for the repository. Together with the repository-settings confirmation, this verifies that no active GitHub Pages site remains connected.
