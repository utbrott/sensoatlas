import React, { useCallback } from 'react';
import { useCurrentPng } from 'recharts-to-png';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
} from 'recharts';
import { Button, Box } from '@chakra-ui/react';
import { saveAs } from 'file-saver';
import { HiDownload } from 'react-icons/hi';

type DataType = { xvalue: number; yvalue: number }[];

type Props = {
  data: DataType;
  chartName: string;
  xlabel: string;
  ylabel: string;
};

export const TaskChart = ({ data, chartName, xlabel, ylabel }: Props) => {
  const [getPng, { ref, isLoading }] = useCurrentPng();
  const handleDownload = useCallback(async () => {
    const chartPng = await getPng();
    if (chartPng) saveAs(chartPng, `${chartName}-chart.png`);
  }, [getPng, chartName]);

  return (
    <>
      <Box bg='gray.50' rounded='md' w='full' h='lg' p={4} maxW='3xl' mb={2}>
        <ResponsiveContainer
          width={680}
          height='100%'
          minWidth={undefined}
          minHeight={undefined}
        >
          <LineChart
            data={data}
            ref={ref}
            margin={{ top: 5, right: 15, left: 5, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              type='number'
              dataKey='xvalue'
              tickCount={10}
              label={{
                value: xlabel,
                offset: -5,
                position: 'insideBottom',
              }}
            />
            <YAxis
              label={{
                value: ylabel,
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Line
              type='monotone'
              dataKey='yvalue'
              stroke='#4299E1'
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Button
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
