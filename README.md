# Simple Extension Analyser <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [About](#about)
  - [Webapp](#webapp)
  - [Analyser](#analyser)
- [Deployment](#deployment)
  - [Local Deployment](#local-deployment)
  - [GitHub Pages](#github-pages)
  - [Future Hosting](#future-hosting)

## About

This is a simple extension analyser that allows you to upload an extension and get some basic information about it. It was primarily built as a learning project to get familiar with React. Although this kind of project would work better as a CLI tool / REST API, I wanted to experiment with the limits of the browser.

### Webapp

The webapp is built using React and Vite. The webapp is responsible for the user interface and the interaction with the analyser.

The following packages were utilised:

- `react` + `typescript`: building the user interface.
- `vite`: building and bundling the application.
- `tailwindcss`: styling the application.
- `zip.js`: unzipping the extension files and reading the contents of the files.
- `lowlight.js`: syntax highlighting the files found in the extension.

### Analyser

The actual extension analyser is built in Rust and compiled to WebAssembly. The Rust code is responsible for unzipping the extension files and reading the contents of the files.

## Deployment

### Local Deployment

To run this project locally, initially the rust wasm module will need to be built. Initially, ensure that the rust toolchain is installed.

This can be done by running the following command:

```bash
# install wasm-pack
cargo install wasm-pack

# install the rust wasm module
cd analyser

# build the rust wasm module
wasm-pack build --target web

# create the lib directory
mkdir -p ../webapp/src/features/analyser/lib

# move the built module to the webapp directory
mv pkg ../webapp/src/features/analyser/lib/analyser
```

Then, to run the webapp, run the following commands:

```bash
# install the dependencies
cd webapp
npm install

# run the webapp
npm run dev
```

### GitHub Pages

This project is hosted on github pages. The deployment is done using a deployment script that can be found at `.github/workflows/github-pages-deployment.yaml`, built off of the main branch.

### Future Hosting

Due to the nature of the GitHub pages deployment, there are some pieces that could be removed/replaced if a future hosted deployment is to be done:

1. Removal of the `homepage` field in `package.json`.
2. Removal of the `base` field in `vite.config.js`.
3. Removing the `history` parameter in `webapp/src/app.tsx`. This was necessary to get the routing to work properly in the github pages deployment.
