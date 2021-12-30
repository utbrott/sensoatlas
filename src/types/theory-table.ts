export type TheoryTable = {
  caption: string;
  headers: { text: string; unit: string }[];
  rows: (string | number)[][];
};
