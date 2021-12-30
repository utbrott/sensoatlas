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

type MirrorValuesArgs = {
  input: SingleLineData[];
};

export const useMirrorValues = ({ input }: MirrorValuesArgs) => {
  const data: SingleLineData[] = [];

  input.forEach((pair: SingleLineData, index: number) => {
    data.unshift({
      xvalue: -input[index].xvalue,
      yvalue: input[index].yvalue,
    });
    data.push(pair);
  });

  return { data };
};
