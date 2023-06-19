import { generateRandomNumber } from "./generateRandomNumber.js";

export default function selectHexNumber(
  hexTable: string,
  min = 0,
  max = 14
): string {
  return hexTable.charAt(generateRandomNumber(min, max));
}
