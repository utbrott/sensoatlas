<div align="center">

<h1>SensoAtlas</h1>
<h5>
Web application created for Sensors and Transducers laboratory <br />
Built in mind with simplyfing remote studying
</h5>
<h6>WUT Warsaw University of Technology</h6>

[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Chakra UI](https://img.shields.io/badge/chakra%20ui-319795?style=for-the-badge&logo=chakraui&logoColor=white)](https://chakra-ui.com)
![Work In Progress](https://img.shields.io/badge/Work%20In%20Progress-orange?style=for-the-badge)

</div>

## Table of Contents

- [Features](#features)
- [Libraries](#libraries)
- [Setup and Configuration](#setup-configuration)

## Features<a name="features"></a>

- Four sensors (RTD, Thermocouple, LVDT, Strain gauge) available
- Tasks with randomized data generated for them
- Downloadable sensor's characteristic charts for each of the sensors

## Libraries used<a name="libraries"></a>

Project was built using:

- [Chakra UI](https://chakra-ui.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Latex](https://github.com/zzish/react-latex)
- [Recharts](https://recharts.org/en-US/)

## Setup and Configuration for development

### Requirements

- [**Node**](https://nodejs.org/en)
- Package manager for Node (NPM, Yarn, PNPM)
- Git

### Setup

#### Clone the repo:

```shell
git clone https://github.com/utbrott/sensoatlas
```

<h6>Remove hidden .git folder if you want to make the project your own</h6>

#### Install dependencies

Using NPM:

```shell
npm install
```

Using Yarn:

```shell
yarn
```

#### Run dev server

Using NPM:

```shell
npm run dev
```

Using Yarn:

```shell
yarn dev
```

This will start a development server at port 3000 (`http://localhost:3000`, if the configuration wasn't changed)

## License:

MIT
