# Simple Extension Analyser <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [About](#about)
  - [Packages Used](#packages-used)
- [Deployment](#deployment)
  - [GitHub Pages](#github-pages)

## About

This is a simple extension analyser that allows you to upload an extension and get some basic information about it. It was primarily built as a learning project to get familiar with React. Although this kind of project would work better as a CLI tool / REST API, I wanted to experiment with the limits of the browser.

### Packages Used

- `react` + `typescript`: building the user interface.
- `vite`: building and bundling the application.
- `zip.js`: unzipping the extension files and reading the contents of the files.
- `lowlight.js`: syntax highlighting the files found in the extension.

## Deployment

### GitHub Pages

This project is hosted on github pages. The deployment is done using a deployment script that can be found at `.github/workflows/github-pages-deployment.yaml`, built off of the main branch. Due to the nature of the deployment, there are some pieces that would need to be removed if a future deployment is to be done:

1. Removal of the `homepage` field in `package.json`.
2. Removal of the `base` field in `vite.config.js`.
3. Changing the `HashRouter` to `BrowserRouter` in `webapp/src/app/router.tsx`. This was necessary to get the routing to work properly in the github pages deployment.
