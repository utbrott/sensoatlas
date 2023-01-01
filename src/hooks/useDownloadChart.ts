import React, { useCallback } from 'react'
import { useCurrentPng } from 'recharts-to-png'
import { saveAs } from 'file-saver'

type UseDownloadChart = [
  () => Promise<void | undefined>,
  { ref: React.MutableRefObject<any>; isLoading: boolean }
]

export const useDownloadChart = (chartName: string): UseDownloadChart => {
  const [getPng, { ref, isLoading }] = useCurrentPng()

  const downloadChart = useCallback(async () => {
    const chartAsPng = await getPng()
    if (chartAsPng) saveAs(chartAsPng, `sensoatlas-${chartName}-chart.png`)
  }, [getPng, chartName])

  return [downloadChart, { ref: ref, isLoading: isLoading }]
}
