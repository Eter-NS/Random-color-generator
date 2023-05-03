import generateRandomNumber from "./tools/generateRandomNumber";
import selectHexNumber from "./tools/selectHexNumber";

// Types
type Format = "HSL" | "HEX" | "RGB";
type ColorParts = [string, string, string];
type AlphaType = number | undefined;

// Interfaces
interface Options {
  minValue?: number;
  maxValue?: number;
}

function RandomColorGenerator(
  format: Format,
  colorParts: ColorParts = ["", "", ""],
  alphaChannel: AlphaType = undefined,
  optionsObj: Options = {}
) {
  checkAlpha(alphaChannel);

  if (colorParts.length > 3) {
    console.error("The color array should have up to three values");
    return null;
  }

  for (const colorP of colorParts) {
    if (typeof colorP === "string") {
      console.error(`${colorP} is not a string type`);
    }
  }

  switch (format) {
    case "HSL":
      return hsl(colorParts, alphaChannel, optionsObj);

    case "HEX": {
      return rgb(colorParts, alphaChannel, optionsObj);
    }

    case "RGB":
      return rgb(colorParts, alphaChannel, optionsObj);

    default:
      console.error("Unknown color format");
      return null;
  }
}

function hsl(
  colorArray: ColorParts,
  alphaValue: AlphaType = undefined,
  optionsObj: Options
) {
  const frame = [0, 0, 0];
  for (let i = 0; i < colorArray.length; i++) {
    const userValue = colorArray[i];
    if (typeof userValue === "string" && userValue.length > 0) {
      frame[i] = Number(userValue);
    } else {
      i === 0
        ? (frame[i] = generateRandomNumber(0, 360))
        : (frame[i] = generateRandomNumber(0, 100));
    }
  }
  const [hue, saturation, lightness] = frame;

  if (alphaValue != null) {
    // checks if alpha is number from range between 0 and 1
    // if not, returns null
    const alpha = checkAlpha(alphaValue)
      ? alphaValue
      : Number(Math.random().toFixed(2));

    console.log(`hsl(${hue}, ${saturation}%, ${lightness}%, ${alpha})`);
    return `hsl(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
    //
  } else {
    //
    console.log(`hsl(${hue}, ${saturation}%, ${lightness}%)`);

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
}

function hex(
  colorArray: ColorParts,
  alphaValue: string | undefined = undefined,
  optionsObj: Options
) {
  const hexCharTable = "0123456789abcdef";
  const frame = ["0", "0", "0"];

  const isShorthand = colorArray[0]?.length < 2;

  for (let i = 0; i < frame.length; i++) {
    const userValue = colorArray[i];

    if (typeof userValue === "string" && userValue.length > 0) {
      frame[i] = userValue;
      continue;
    }

    if (isShorthand) {
      frame[i] = selectHexNumber(hexCharTable);
    } else {
      frame[i] = selectHexNumber(hexCharTable) + selectHexNumber(hexCharTable);
    }
  }

  if (alphaValue != null) {
    const isHexNumber = /^([0-9a-fA-F]{1}|[0-9a-fA-F]{2})$/.test(alphaValue);

    // in case if user uses shorthand and passes good hex alpha
    if (isHexNumber && isShorthand) {
      frame.forEach((element, index) => {
        frame[index] = element + element;
      });
    }

    const alpha = isHexNumber
      ? alphaValue
      : selectHexNumber(hexCharTable) + selectHexNumber(hexCharTable);

    console.log(`# + ${frame.join("")}${alpha}`);
    return `# + ${frame.join("")}${alpha}`;
  } else {
    console.log(`# + ${frame.join("")}`);
    return `# + ${frame.join("")}`;
  }
}

function rgb(
  colorArray: ColorParts,
  alphaValue: AlphaType = undefined,
  optionsObj: Options
) {
  const frame = [0, 0, 0];
  for (let i = 0; i < colorArray.length; i++) {
    const userValue = colorArray[i];

    if (typeof userValue === "string" && userValue.length > 0) {
      frame[i] = Number(userValue);
    } else {
      frame[i] = generateRandomNumber(0, 255);
    }
  }
  const [red, green, blue] = frame;

  if (alphaValue != null) {
    // checks if alpha is number from range between 0 and 1
    // if not, returns null
    const alpha = checkAlpha(alphaValue)
      ? alphaValue
      : Number(Math.random().toFixed(2));

    console.log(`rgb(${red}, ${green}, ${blue}, ${alpha})`);
    return `rgb(${red}, ${green}, ${blue}, ${alpha})`;
    //
  } else {
    //
    console.log(`rgb(${red}, ${green}, ${blue})`);
    return `rgb(${red}, ${green}, ${blue})`;
  }
}

function checkAlpha(alphaChannel: AlphaType) {
  if (typeof alphaChannel === "number")
    if (alphaChannel < 0 || alphaChannel > 1) {
      console.error(
        "The alpha channel should be a number between 0 and 1 (for example: 0.56)"
      );
      return null;
    }
  return true; // validation passed
}

export { RandomColorGenerator, hsl, hex, rgb };
