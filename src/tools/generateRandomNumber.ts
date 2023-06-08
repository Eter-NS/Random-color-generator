export function generateRandomNumber(min: number, max: number) {
  if (min > max) throw new Error("Min is greater than max");

  return Math.floor(Math.random() * (max - min + 1) + min);
}
