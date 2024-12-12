type ScalarOptions = {
  unit?: string; // Unit of measurement (e.g., "px", "em", "rem")
  defaultScale?: number; // Fallback scale factor if CSS variable is not available
};

/**
 * Generates a CSS calc function that scales a value by a scale factor.
 *
 * @param {number} val - The value to be scaled.
 * @param {ScalarOptions} options - Options for the scaling function.
 * @param {string} [options.unit='px'] - Unit of measurement (e.g., "px", "em", "rem").
 * @param {number} [options.defaultScale=1] - Fallback scale factor if CSS variable is not available.
 * @return {string} A CSS calc function that scales the value by the scale factor.
 */
const scalar = (val: number, { unit = 'px', defaultScale = 1 }: ScalarOptions = {}): string => {
  const scaleVar = `var(--scale-factor, ${defaultScale})`;
  return `calc(${val}${unit} * ${scaleVar})`;
};

export default scalar;
