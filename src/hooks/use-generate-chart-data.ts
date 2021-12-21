export const useGenerateChartData = (
  context: any,
  taskIndex: number,
  sorted: boolean
) => {
  const data: { xvalue: number; yvalue: number }[] = [];
  const { taskData, validationData } = context;

  let xvalues = [];
  if (sorted) {
    xvalues = taskData[taskIndex].sort((a: number, b: number) => a - b);
  } else {
    xvalues = taskData[taskIndex];
  }

  xvalues.forEach((value: number, index: number) => {
    data.push({
      xvalue: value,
      yvalue: validationData[taskIndex][index],
    });
  });

  data.unshift({ xvalue: 0, yvalue: 0 });

  return { data };
};
