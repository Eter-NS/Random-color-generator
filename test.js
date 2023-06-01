import { RandomColorGenerator } from "./dist/rcc.js";

// const button = document.querySelector(".submit-button");
// const preview = document.querySelector(".color-preview");

// button.addEventListener("click", e => {
//   preview.styles.backgroundColor = RandomColorGenerator("rgb");
// });

// HSL    RGB     HEX
console.log(
  RandomColorGenerator({
    format: "RGB",
    colorParts: ["220", "100", ""],
    // alphaChannel: "0.12",
    optionsObj: {
      hsl: {
        hue: { minValue: 100, maxValue: 360 },
        saturation: { minValue: 60, maxValue: 80 },
        lightness: { minValue: 80, maxValue: 100 },
        opacity: {
          // random: true,
          minValue: 0.9,
          maxValue: 1,
        },
      },
      hex: {
        red: {
          // minValue: 5,
          // maxValue: 9,
        },
        green: {
          // minValue: 0,
          // maxValue: 5,
        },
        blue: {
          // minValue: 2,
          // maxValue: 3,
        },
        opacity: {
          // random: true,
          // minValue: 12,
          // maxValue: 13,
        },
        // minValue: 0,
        // maxValue: 14,
      },
      rgb: {
        // red: { minValue: 0, maxValue: 255 },
        // green: { minValue: 0, maxValue: 255 },
        // blue: { minValue: 0, maxValue: 255 },
      },
    },
  })
);
//
