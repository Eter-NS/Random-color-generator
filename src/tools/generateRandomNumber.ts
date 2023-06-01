export function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateRandomFloatNumber(min: number, max: number) {
  return (Math.random() * (max - min) + min).toFixed(2);
}
