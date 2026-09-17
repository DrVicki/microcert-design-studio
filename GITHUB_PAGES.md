# Static Companion and GitHub Pages Status

## Current status: disconnected

GitHub Pages is **disabled** for [DrVicki/microcert-design-studio](https://github.com/DrVicki/microcert-design-studio). The Pages publication source is set to **None**, so the repository does not currently publish a `github.io` website and future changes to `/docs` will not trigger a Pages deployment.

The reusable static companion remains in `/docs` for source control and future use. It contains no participant records, authentication data, notebook entries, progress, proposal content, or certificates. There is no `docs/CNAME` file and no custom domain is configured.

## Registration link

The static companion’s **Register for the Fieldbook** buttons are configured to open this Microsoft Forms registration page:

> https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=nMl5-atR9k-G4DX9KHR4j1ZKtZhzxkxJvP6Hwc2NI75UMU5TRDBITlREOTZEOUZQWEZWMjRUWjZZMi4u

Other calls to action, such as **Open live Fieldbook**, continue to open the database-backed course application:

> https://microcertds-vvhxhqkn.manus.space/

## Optional future reconnection

If GitHub Pages is needed again, open **Repository Settings → Pages**, choose **Deploy from a branch**, select branch **`main`** and folder **`/docs`**, then save. Leave the source as **None** while the Pages setup should remain disconnected.

A custom domain should not be added until Pages is intentionally re-enabled and the domain’s DNS records are ready. The previously discussed `www.micro-cert-fieldbook.org` hostname was not configured, and the misspelled `www.mocro-cert-fieldbook.org` hostname is not present in the repository.

## Validation

Run these checks before any future static-companion update:

```bash
pnpm pages:check
pnpm test
git diff --check
```

The validation script checks required static files, relative assets, four-studio and twelve-lesson curriculum alignment, registration and live-course destinations, and the absence of an active `CNAME` file.
