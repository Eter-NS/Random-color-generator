// Types
export type Format = "HSL" | "HEX" | "RGB";
export type ColorParts = [string, string, string];
export type AlphaType = number | string | undefined;

export type RandomColorArgs = {
  format: Format;
  colorParts: ColorParts;
  alphaChannel: AlphaType;
  optionsObj: Options;
};

export type RandomFormatArgs = Omit<RandomColorArgs, "format">;

// Interfaces
export interface Options {
  hex?: {
    red?: {
      minValue?: number /* 0-14 */;
      maxValue?: number /* 0 - 14 */;
    };
    green?: {
      minValue?: number /* 0 - 14 */;
      maxValue?: number /* 0 - 14 */;
    };
    blue?: {
      minValue?: number /* 0 - 14 */;
      maxValue?: number /* 0 - 14 */;
    };
    opacity?: {
      random?: boolean;
      minValue?: number /* 0 - 14 */;
      maxValue?: number /* 0 - 14 */;
    };
    minValue?: number /* 0 - 14 */;
    maxValue?: number /* 0 - 14 */;
  };
  hsl?: {
    hue?: {
      minValue?: number /* 0 - 360 */;
      maxValue?: number /* 0 - 360 */;
    };
    saturation?: {
      minValue?: number /* 0 - 100 */;
      maxValue?: number /* 0 - 100 */;
    };
    lightness?: {
      minValue?: number /* 0 - 100 */;
      maxValue?: number /* 0 - 100 */;
    };
    opacity?: {
      random?: boolean /* Random has bigger priority than min/max Value */;
      minValue?: number /* 0 - 1 */;
      maxValue?: number /* 0 - 1 */;
    };
    // minValue?: number; /* 0 - 100 */
    // maxValue?: number; /* 0 - 100 */
  };
  rgb?: {
    red?: {
      minValue?: number;
      maxValue?: number;
    };
    green?: {
      minValue?: number;
      maxValue?: number;
    };
    blue?: {
      minValue?: number;
      maxValue?: number;
    };
    opacity?: {
      random?: boolean;
      minValue?: number;
      maxValue?: number;
    };
    minValue?: number;
    maxValue?: number;
  };
}
