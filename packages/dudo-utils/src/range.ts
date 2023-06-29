export default function range(start: number, end: number): Array<number> {
  return Array.from({length: end - start}, (v, k) => k + start)
};
