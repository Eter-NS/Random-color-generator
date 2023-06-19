import { OptionChannelType, RandomFormatArgs } from "../rccTypes.js";
import { checkAlpha } from "../tools/checkAlpha.js";
import { generateRandomFloatNumber } from "../tools/generateRandomFloatNumber.js";
import { generateRandomNumber } from "../tools/generateRandomNumber.js";
import keysObject from "../tools/keysObject.js";

export default function hsl({
  colorParts = ["", "", ""],
  alphaChannel = undefined,
  optionsObj: { hsl: options },
}: RandomFormatArgs): string | null {
  // validation

  if (typeof colorParts !== "object" || !("length" in colorParts)) {
    console.error("The colorParts is not an array");
    return null;
  }

  if (colorParts.length !== 3) {
    console.error("The colorParts has not the length of three values");
    return null;
  }

  checkOptions();

  const frame = [0, 0, 0];

  for (let i = 0; i < colorParts.length; i++) {
    if (typeof colorParts[i] !== "string") {
      console.error(
        `The ${i + 1} element of colorParts array is not a string `
      );
      return null;
    }

    let userValue =
      colorParts[i]!.length > 0 ? Number(colorParts[i]) : colorParts[i];
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
          passColorOptionData(options?.hue, 0, 360);
          break;

        case 1:
          passColorOptionData(options?.saturation, 0, 100);
          break;

        case 2:
          passColorOptionData(options?.lightness, 0, 100);
          break;
      }

      function passColorOptionData(
        colorChannel: OptionChannelType,
        defaultMin: number,
        defaultMax: number
      ) {
        if (colorChannel) {
          const { minValue, maxValue } = colorChannel;
          frame[i] = generateRandomNumber(
            minValue ? minValue : defaultMin,
            maxValue ? maxValue : defaultMax
          );
        } else {
          frame[i] = generateRandomNumber(defaultMin, defaultMax);
        }
      }
    }
  }

  const [hue, saturation, lightness] = frame;
  let alpha: string | number | undefined;
  const { random, minValue, maxValue } = options?.opacity ?? {
    random: false,
    minValue: undefined,
    maxValue: undefined,
  };

  if (alphaChannel != null) {
    // checks if alpha is number from range between 0 and 1
    // if not, returns null

    if (!checkAlpha(alphaChannel, "number")) return null;
    alpha = alphaChannel.toString();
  } else if (minValue != null || maxValue != null) {
    let errorAt = -1;
    const valuesArray = [minValue, maxValue];

    valuesArray.forEach((value, i) => {
      if (value == null) errorAt = i;
    });

    alpha = generateRandomFloatNumber(
      errorAt !== 0 ? minValue! : 0,
      errorAt !== 1 ? maxValue! : 1
    );
  } else if (random) {
    alpha = generateRandomFloatNumber(0, 1);
  }

  return alpha
    ? `hsl(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
    : `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  function checkOptions(): void {
    if (options) {
      keysObject(options).forEach(key => {
        const property = options[key];

        if (typeof property !== "object") {
          console.error(`${key} property is not a part of red, green or blue`);
          return null;
        }

        if (property.minValue) isWrongWritten(property.minValue, key);
        if (property.maxValue) isWrongWritten(property.maxValue, key);
      });
    }
  }
}

function isWrongWritten(
  numberToCheck: number,
  part: "opacity" | "hue" | "saturation" | "lightness"
): void {
  const showError = () => {
    console.error(`The ${part} is out of accepted range`);
    return null;
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

    default: {
      throw new Error("Unknown 'part' parameter");
    }
  }
}
