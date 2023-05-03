import { RandomColorGenerator } from "./dist/ts/rcc";

const button = document.querySelector(".submit-button");
const preview = document.querySelector(".color-preview");

button.addEventListener("click", (e) => {
  preview.styles.backgroundColor = RandomColorGenerator("rgb");
});
