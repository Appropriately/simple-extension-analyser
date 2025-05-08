// Utility functions to handle BigInt values in Redux.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#use_within_json

const replacer = (_: string, value: unknown) => {
  switch (typeof value) {
    case "bigint":
      return { $bigint: value.toString() };
    default:
      return value;
  }
};

const reviver = (_: string, value: unknown) => {
  if (
    value !== null &&
    typeof value === "object" &&
    "$bigint" in value &&
    typeof value.$bigint === "string"
  ) {
    return BigInt(value.$bigint);
  }

  return value;
};

export { replacer, reviver };
