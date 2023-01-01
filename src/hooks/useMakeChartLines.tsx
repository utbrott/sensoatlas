import { Line } from 'recharts'
import colors from 'tailwindcss/colors'

const lineColors: string[] = [
  colors.sky[600],
  colors.emerald[600],
  colors.yellow[500],
  colors.purple[700],
  colors.red[600]
]

type ChartData = {
  xval: number
  [key: string]: number
}

export interface ChartLineProps {
  chartData: ChartData[]
  legend?: string[]
  hasDataPoints?: boolean
}

export const useMakeChartLines = ({
  chartData,
  legend,
  hasDataPoints
}: ChartLineProps): JSX.Element => {
  const yKeys = Object.keys(chartData[0]).filter(point => point.startsWith('y'))
  const lines = yKeys.map((key, index) => {
    return (
      <Line
        key={index}
        type='monotone'
        dataKey={key}
        name={legend && legend[index]}
        stroke={lineColors[index]}
        strokeWidth={2}
        dot={hasDataPoints ? { strokeWidth: 0 } : false}
        fill={lineColors[index]}
      />
    )
  })

  return <>{lines}</>
}
