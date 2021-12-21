type Args = {
  input1: number[];
  input2: number[];
  withSorting: boolean;
};

type OutputData = {
  xvalue: number;
  yvalue: number;
};

export const useGenerateChartData = ({ input1, input2, withSorting }: Args) => {
  const data: OutputData[] = [];
  let inputValues = [];
  if (withSorting) {
    inputValues = input1.sort((a: number, b: number) => a - b);
  } else {
    inputValues = input1;
  }

  inputValues.forEach((value: number, index: number) => {
    data.push({
      xvalue: value,
      yvalue: input2[index],
    });
  });

  return { data };
};
