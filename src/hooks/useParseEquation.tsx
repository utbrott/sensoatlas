import Latex from 'react-latex'

export interface EquationProps {
  equations?: string[]
  symbols?: string[]
}

export const useParseEquation = ({
  equations,
  symbols
}: EquationProps): JSX.Element => {
  const hasEquations = Array.isArray(equations)
  const hasSymbols = Array.isArray(symbols)

  const equationsList = (hasEquations ? equations : []).map(
    (equation, index) => {
      return <Latex key={index}>{`$${equation}$`}</Latex>
    }
  )

  const symbolsList = (hasSymbols ? symbols : []).map((symbol, index) => {
    return <Latex key={index}>{symbol}</Latex>
  })

  return (
    <span className='flex flex-col rounded-md border  bg-gray-200/30 p-4 dark:border-gray-700/70 dark:bg-gray-700/30'>
      <span className='flex flex-col px-4 pb-4 text-lg'>{equationsList}</span>
      {symbolsList.length !== 0 && (
        <span className='dark:text-gray-300'>Where:</span>
      )}
      <span className='flex flex-col px-4 dark:text-gray-300'>
        {symbolsList}
      </span>
    </span>
  )
}
