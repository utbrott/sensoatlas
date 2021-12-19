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

type Props = {
  chartId?: string;
  xlabel?: string;
  ylabel?: string;
};

export const TaskChart = ({ chartId, xlabel, ylabel }: Props) => {
  const data = [
    {
      strain: 1,
      voltage: 3.25,
    },
    {
      strain: 1.6,
      voltage: 5.2,
    },
    {
      strain: 2.2,
      voltage: 7.15,
    },
    {
      strain: 3.6,
      voltage: 11.7,
    },
    {
      strain: 3.9,
      voltage: 12.68,
    },
  ];

  const [getPng, { ref, isLoading }] = useCurrentPng();
  const handleDownload = useCallback(async () => {
    const chartPng = await getPng();
    if (chartPng) saveAs(chartPng, 'strain-gauges-task1-chart.png');
  }, [getPng]);

  return (
    <>
      <Box bg='gray.50' rounded='md' w='full' h='lg' p={4} maxW='3xl'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={data}
            ref={ref}
            margin={{ top: 5, right: 10, left: 5, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              type='number'
              dataKey='strain'
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
              dataKey='voltage'
              stroke='#4299E1'
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Button
        size='sm'
        colorScheme='gray'
        fontWeight='normal'
        isLoading={isLoading}
        onClick={handleDownload}
      >
        Save chart
      </Button>
    </>
  );
};
