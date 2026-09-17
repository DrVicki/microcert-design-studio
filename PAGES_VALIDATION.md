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
