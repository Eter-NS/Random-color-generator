import { RandomFormatArgs, OptionChannelType } from "../rccTypes.js";
import { checkAlpha } from "../tools/checkAlpha.js";
import keysObject from "../tools/keysObject.js";
import selectHexNumber from "../tools/selectHexNumber.js";

export default function hex({
  colorParts = ["", "", ""],
  alphaChannel = undefined,
  optionsObj: { hex: options },
}: RandomFormatArgs): string | null {
  // validation
  if (typeof colorParts !== "object" && "length" in colorParts)
    throw new Error("The colorParts is not an array");
  if (colorParts.length !== 3)
    throw new Error("The colorParts array must contain three hex values");

  // const { hex: options } = optionsObj;
  const hexCharTable = "0123456789ABCDEF";
  const frame = ["0", "0", "0"];

  checkOptions();

  let smallestLength = 0;
  for (let i = 0; i < colorParts.length; i++) {
    const color = colorParts[i];

    if (typeof color !== "string")
      throw new Error(
        `The ${i + 1} element of colorParts array is not a string`
      );
    if (color.length > smallestLength) smallestLength = color.length;
  }

  const isShorthand = smallestLength === 1;

  // const isOpacityOptionSet = options?.opacity ? true : false;
  for (let i = 0; i < frame.length; i++) {
    const userValue = colorParts[i];
    if (typeof userValue === "string" && userValue.length > 0) {
      frame[i] = userValue.toUpperCase();
      continue;
    }

    // if user did not defined the color part
    switch (i) {
      case 0:
        createColorChannel(options?.red);
        break;
      case 1:
        createColorChannel(options?.green);
        break;
      case 2:
        createColorChannel(options?.blue);
        break;
    }

    function createColorChannel(colorChannel: OptionChannelType) {
      if (colorChannel) {
        const { minValue, maxValue } = colorChannel;
        frame[i] = createHexNumber(
          minValue ? minValue : 0,
          maxValue ? maxValue : 14
        );
      } else {
        frame[i] = createHexNumber(
          options?.minValue ? options.minValue : 0,
          options?.maxValue ? options.maxValue : 14
        );
      }
    }
  }
  function createHexNumber(min: number, max: number) {
    return isShorthand
      ? selectHexNumber(hexCharTable, min, max)
      : selectHexNumber(hexCharTable, min, max) +
          selectHexNumber(hexCharTable, min, max);
  }

  let alpha: string | undefined;

  if (typeof alphaChannel === "string" && checkAlpha(alphaChannel, "string")) {
    alpha = alphaChannel.toUpperCase();
  } else if (options?.opacity) {
    const {
      opacity: { random, minValue, maxValue },
    } = options;
    if (minValue != null || maxValue != null) {
      alpha = createHexNumber(
        minValue ? minValue : 0,
        maxValue ? maxValue : 14
      );
    } else if (random) {
      alpha = createHexNumber(0, 14);
    }
  }

  if (alpha) {
    return `#${frame.join("")}${alpha}`;
  }
  return `#${frame.join("")}`;

  /*


  Checks


  */

  function checkOptions(): void {
    if (options) {
      keysObject(options).forEach(key => {
        const property = options[key];

        if (typeof property === "number") isWrongWritten(property, key);
        if (typeof property === "object") {
          if (property.minValue) isWrongWritten(property.minValue, key);
          if (property.maxValue) isWrongWritten(property.maxValue, key);
        }
      });
    }
  }
}

function isWrongWritten(optionPropertyNumber: number, key: string) {
  console.log(optionPropertyNumber);
  if (optionPropertyNumber < 0 || optionPropertyNumber > 14) {
    throw new Error(`The ${key} property is out of accepted range`);
  }
  return false;
}
