| [Home](README.md) | [ภาษาไทย กด](docs/README-th.md) |

# FINA
### Fabulous and Interactive Numerical Analysis Calculator

## Project setup
Install firebase CLI tools
```
npm i -g firebase-tools
firebase login
```
Install project's dependencies
```
npm install
```
from the root of the project. If the above command did not succeed, try
```
npm install --legacy-peer-deps
```

## Getting started
Run these commands to start developing from the root directory.

| Terminal 1                  | Terminal 2                  | Terminal 3      |
| --------------------------- | --------------------------- | --------------- |
| `npm run serve:common`      | `npm run serve:functions`   | `npm run serve` |

The web application will pop up at `http://localhost:8080` and the API will pop up at `http://localhost:3000`

## Tech stack
In FINA, we use
- [Vuejs](https://vuejs.org/) to manage our frontend application.
- [Buefy](https://buefy.org/) to manage our frontend application's stylings.
- [mathjs](https://mathjs.org/) to manipulate and calculate expression strings.
- [d3](https://d3js.org/) to create beautiful graph representations.
- [ESLint](https://eslint.org/) to keep our TypeScript stylings constant throughout the project.
- [Stylelint](https://stylelint.io/) to keep our SCSS stylings constant throughout the project.
- [Vue Katex](https://github.com/lucpotage/vue-katex#readme) to render mathmatical expressions.
- [Fastify](https://fastify.io/) to manage our backend API.

Our main language of development is [TypeScript](https://www.typescriptlang.org/)

## Long term goals

### Grapher component
- [ ] Provides support for graphing incontinuous graph like $ f(x) = \frac{1}{x} $
- [ ] Provides better graph scaling. Currently it's not very consistent when you are plotting high frequency graph.

### Frontend
- [ ] **Adds second semester's topics.**
  - [ ] Gauss Seidel.
  - [ ] Jacobi.
  - [ ] Newton's Divided Difference
  - [ ] Newton's Forward Difference
  - [ ] Newton's Backward Difference
  - [ ] Lagrange Polynomial
  - [ ] Regression Equation
  - [ ] Trapezoidal Rule
  - [ ] Simpson's 1/3 Rule
  - [ ] Simpson's 3/8 Rule
  - [ ] Romberg
  - [ ] Euler
- [ ] Provides consistent error message that have meanings.
- [ ] Implements refresh-proven form input, or store user inputs in cookie.
- [ ] Implements membership system.
- [ ] Provides [i18n](https://en.wikipedia.org/wiki/Internationalization_and_localization) support for multiple languages website using [vue-i18n](https://kazupon.github.io/vue-i18n/)
- [ ] Improves page layout and explanations.
- [ ] Deploy the website on Firebase
- [ ] Adds contributors page.
- [ ] Combines answer pages into one.

### Backend
- [ ] Extract redundant `preValidation` hook into separate file or global hooks.
- [ ] Refactor some of controversial `preValidation` hooks.
- [ ] Adds at least Basic auth for calling the API.
- [ ] Host the API in Google Cloud Run.

## Deployments
// TODO: Add deployment notes

## Lints and fixes files
Run
```
npm run lint
```
from the root of the project. it will trigger all the `npm run lint` command in all sub-directories, reporting all the errors it found to you.

Run
```
npm run fix
```
from the root of the project to lint and attempt to fix some errors in all the project.
