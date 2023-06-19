import hsl from "./formats/hsl.js";
import {
  AlphaType,
  ColorParts,
  Format,
  Options,
  RandomColorArgs,
} from "./rccTypes.js";
import rgb from "./formats/rgb.js";
import hex from "./formats/hex.js";

export function RandomColorGenerator({
  format,
  colorParts = ["", "", ""],
  alphaChannel = undefined,
  optionsObj = {},
}: RandomColorArgs): string | null {
  if (colorParts.length !== 3) {
    console.error("The color array should have always three values");
    return null;
  }

  for (const colorP of colorParts) {
    if (typeof colorP !== "string") {
      console.error(`${colorP} is not a string type`);
      return null;
    }
  }

  switch (format) {
    case "HSL":
      return hsl({ colorParts, alphaChannel, optionsObj });

    case "HEX": {
      return hex({ colorParts, alphaChannel, optionsObj });
    }

    case "RGB":
      return rgb({ colorParts, alphaChannel, optionsObj });

    default:
      console.error("Unknown color format");
      return null;
  }
}

export { hex, hsl, rgb };
