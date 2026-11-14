# MatandaDesign portfolio

A lightweight, responsive portfolio for MatandaDesign, a graphic design practice based in Kampala, Uganda. It uses plain HTML, CSS and vanilla JavaScript, with project content managed in one data file.

**Live URL:** https://matandamabomba-design.github.io/graphic-design-portfolio/

## Run locally

Open `index.html` in a browser, or use the VS Code Live Server extension. The site does not require a build step or npm.

## Add or hide a project

1. Edit `assets/js/site-data.js` and add a project object to `SITE_DATA.projects`. Use a unique `id`, and set `category` to one of the values in `SITE_DATA.categories`.
2. Add the image using the exact path in the project object. See `assets/images/README.md` for the supplied filenames.
3. Add a `caseStudy` object if the project should have a case-study page. Set `visible: false` to hide a project without deleting its data.

## Images

Use your own work and ensure you have permission to show client work. Before committing, compress photographs and artwork (JPG around 1600 px on the long edge, quality 80, under 400 KB where possible; PNG logos under 150 KB). Add the logo, optional portrait and social sharing image under `assets/images/brand/` using the exact names listed in `assets/images/README.md`.

## Publish with GitHub Pages

Push the `main` branch to the `graphic-design-portfolio` repository. In GitHub, open **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, select branch **main** and folder **/(root)**, then save. GitHub Pages may take a few minutes to publish.
