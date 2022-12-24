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

- Four sensors (RTD, Thermocouple, LVDT, Strain gauge) available
- Tasks with randomized data generated for them
- Downloadable sensor's characteristic charts for each of the sensors

## Libraries used<a name="libraries"></a>

Project was built using [Next.js](https://nextjs.org) and [TailwindCSS](https://tailwindcss.com). Icons come from [Tabler icons](https://tabler-icons.io), [Heroicons](https://heroicons.com/) or [Octicons](https://primer.style/octicons/).<br>
Embedded math done using [React Latex](https://github.com/zzish/react-latex). Charts generation with [Recharts](https://recharts.org)

## Setup and Configuration for development

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
