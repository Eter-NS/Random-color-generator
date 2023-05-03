import generateRandomNumber from "./generateRandomNumber";

export default function selectHexNumber(hexTable: string) {
  return hexTable[generateRandomNumber(0, 14)];
}
