import React, { useCallback } from 'react';
import { useCurrentPng } from 'recharts-to-png';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
} from 'recharts';
import { Button, Box, Text } from '@chakra-ui/react';
import { saveAs } from 'file-saver';
import { HiDownload } from 'react-icons/hi';

type DataType = { xvalue: number; yvalue: number }[];

type Props = {
  data: DataType;
  chartName: string;
  xlabel: string;
  ylabel: string;
  withAutoDomain?: boolean;
};

type ChartTooltipTypes = {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
};

export const MultiLineChart = ({
  data,
  chartName,
  xlabel,
  ylabel,
  withAutoDomain = false,
}: Props) => {
  const [getPng, { ref, isLoading }] = useCurrentPng();
  const handleDownload = useCallback(async () => {
    const chartPng = await getPng();
    if (chartPng) saveAs(chartPng, `${chartName}-chart.png`);
  }, [getPng, chartName]);

  const ChartTooltip = ({ active, payload, label }: ChartTooltipTypes) => {
    if (active && payload) {
      return (
        <Box bg='gray.800' rounded='md' color='white' p={2}>
          <Text fontSize='xs'>{`${xlabel}: ${label}`}</Text>
          <Text fontSize='xs'>{`${ylabel}: ${payload[0].value}`}</Text>
        </Box>
      );
    }
    return null;
  };

  return (
    <>
      <Box bg='gray.50' rounded='md' w='full' h='lg' p={4} maxW='3xl'>
        <ResponsiveContainer
          width={680}
          height='100%'
          minWidth={undefined}
          minHeight={undefined}
        >
          <LineChart
            data={data}
            ref={ref}
            margin={{ top: 5, right: 15, left: 15, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              type='number'
              dataKey='xvalue'
              tickCount={10}
              label={{
                value: xlabel,
                position: 'insideBottom',
                offset: -5,
              }}
            />
            <YAxis
              domain={[!withAutoDomain ? 0 : 'auto', 'auto']}
              label={{
                value: ylabel,
                angle: -90,
                offset: -5,
                position: 'insideLeft',
              }}
            />
            <Tooltip content={<ChartTooltip />} />
            <Line
              type='monotone'
              dataKey='yvalue_bare'
              stroke='#3182CE'
              fill='#3182CE'
              strokeWidth={2}
              dot={{ strokeWidth: 0 }}
            />
            <Line
              type='natural'
              dataKey='yvalue_sheath'
              stroke='#DD6B20'
              fill='#DD6B20'
              strokeWidth={2}
              dot={{ strokeWidth: 0 }}
            />
            <Line
              type='natural'
              dataKey='yvalue_well'
              stroke='#2F855A'
              fill='#2F855A'
              strokeWidth={2}
              dot={{ strokeWidth: 0 }}
            />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Button
        mt={4}
        size='sm'
        colorScheme='blue'
        leftIcon={<HiDownload />}
        isLoading={isLoading}
        isFullWidth
        onClick={handleDownload}
      >
        Download
      </Button>
    </>
  );
};
