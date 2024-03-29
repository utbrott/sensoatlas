import {
  ResponsiveContainer,
  LineChart as LineChartRoot,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
  ReferenceLine,
  Label
} from 'recharts';
import { Button, ButtonProps } from '@ui/button';
import { IconFileDownload } from '@tabler/icons';
import { Spinner } from '@ui/loading-spinner';
import colors from 'tailwindcss/colors';
import { useCallback } from 'react';
import { useCurrentPng } from 'recharts-to-png';
import { saveAs } from 'file-saver';

interface TooltipProps extends Pick<ChartProps, 'labels'> {
  label?: string;
  active?: boolean;
  payload?: { name: string; value: number }[];
}

const ChartTooltip = ({ labels, label, active, payload }: TooltipProps) => {
  const { xaxis, yaxis } = labels;
  const yLabels = payload.map((label, index) => {
    return <p key={index}>{`${label.name}: ${label.value}`}</p>;
  });

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
  ) : null;
};

type ChartData = { [key: string]: number };

interface DownloadBtnProps extends ButtonProps {
  isLoading: boolean;
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
  );
};

type zeroReference = { x?: number; y?: number };

interface ChartProps {
  chartName: string;
  chartData: ChartData[];
  labels: { xaxis: string; yaxis: string };
  legend?: string[];
  withTooltip?: boolean;
  hasDataPoints?: boolean;
  withAutoDomain?: boolean;
  withZeroRef?: zeroReference;
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
  const [downloadHandler, { ref, isLoading }] = useDownloadChart(chartName);

  const lineColors: string[] = [
    colors.sky[600],
    colors.emerald[600],
    colors.yellow[500],
    colors.purple[700],
    colors.red[600]
  ];

  const yKeys = Object.keys(chartData[0]).filter(point =>
    point.startsWith('y')
  );

  return (
    <>
      <div className='relative flex h-full w-full rounded bg-gray-50 p-4 text-gray-900'>
        <ResponsiveContainer height={395} aspect={1.78}>
          <LineChartRoot
            data={chartData}
            ref={ref}
            margin={{ top: 5, right: 15, left: 15, bottom: 15 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              domain={[
                withZeroRef?.x ? withZeroRef.x * -1 : 'auto',
                withZeroRef?.x ? withZeroRef.x * 1 : 'auto'
              ]}
              type='number'
              dataKey='x'
              tickCount={withZeroRef ? 11 : 10}
              label={{
                value: labels.xaxis,
                position: 'insideBottom',
                offset: -10
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
            {withZeroRef?.x && (
              <ReferenceLine
                x={0}
                stroke={colors.gray[900]}
                strokeDasharray='2 2'
              />
            )}
            {withZeroRef?.y && (
              <ReferenceLine
                y={0}
                stroke={colors.gray[900]}
                strokeDasharray='2 2'
              />
            )}
            {yKeys.map((key, index) => {
              return (
                <Line
                  key={key}
                  type='monotone'
                  dataKey={key}
                  name={legend && legend[index]}
                  stroke={lineColors[index]}
                  strokeWidth={2}
                  dot={hasDataPoints ? { strokeWidth: 0 } : false}
                  fill={lineColors[index]}
                />
              );
            })}
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
  );
};

type UseDownloadChart = [
  () => Promise<void | undefined>,
  { ref: React.MutableRefObject<any>; isLoading: boolean }
];

const useDownloadChart = (chartName: string): UseDownloadChart => {
  const [getPng, { ref, isLoading }] = useCurrentPng();

  const downloadChart = useCallback(async () => {
    const chartAsPng = await getPng();
    if (chartAsPng) saveAs(chartAsPng, `sensoatlas-${chartName}-chart.png`);
  }, [getPng, chartName]);

  return [downloadChart, { ref: ref, isLoading: isLoading }];
};

interface LineChartCreator {
  xvalues: number[];
  yvalues: number[][];
  withMirrorX?: boolean;
}

export const lineChartCreator = ({
  xvalues,
  yvalues,
  withMirrorX
}: LineChartCreator) => {
  const chartData: ChartData[] = [];

  xvalues.map((xValue, xIdx) => {
    const obj: ChartData = {};
    obj['x'] = xValue;
    yvalues.map((yVal, yIdx) => {
      obj[`y${yIdx}`] = yVal[xIdx];
    });
    chartData.push(obj);
  });

  chartData.sort((a, b) => a.x - b.x);

  if (!withMirrorX) return chartData;

  const mirroredEntries: ChartData[] = Object.values(chartData)
    .filter(value => value.x > 0)
    .map(value => {
      return { ...value, x: -value.x };
    })
    .reverse();

  return [...mirroredEntries, ...chartData];
};
