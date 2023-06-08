# Random color generator API

The API which allows you to create random colors in three formats (HEX, HSL, and RGB) with ability to reduce or limit your output via options object.

## Status - Ready for production

## Features

- Three formats:
  - HEX
  - HSL
  - RGB
- Ability to set minimum and maximum value for each color and a global per format (except for HSL)
- Ability to set random alpha value (via random property in opacity section)

## Cheat Sheet

```
RandomColorGenerator({
    format: "HEX",
    colorParts: ["", "", ""],
    alphaChannel: "ff",
    optionsObj: {
      hsl: {
        hue: { minValue: 100, maxValue: 110 },
        saturation: { minValue: 60, maxValue: 80 },
        lightness: { minValue: 80, maxValue: 100 },
        opacity: { random: true, minValue: 0.9, maxValue: 1 },
      },
      hex: {
        red: { minValue: 5, maxValue: 9 },
        green: { minValue: 0, maxValue: 5 },
        blue: { minValue: 2, maxValue: 3 },
        opacity: { random: true, minValue: 12, maxValue: 13 },
        minValue: 0,
        maxValue: 14,
      },
      rgb: {
        red: { minValue: 0, maxValue: 255 },
        green: { minValue: 0, maxValue: 255 },
        blue: { minValue: 0, maxValue: 255 },
        opacity: { random: true, minValue: 0.5, maxValue: 0.6 },
        minValue: 50,
        maxValue: 200,
      },
    },
  })
```

- **format** - Decide what format you want to choose (only upper text),
- **colorParts** - Areas where you define static values that will repeat each time you call the function,
- **alphaChannel** - Input for your static alpha value (depending what format you choose, you need to write proper value e.g. "hex -> ab, rgb -> 0.50"),
- **optionsObj** - Define the possible outcome from the generator, you are not limited to current format only,
  - **hsl** - Property that defines the outcome for specific format,
    - **hue** - A section for a number that defines a hue in HSL format,
      - **minValue** - A number that defines the lower point of random color pick,
      - **maxValue** - A number that defines the upper point of random color pick (can be set alongside the **minValue**),
    - **opacity**
      - **random** - A boolean value which allows to create a color with random opacity,
    - **minValue** - A number that defines lower point of random color pick (it is used when section based number is not defined),
    - **maxValue** - -//-
