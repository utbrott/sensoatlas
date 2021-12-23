type SingleLineArgs = {
  input1: number[];
  input2: number[];
};

type MultiLineArgs = {
  input1: number;
  input2: number[];
};

type SingleLineData = {
  xvalue: number;
  yvalue: number;
};

type MultiLineData = {
  xvalue: number;
  yvalue_bare: number;
  yvalue_sheath: number;
  yvalue_well: number;
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

export const useMultiLineChartData = ({ input1, input2 }: MultiLineArgs) => {
  const data: MultiLineData[] = [];

  data.push({
    xvalue: 0,
    yvalue_bare: 0,
    yvalue_sheath: 0,
    yvalue_well: 0,
  });

  data.push({
    xvalue: input1,
    yvalue_bare: input2[0],
    yvalue_sheath: input2[1],
    yvalue_well: input2[2],
  });

  return { data };
};
