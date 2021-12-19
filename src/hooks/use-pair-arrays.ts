import { pairArrays } from '#utils/pair-arrays';

export const usePairArrays = (context: any, taskId: number) => {
  const in1 = context.taskData[taskId];
  const in2 = context.validationData[taskId];

  const input = { in1, in2 };
  const data = pairArrays(input);

  return { data };
};
