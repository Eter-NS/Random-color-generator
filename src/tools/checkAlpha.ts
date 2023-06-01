export function checkAlpha(
  alphaChannel: string | number,
  desiredType: "string" | "number"
): boolean {
  switch (desiredType) {
    case "number":
      if (typeof alphaChannel === "number") {
        if (alphaChannel > 0 && alphaChannel <= 1) return true;
      }
      if (typeof alphaChannel === "string") {
        if (alphaChannel === "1" || alphaChannel.match(/0\.\d+/)) return true;
      }
      logError("number");
      return false;

    case "string":
      if (typeof alphaChannel === "string") {
        if (/^([0-9a-fA-F]{1}|[0-9a-fA-F]{2})$/.test(alphaChannel)) return true;
      }
      logError("string");
      return false;

    default:
      return false;
  }

  function logError(type: string) {
    switch (type) {
      case "number":
        throw new Error(
          "The alpha channel should be a number between 0 and 1 (for example: 0.56)"
        );
      case "string":
        throw new Error(
          "The alpha channel should be a string between 0 and F / 00 and FF (for example: 48 / B)"
        );

      default:
        throw new Error("The desiredType argument was not defined");
    }
  }
}
