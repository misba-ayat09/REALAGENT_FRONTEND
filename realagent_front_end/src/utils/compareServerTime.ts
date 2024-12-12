/**
 * Compares the server time with the local time and checks if they match within a specified tolerance.
 *
 * @param {Date} serverTime - The server's current time.
 * @param {number} [toleranceInSeconds=60] - The tolerance in seconds for time comparison. Defaults to 60 seconds.
 * @returns {boolean} True if the times match within the tolerance, false otherwise.
 */
export const compareServerTime = (serverTime: Date, toleranceInSeconds = 60): boolean => {
  try {
    if (!(serverTime instanceof Date) || typeof toleranceInSeconds !== 'number' || toleranceInSeconds < 0) {
      throw new Error('Invalid input types for compareServerTime');
    }

    const localTime = new Date();

    // Calculate the time difference in seconds
    const timeDifferenceInSeconds = Math.abs((serverTime.getTime() - localTime.getTime()) / 1000);

    // Check if the time difference exceeds the tolerance
    if (timeDifferenceInSeconds > toleranceInSeconds) {
      return false; // Time doesn't match
    }

    return true; // Time matches within the tolerance
  } catch (error) {
    console.error('Error comparing server time with local time:', error);
    return false; // Assume an error means time doesn't match
  }
};
