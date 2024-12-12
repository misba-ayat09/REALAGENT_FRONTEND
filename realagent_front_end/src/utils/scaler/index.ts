// Function to calculate scaled value based on the value of the CSS variable --scale-factor
export function scaler(value: number): number {
  // Get the computed value of the CSS variable --scale-factor
  const scaleFactor: string = getComputedStyle(document.documentElement).getPropertyValue(
    "--scale-factor"
  );

  // Convert the scaleFactor to a number
  const parsedScaleFactor: number = parseFloat(scaleFactor);

  // Check if parsedScaleFactor is a valid number
  if (!isNaN(parsedScaleFactor)) {
    // Calculate the scaled value using the scaleFactor
    const scaledValue: number = value * parsedScaleFactor;

    // Return the scaled value
    return scaledValue;
  } else {
    // If scaleFactor is not a valid number, return the original value
    return value;
  }
}
