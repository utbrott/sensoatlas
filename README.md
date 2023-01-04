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

- Four sensors (RTD, Thermocouple, LVDT, Strain gauge) available (+6 more being added)
- Tasks with randomized data generated for them
- Downloadable sensor's characteristic charts for each of the sensors

## Libraries used<a name="libraries"></a>

- Built using [Next.js](https://nextjs.org) and [Chakra UI](https://chakra-ui.com)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Equations with [React Latex](https://github.com/zzish/react-latex) and [Katex](https://katex.org/)
- Charts generation via [Recharts](https://recharts.org)

## Setup and Configuration for development<a name="setup-configuration">

SensoAtlas uses `pnpm` by default (fast alternative to `npm`). It's not required
to start with the project, but it's highly recommended. You can get it here:
https://pnpm.io/

### Install required dependencies (with pnpm):
```shell
pnpm install
```

### Start development server (with pnpm)
```shell
pnpm dev
```
Server should be available at http://localhost:3000, if the post is available (check logs in terminal for port that server uses)


## License:

(MIT) Faculty of Electrical Engineering, WUT Warsaw University of Technology