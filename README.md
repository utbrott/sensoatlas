> **Note** This is (soon to be) archival version of SensoAtlas, versioned as
> 0.1.1, before a complete rebuild from ground up, using modified tech-stack.
> All the development of the modified version, versioned as 0.2.0 can be found
> under dedicated branch

<div align="center">

<p align="center">
  <a href="https://sensoatlas.vercel.app/" target="_blank">
    <img src="./.github/logo-github.svg" alt="SensoAtlas" height="56">
  </a>
</p>

<p align="center">
<h3>
  Web app designed and built to assist in learning about various sensors and
  transducers with simple workflow.
</h3>
</p>

<br>

<p align="center">
<img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=nextdotjs">
<img src="https://img.shields.io/badge/typescript-blue?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">

<img src="https://img.shields.io/badge/Work%20In%20Progress-orange?style=for-the-badge">
</p>
</div>

## Table of Contents

- [Features](#features)
- [Libraries](#libraries)
- [Setup and Configuration](#setup-configuration)

## Features<a name="features"></a>

- 10 different laboratories available
  - 2 for temperature sensors: RTD, Thermocouples,
  - 1 for displacment sensors: LVDT,
  - 1 for strain sensors: Strain gauges,
  - 2 for magnetoresistance measurement: AMR sensors, Hall effect sensors
  - 2 for piezoelectric sensors: piezoelectric cable, accelerometer,
  - 2 for generic transducers: 4-20mA measurement loop, pressure sensors.
- Each laboratory can be configured, each laboratory can be unique - random data
  generation,
- Downloadable characteristic charts.

## Libraries used<a name="libraries"></a>

- Built using [Next.js](https://nextjs.org) and [Tailwind
  CSS](https://tailwindcss.com),
- Icons from [Tabler icons](https://tabler-icons.io),
  [Heroicons](https://heroicons.com/),
- Equations with [React Latex](https://github.com/zzish/react-latex) and
  [Katex](https://katex.org/),
- Charts generation via [Recharts](https://recharts.org).

SensoAtlas uses `pnpm` by default (fast alternative to `npm`). It's not required
to start with the project, but it's highly recommended. You can get it here:
https://pnpm.io/

SensoAtlas uses `pnpm` by default (fast alternative to `npm`). It's not required
to start with the project, but it's highly recommended. You can get it here:
https://pnpm.io/

### Install required dependencies:

```shell
pnpm install
```

### Start development server

```shell
pnpm dev
```

Server should be available at http://localhost:3000, if the post is available (check logs in terminal for port that server uses)

## License:

(MIT) Faculty of Electrical Engineering, WUT Warsaw University of Technology
