import { RandomFormatArgs } from "../rccTypes.js";
import { checkAlpha } from "../tools/checkAlpha.js";
import {
  generateRandomNumber,
  generateRandomFloatNumber,
} from "../tools/generateRandomNumber.js";
import keysObject from "../tools/keysObject.js";

export default function hsl({
  colorParts = ["", "", ""],
  alphaChannel = undefined,
  optionsObj: { hsl: options },
}: RandomFormatArgs): string | null {
  // validation
  if (typeof colorParts !== "object" && "length" in colorParts)
    throw new Error("The colorParts is not an array");

  checkOptions();

  const frame = [0, 0, 0];

  for (let i = 0; i < colorParts.length; i++) {
    if (typeof colorParts[i] !== "string")
      throw new Error(
        `The ${i + 1} element of colorParts array is not a string `
      );

    let userValue =
      colorParts[i].length > 0 ? Number(colorParts[i]) : colorParts[i];
    if (typeof userValue === "number") {
      if (Number.isNaN(userValue)) {
        return null;
      }
      if (i === 0 && (userValue < 0 || userValue > 360)) {
        console.error("Color hue is out of accepted range");
        return null;
      }
      if (i > 0 && (userValue < 0 || userValue > 100)) {
        console.error(
          `Color ${
            i === 1 ? "Saturation" : "Lightness"
          } is out of accepted range`
        );
        return null;
      }
    }

    if (typeof userValue === "number") {
      frame[i] = userValue;
    } else {
      switch (i) {
        case 0:
          if (options?.hue) {
            const { hue } = options;
            frame[i] = generateRandomNumber(
              hue?.minValue ? hue?.minValue : 0,
              hue?.maxValue ? hue.maxValue : 360
            );
          } else {
            // frame[i] = generateRandomNumber(
            //   options?.minValue ? options.minValue : 0,
            //   options?.maxValue ? options.maxValue : 360
            // );
          }
          break;

        case 1:
          if (options?.saturation) {
            const { saturation } = options;
            frame[i] = generateRandomNumber(
              saturation?.minValue ? saturation.minValue : 0,
              saturation?.maxValue ? saturation.maxValue : 100
            );
          } else {
            // frame[i] = generateRandomNumber(
            //   options?.minValue ? options.minValue : 0,
            //   options?.maxValue ? options.maxValue : 100
            // );
          }
          break;

        case 2:
          if (options?.lightness) {
            const { lightness } = options;
            frame[i] = generateRandomNumber(
              lightness?.minValue ? lightness.minValue : 0,
              lightness?.maxValue ? lightness.maxValue : 100
            );
          } else {
            // frame[i] = generateRandomNumber(
            //   options?.minValue ? options.minValue : 0,
            //   options?.maxValue ? options.maxValue : 100
            // );
          }
          break;
      }
    }
  }

  const [hue, saturation, lightness] = frame;
  let alpha: string | number | undefined;

  if (alphaChannel != null) {
    // checks if alpha is number from range between 0 and 1
    // if not, returns null

    if (!checkAlpha(alphaChannel, "number")) return null;
    alpha = alphaChannel.toString();
  } else if (options?.opacity) {
    const {
      opacity: { random, minValue, maxValue },
    } = options;
    if (random) {
      alpha = generateRandomFloatNumber(0, 1);
    } else {
      let errorAt = -1;
      const valuesArray = [minValue, maxValue];

      valuesArray.forEach((value, i) => {
        if (value != null && !checkAlpha(value, "number")) errorAt = i;
      });

      alpha = generateRandomFloatNumber(
        errorAt !== 0 ? minValue! : 0,
        errorAt !== 1 ? maxValue! : 1
      );
    }
  }

  if (!alpha) {
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  return `hsl(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;

  function checkOptions(): void {
    if (options) {
      keysObject(options).forEach(key => {
        const property = options[key];

        if (typeof property !== "object")
          throw new Error(
            `${key} property is not a part of red, green or blue`
          );

        if (property.minValue) isWrongWritten(property.minValue, key);
        if (property.maxValue) isWrongWritten(property.maxValue, key);
      });
    }
  }
}

function isWrongWritten(
  numberToCheck: number,
  part: "hue" | "saturation" | "lightness" | "opacity"
): void {
  const showError = () => {
    throw new Error(`The ${part} is out of accepted range`);
  };

  switch (part) {
    case "hue":
      if (numberToCheck < 0 || numberToCheck > 360) showError();
      break;
    case "saturation":
    case "lightness":
      if (numberToCheck < 0 || numberToCheck > 100) showError();
      break;
    case "opacity":
      if (numberToCheck < 0 || numberToCheck > 1) showError();
      break;

    default:
      throw new Error("Unknown 'part' parameter");
  }
}
