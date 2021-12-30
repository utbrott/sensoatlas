import { TheoryItem } from '#types/theory-formula-item';

export const temperatureRtdTheory: TheoryItem[] = [
  {
    caption: '(Task 1) Calculating sensors resistance:',
    formulas: ['$R_t=R(1+\\alpha\\Delta T)$'],
    symbols: [
      '$R$ - Base resistance [$\\,\\Omega\\,$];',
      '$\\alpha$ - Temperature coefficient [-];',
      '$\\Delta T=T-T_{REF}$ - Temperature difference [$\\,^\\circ {C}\\,$];',
      '$T$ - Surroundings temperature [$\\,^\\circ C\\,$] (Given in task)',
      '$T_{REF}$ - Reference temperature (20$^\\circ C$)',
    ],
  },
  {
    caption: '(Task 2) Calculating the time constant:',
    formulas: ['$\\tau=\\cfrac{x}{K}\\cdot\\rho\\cdot l\\cdot C$'],
    symbols: [
      '$x$ — Thickness [mm];',
      '$K$ - Thermal conductivity [$W\\cdot (mK)^{-1}$];',
      '$\\rho$ - Density [$kg\\cdot m^{-3}$];',
      '$l$ - Length (15mm);',
      '$C$ - Heat capacity [$J\\cdot (kg ^\\circ C)^{-1}$];',
    ],
  },
  {
    caption:
      'Time constant for each configuration (calculated with formula above):',
    formulas: [
      '$\\tau_{\\textsf{bare}}=\\tau$',
      '$\\tau_{\\textsf{sheathed}}=\\tau_{\\textsf{bare}}+\\tau_{\\textsf{air}}+\\tau_{\\textsf{case}}$',
      '$\\tau_{\\textsf{thermowell}}=\\tau_{\\textsf{sheathed}}+\\tau_{\\textsf{fill}}+\\tau_{\\textsf{case}}$',
    ],
    symbols: [
      '$x_{\\textsf{bare}}$ = 2mm;',
      '$x_{\\textsf{air}}$ = 0.2mm;',
      '$x_{\\textsf{fill}}$ = 2.5mm;',
      '$x_{\\textsf{case}}$ - sheath, thermowell (selected in configuration);',
    ],
  },
];

export const temperatureCoupleTheory: TheoryItem[] = [
  {
    caption: '(Task 1) Calculating the output voltage from sensor:',
    formulas: ['$V_{\\text{out}}=S_{AB}\\cdot\\Delta T$'],
    symbols: [
      '$S_{AB}$ - Seebecks coefficient [$\\mu V\\cdot K^{-1}$];',
      '$\\Delta T=T_1-T_0$ - Temperature difference [$\\,^\\circ {C}\\,$];',
      '$T_1$ - Medium temperature [$\\,^\\circ C\\,$] (Given in task)',
      '$T_0$ - Reference temperature (selected in configuration)',
    ],
  },
  {
    caption: '(Task 2) Calculating the time constant:',
    formulas: ['$\\tau=\\cfrac{x}{K}\\cdot\\rho\\cdot l\\cdot C$'],
    symbols: [
      '$x$ — Thickness [$\\,\\Omega\\,$];',
      '$K$ - Thermal conductivity [$W\\cdot (mK)^{-1}$];',
      '$\\rho$ - Density [$kg\\cdot m^{-3}$];',
      '$l$ - Length (15mm);',
      '$C$ - Heat capacity [$J\\cdot (kg ^\\circ C)^{-1}$];',
    ],
  },
  {
    caption:
      '(Task 2) Time constant for each configuration (calculated with formula above):',
    formulas: [
      '$\\tau_{\\textsf{bare}}=\\tau$',
      '$\\tau_{\\textsf{sheathed}}=\\tau_{\\textsf{bare}}+\\tau_{\\textsf{air}}+\\tau_{\\textsf{case}}$',
      '$\\tau_{\\textsf{thermowell}}=\\tau_{\\textsf{sheathed}}+\\tau_{\\textsf{fill}}+\\tau_{\\textsf{case}}$',
    ],
    symbols: [
      '$x_{\\textsf{bare}}$ = 1.25mm;',
      '$x_{\\textsf{air}}$ = 0.2mm;',
      '$x_{\\textsf{fill}}$ = 2.5mm;',
      '$x_{\\textsf{case}}$ - sheath, thermowell thickness (selected in configuration);',
    ],
  },
];

export const strainTheory: TheoryItem[] = [
  {
    caption:
      '(Task 1) Calculating resistance change without temperature effect:',
    formulas: ['$\\Delta R=R\\cdot \\varepsilon \\cdot GF$'],
    symbols: [
      '$R$ - Base resistance [$\\,\\Omega\\,$];',
      '$\\varepsilon$ - Applied strain [$\\,\\mu\\varepsilon\\,$] (Given in task);',
      '$GF$ - Gauge factor [-];',
    ],
  },
  {
    caption: '(Task 2) Calculating resistance change with temperature effect:',
    formulas: ['$\\Delta R=R\\cdot \\varepsilon \\cdot GF + \\alpha\\Delta T$'],
    symbols: [
      '$R$ — Base resistance [$\\,\\Omega\\,$];',
      '$\\varepsilon$ - Applied strain [$\\,\\mu\\varepsilon\\,$];',
      '$GF$ - Gauge factor [-];',
      '$\\alpha$ - Temperature coefficient [-];',
      '$\\Delta T=T-T_{REF}$ - Temperature difference [$\\,^\\circ {C}\\,$];',
      '$T$ - Surroundings temperature [$\\,^\\circ C\\,$] (Given in task)',
      '$T_{REF}$ - Reference temperature (20$^\\circ C$)',
    ],
  },
  {
    caption: '(Task 1) Calculating the output voltage in bridge:',
    formulas: [
      '$V_{out}^{Quat} = \\frac{1}{4}V_{in}(\\frac{\\Delta R}{R})$',
      '$V_{out}^{Half}=\\frac{1}{4}V_{in}(\\frac{\\Delta R}{R}-\\frac{(-\\Delta R)}{R})=\\frac{1}{2}V_{in}(\\frac{\\Delta R}{R})$',
      '$V_{out}^{Full}=\\frac{1}{4}V_{in}(\\frac{\\Delta R}{R}-\\frac{(-\\Delta R)}{R}+\\frac{\\Delta R}{R}-\\frac{(-\\Delta R)}{R})=V_{in}(\\frac{\\Delta R}{R})$',
    ],
    symbols: [
      '$V_{in}$ - Input voltage [V];',
      '$\\Delta R$ - Resistance change [$\\,\\Omega\\,$];',
      '$R$ - Base resistance [$\\,\\Omega\\,$];',
    ],
  },
];

export const displacementTheory: TheoryItem[] = [
  {
    caption: '(Task 1) Calculating the output voltage:',
    formulas: [
      '$V_{out}=f(\\cfrac{V_{in}}{R})(4\\pi\\cdot N_p N_s\\cdot \\mu_0\\cdot \\cfrac{bx}{3m\\cdot\\log{(r_{out}/r_{in}})})(1-\\cfrac{x^2}{2b^2})$',
      '$\\rArr V_{out}=f(\\cfrac{V_{in}}{R})(4\\pi\\cdot 0.5 N_p^2\\cdot \\mu_0\\cdot \\cfrac{bx}{3m\\cdot\\log{(r_{out}/r_{in}})})(1-\\cfrac{x^2}{2b^2})$',
    ],
    symbols: [
      '$f$ - Source frequency [$Hz$];',
      '$V_{in}$ - Input voltage [V];',
      '$R=10$ - Resistance [k$\\Omega$];',
      '$Np$ - Number of turns in primary winding;',
      '$Ns=0.5Np$ - Number of turns in secondary windings;',
      '$\\mu_0=4\\pi\\cdot 10^{-7}$ - Vacuum permeability [$Hm^{-1}$];',
      '$x$ - Core displacement [mm];',
      '$b=20$ - Length of primary winding [mm];',
      '$m=10$ - Length of secondary windings [mm];',
      '$r_{out}/r_{in}=2$ - Outer to inner coil winding radius ratio;',
    ],
  },
];
