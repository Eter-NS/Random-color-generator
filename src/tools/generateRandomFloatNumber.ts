export function generateRandomFloatNumber(min: number, max: number) {
  if (min > max) throw new Error("Min is greater than max");

  return (Math.random() * (max - min) + min).toFixed(2);
}
