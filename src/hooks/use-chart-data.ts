type SingleLineArgs = {
  input1: number[];
  input2: number[];
};
type SingleLineData = {
  xvalue: number;
  yvalue: number;
};
export const useSingleLineChartData = ({ input1, input2 }: SingleLineArgs) => {
  const data: SingleLineData[] = [];

  input1.forEach((value: number, index: number) => {
    data.push({
      xvalue: value,
      yvalue: input2[index],
    });
  });

  data.sort((a, b) => a.xvalue - b.xvalue);

  return { data };
};
