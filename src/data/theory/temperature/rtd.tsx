import Latex from 'react-latex'

export const RtdArticle = () => {
  const symbolsResistance: string[] = [
    '$R$ - Base resistance [$\\,\\Omega\\,$];',
    '$\\alpha$ - Temperature coefficient [-];',
    '$\\Delta T=T-T_{REF}$ - Temperature difference [$\\,^\\circ {C}\\,$];',
    '$T$ - Surroundings temperature [$\\,^\\circ C\\,$] (Given in task)',
    '$T_{REF}$ - Reference temperature (0$^\\circ$C)'
  ]

  // const symbolsResistance2: EquationSymbol[] = [
  //   {
  //     id: 'baseres',
  //     symbol: 'R',
  //     description: 'Base resistance',
  //     unit: '\\Omega'
  //   }
  // ]

  return (
    <>
      <h2>Intro</h2>
      <p>
        Sensors used to measure temperature. Many RTD elements consist of a
        length of fine wire wrapped around a heat-resistant ceramic or glass
        core but other constructions are also used. The RTD wire is a pure
        material, typically platinum (Pt), nickel (Ni), or copper (Cu). The
        material has an accurate resistance/temperature relationship which is
        used to provide an indication of temperature.
      </p>
      <span className='dark:text-gray-300'>
        <Latex displayMode>$R_t=R(1+\alpha\Delta T)$</Latex>
      </span>
    </>
  )
}
