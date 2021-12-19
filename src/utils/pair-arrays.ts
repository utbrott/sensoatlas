type Args = {
  in1: number[];
  in2: number[];
};

export const pairArrays = ({ in1, in2 }: Args) => {
  return in1.map((value, iter) => [value, in2[iter]]);
};
