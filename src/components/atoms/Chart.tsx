import {
  ResponsiveContainer,
  LineChart as LineChartRoot,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts'
import { Button, ButtonProps } from '@ui/Button'
import { Spinner } from '@ui/Spinner'
import { IconFileDownload } from '@tabler/icons'
import colors from 'tailwindcss/colors'
import { useDownloadChart } from '@hooks/useDownloadChart'
import { useMakeChartLines, ChartLineProps } from '@hooks/useMakeChartLines'

type zeroReference = { x?: number; y?: number }

interface ChartProps extends ChartLineProps {
  chartName: string
  labels: { xaxis: string; yaxis: string }
  withTooltip?: boolean
  withAutoDomain?: boolean
  withZeroRef?: zeroReference
}

export const LineChart = ({
  chartName,
  chartData,
  legend,
  labels,
  hasDataPoints,
  withTooltip,
  withAutoDomain,
  withZeroRef
}: ChartProps) => {
  const [downloadHandler, { ref, isLoading }] = useDownloadChart(chartName)

  const chartLines = useMakeChartLines({ chartData, legend, hasDataPoints })

  return (
    <>
      <div className='relative flex h-full w-full rounded bg-gray-50 p-4'>
        <ResponsiveContainer aspect={1.78}>
          <LineChartRoot
            data={chartData}
            ref={ref}
            margin={{ top: 5, right: 15, left: 15, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              domain={[
                withZeroRef.x ? withZeroRef.x * -1 : 'auto',
                withZeroRef.x ? withZeroRef.x * 1 : 'auto'
              ]}
              type='number'
              dataKey='xval'
              tickCount={withZeroRef ? 11 : 10}
              label={{
                value: labels.xaxis,
                position: 'insideBottom',
                offset: -5
              }}
            />
            <YAxis
              domain={[withAutoDomain ? 'auto' : 0, 'auto']}
              label={{
                value: labels.yaxis,
                position: 'insideLeft',
                angle: -90,
                offset: -5
              }}
            />
            {withTooltip && (
              <Tooltip content={<ChartTooltip labels={labels} />} />
            )}
            {withZeroRef.x && (
              <ReferenceLine
                x={0}
                stroke={colors.gray[900]}
                strokeDasharray='2 2'
              />
            )}
            {withZeroRef.y && (
              <ReferenceLine
                y={0}
                stroke={colors.gray[900]}
                strokeDasharray='2 2'
              />
            )}
            {chartLines}
            {legend && <Legend verticalAlign='top' />}
          </LineChartRoot>
        </ResponsiveContainer>
      </div>
      <div className='mt-2 w-full'>
        <DownloadBtn
          isLoading={isLoading}
          onClick={downloadHandler}
          modifier='outline'
          fullWidth
        />
      </div>
    </>
  )
}

interface TooltipProps extends Pick<ChartProps, 'labels'> {
  label?: string
  active?: boolean
  payload?: { name: string; value: number }[]
}

const ChartTooltip = ({ labels, label, active, payload }: TooltipProps) => {
  const { xaxis, yaxis } = labels
  const yLabels = payload.map((label, index) => {
    return <p key={index}>{`${label.name}: ${label.value}`}</p>
  })

  return active && payload ? (
    <div className='rounded bg-gray-800 p-2 text-xs text-gray-50'>
      <p>{`${xaxis}: ${label}`}</p>
      {payload.length > 1 && <p>{`${yaxis}:`}</p>}
      {payload.length > 1 ? (
        <p>{yLabels}</p>
      ) : (
        <p>{`${yaxis}: ${payload[0].value}`}</p>
      )}
    </div>
  ) : null
}

interface DownloadBtnProps extends ButtonProps {
  isLoading: boolean
}

const DownloadBtn = ({ isLoading, ...props }: DownloadBtnProps) => {
  return (
    <Button variant='default' disabled={isLoading} {...props}>
      {isLoading ? (
        <Spinner withTransparency />
      ) : (
        <IconFileDownload className='h-5 w-5' />
      )}
      {isLoading ? 'Downloading...' : 'Download chart'}
    </Button>
  )
}
