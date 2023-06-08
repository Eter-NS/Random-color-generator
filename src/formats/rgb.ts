import {
  RandomFormatArgs,
  OptionChannelType as OptionChannelType,
} from "../rccTypes.js";
import { checkAlpha } from "../tools/checkAlpha.js";
import { generateRandomFloatNumber } from "../tools/generateRandomFloatNumber.js";
import { generateRandomNumber } from "../tools/generateRandomNumber.js";
import keysObject from "../tools/keysObject.js";

export default function rgb({
  colorParts = ["", "", ""],
  alphaChannel = undefined,
  optionsObj: { rgb: options },
}: RandomFormatArgs): string | null {
  checkOptions();

  const frame: string[] = [];
  for (let i = 0; i < colorParts.length; i++) {
    const userValue = colorParts[i];

    if (typeof userValue === "string" && userValue.length > 0) {
      frame.push(userValue);
    } else {
      switch (i) {
        case 0:
          frame.push(generateColorValue(options?.red));
          break;
        case 1:
          frame.push(generateColorValue(options?.green));
          break;
        case 2:
          frame.push(generateColorValue(options?.blue));
          break;
      }

      function generateColorValue(colorOption: OptionChannelType): string {
        const { minValue, maxValue } = colorOption ?? {
          minValue: undefined,
          maxValue: undefined,
        };

        return passValues(
          minValue ? minValue : options?.minValue ? options.minValue : 0,
          maxValue ? maxValue : options?.maxValue ? options.maxValue : 255
        );
      }
    }
  }
  const [red, green, blue] = frame;

  function formatColor(
    red: string,
    green: string,
    blue: string,
    alpha?: number | string | null
  ): string {
    if (alpha != null) {
      if (checkAlpha(alpha, "number")) {
        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
      }

      alpha = options?.opacity?.random ? generateRandomFloatNumber(0, 1) : null;
    } else if (options?.opacity) {
      const { random, minValue, maxValue } = options.opacity;

      if (minValue != null || maxValue != null) {
        alpha = generateRandomFloatNumber(
          minValue ? minValue : 0,
          maxValue ? maxValue : 1
        );
      } else if (random) {
        alpha = generateRandomFloatNumber(0, 1);
      } else {
        return `rgb(${red}, ${green}, ${blue})`;
      }
    }

    return alpha != null
      ? `rgba(${red}, ${green}, ${blue}, ${alpha})`
      : `rgb(${red}, ${green}, ${blue})`;
  }

  return formatColor(red, green, blue, alphaChannel);

  /*



  checks



  */

  function checkOptions(): void {
    if (options) {
      keysObject(options).forEach(key => {
        const property = options[key];
        if (typeof property === "number") {
          isWrongRGB(property, key);
        }
        if (typeof property === "object") {
          keysObject(property).forEach(subKey => {
            property[subKey] != null && isWrongRGB(property[subKey]!, key);
          });
        }
      });
    }
  }
}

function isWrongRGB(numberToCheck: number, part: string): void {
  const showError = () => {
    throw new Error(`The ${part} is out of accepted range`);
  };

  if (part === "opacity") {
    if (numberToCheck < 0 || numberToCheck > 1) showError();
  }

  if (numberToCheck < 0 || numberToCheck > 255) showError();
}

function passValues(min: number, max: number) {
  return generateRandomNumber(min, max).toString();
}
