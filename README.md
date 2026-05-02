# Goose Policies

Static policy site for the Goose Discord bot. It is designed to be published directly with GitHub Pages.

## Pages

- `/terms/` - Terms of Service
- `/privacy/` - Privacy Policy

## GitHub Pages

### Option 1: Deploy from branch

1. Push this repository to GitHub.
2. Open the repository settings.
3. Go to **Pages**.
4. Set **Source** to `Deploy from a branch`.
5. Select the branch, usually `main`, and the root folder `/`.

### Option 2: Deploy with GitHub Actions

This repo also includes `.github/workflows/pages.yml`. In the repository's **Pages** settings, set **Source** to
`GitHub Actions`. The workflow publishes the static files from the repository root whenever `main` is updated.

After GitHub Pages publishes, use these URLs in the Discord Developer Portal:

- Terms of Service URL: `https://<username>.github.io/<repo>/terms/`
- Privacy Policy URL: `https://<username>.github.io/<repo>/privacy/`

## Local Preview

This is a no-build site. Open `index.html` directly, or run a simple local server from this folder:

```sh
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.
