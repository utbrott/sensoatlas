# SensoAtlas ![GitHub package.json version](https://img.shields.io/github/package-json/v/utbrott/sensolab?style=flat-square)

Web application created for Sensors and Transducers laboratory
@ WUT Warsaw University of Technology

## Features

- Four sensors (RTD, Thermocouple, LVDT, Strain gauge) available
- Tasks with randomized data generated for them
- Downloadable sensor's characteristic charts for each of the sensors

## Built with

- [Next.js](https://nextjs.org/) & [Typescript](https://www.typescriptlang.org/)
- [Chakra UI](https://chakra-ui.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Latex](https://github.com/zzish/react-latex)
- [Recharts](https://recharts.org/en-US/)

## How to setup your own dev server

1. Install [Node.js](https://nodejs.org/en/) & [Yarn](https://nodejs.org/en/) (if Yarn is preferred to npm)
2. Git is required to clone the repo (although source code can be downloaded via .zip)
3. Navigate to the directory with the source code
4. In the main folder (if not renamed - **sensoatlas**) run in the console:

With npm:

```
npm install
```

With yarn

```
yarn
```

This will install all the dependencies required by the project

5. To start the dev server use:

With npm

```
npm run dev
```

With yarn

```
yarn dev
```

This will open a dev server on localhost:3000, if not configured differently

_Preferably: Delete the hidden .git and init your own repo_

## License:

MIT
