/**
 * Formats a meeting time as a string in 12-hour clock format (e.g., "02:30 PM").
 * @param date - The date representing the meeting time as a Date object or a string in ISO format.
 * @returns The formatted meeting time as a string.
 */
export const formatMeetingTime = (date: Date | string | number, isHour12 = true): string => {
  // Convert input to a Date object
  const meetingStart = new Date(date);

  // Check if the Date object is valid
  if (isNaN(meetingStart.getTime())) {
    throw new Error('Invalid date input');
  }

  return new Intl.DateTimeFormat('en', {
    hour12: isHour12,
    hour: '2-digit',
    minute: '2-digit',
  }).format(meetingStart);
};

/**
 * Calculates the time difference in hours between two dates.
 * @param start - The start date as a Date object or a string in ISO format.
 * @param end - The end date as a Date object or a string in ISO format.
 * @returns The time difference in hours as a number.
 */
export const getTimeDifferenceInHours = (start: Date | string, end: Date | string): number => {
  const startDate = typeof start === 'string' ? new Date(start) : start;
  const endDate = typeof end === 'string' ? new Date(end) : end;

  const timeDiffInMilliseconds = Math.abs(endDate?.getTime() - startDate?.getTime());
  const timeDiffInHours = timeDiffInMilliseconds / (1000 * 60 * 60);

  if (timeDiffInHours === Math.floor(timeDiffInHours)) {
    return Math.floor(timeDiffInHours);
  } else if (timeDiffInHours === Math.ceil(timeDiffInHours)) {
    return Math.ceil(timeDiffInHours);
  } else {
    return Number(timeDiffInHours.toFixed(2));
  }
};

/**
 * Formats a date as a string in "Month Day" format (e.g., "September 05").
 * @param date - The date to format as a Date object or a string in ISO format.
 * @returns The formatted date as a string.
 */
export const formatDateToMonthDay = (date: Date | string): string => {
  const inputDate = typeof date === 'string' ? new Date(date) : date;

  return inputDate.toLocaleDateString(undefined, {
    month: 'long',
    day: '2-digit',
  });
};

export const formatDateToDayMonth = (date: Date | string): string => {
  const inputDate = typeof date === 'string' ? new Date(date) : date;

  return inputDate.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
  });
};

/**
 * Calculates the age based on the provided date of birth.
 * @param dateOfBirth - The date of birth as a Date object or a string in ISO format.
 * @returns The calculated age as a number.
 */
export const calculateAge = (dateOfBirth: Date | string): number => {
  const dob = typeof dateOfBirth === 'string' ? new Date(dateOfBirth) : dateOfBirth;
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();

  if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
    return age - 1;
  }

  return age;
};

/**
 * Represents a time with hours, minutes, and seconds.
 */
export interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Calculates the time difference between two dates (in Date or string format)
 * and returns it as a Time object. If the difference is negative, it returns
 * { hours: 0, minutes: 0, seconds: 0 }.
 * @param date1 - The first Date object or date string.
 * @param date2 - (Optional) The second Date object or date string. If not provided, it defaults to the current date.
 * @returns A Time object representing the time difference.
 */
export const getTimeDifference = (date1: Date | string, date2?: Date | string): Time => {
  // Convert date strings to Date objects if needed
  const firstDate = date1 instanceof Date ? date1 : new Date(date1);
  const secondDate = date2 ? (date2 instanceof Date ? date2 : new Date(date2)) : new Date();

  // Calculate the time difference in milliseconds
  const timeDifferenceMillis: number = firstDate.getTime() - secondDate.getTime();

  if (timeDifferenceMillis < 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  // Calculate hours, minutes, and seconds
  const hours: number = Math.floor(timeDifferenceMillis / 3600000); // 1 hour = 3600000 milliseconds
  const remainingMillis: number = timeDifferenceMillis % 3600000;
  const minutes: number = Math.floor(remainingMillis / 60000); // 1 minute = 60000 milliseconds
  const seconds: number = Math.floor((remainingMillis % 60000) / 1000); // 1 second = 1000 milliseconds

  return {
    hours,
    minutes,
    seconds,
  };
};

/**
 * Converts a date or date string in IST (Indian Standard Time) to ISO 8601 format.
 * @param {Date | string} date - The date or date string in IST format.
 * @returns {string} The date in ISO 8601 format.
 */
export const convertISTtoISO = (date: Date | string): string => {
  let istDate: Date;

  if (typeof date === 'string') {
    // If the input is a string, parse it to create a Date object
    istDate = new Date(date);
  } else if (date instanceof Date) {
    // If the input is already a Date object, use it directly
    istDate = date;
  } else {
    throw new Error('Invalid input. Please provide a valid Date object or date string.');
  }

  // Calculate the UTC time by subtracting the IST offset in minutes
  const utcDate: Date = new Date(istDate.getTime() - istDate.getTimezoneOffset() * 60000);

  // Format the UTC date as an ISO 8601 string
  const isoString: string = utcDate.toISOString();

  return isoString;
};

/**
 * Calculates the total time in seconds from a Time object.
 * @param time - The Time object to calculate the time from.
 * @returns The total time in seconds.
 */
export const getTimeInSeconds = (time: Time): number => time.hours * 3600 + time.minutes * 60 + time.seconds;

/**
 * Formats a Time object into a human-readable string.
 * @param time - The Time object to format.
 * @returns A string in the format "X hours, Y minutes, Z seconds".
 */
export const formatTime = (time: Time, withLabel = true): string => {
  const totalSeconds = getTimeInSeconds(time);
  const formattedHours = Math.floor(totalSeconds / 3600);
  const formattedMinutes = Math.floor((totalSeconds % 3600) / 60);
  const formattedSeconds = totalSeconds % 60;

  return withLabel
    ? `${formattedHours} hours, ${formattedMinutes} minutes, ${formattedSeconds} seconds`
    : `${formattedHours}:${formattedMinutes}`;
};

/**
 * Formats a date as a custom string in the format "Wednesday, 20 September 2023".
 *
 * @param {Date | string | null} date - The date to format, which can be a Date object, a string representation of a date, or null.
 * @returns {string} The formatted date string or an empty string if the input is invalid.
 */
export const formatDateToCustomString = (date: Date | string | null): string => {
  if (date === null) {
    return '';
  }

  let dateObj: Date;

  if (typeof date === 'string') {
    // Try to parse the string as a Date
    dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
      // Parsing failed, return an empty string
      return '';
    }
  } else if (date instanceof Date) {
    dateObj = date;
  } else {
    // Invalid input, return an empty string
    return '';
  }

  const daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayOfWeek: string = daysOfWeek[dateObj.getDay()];
  const day: number = dateObj.getDate();
  const month: string = months[dateObj.getMonth()];
  const year: number = dateObj.getFullYear();

  return `${dayOfWeek}, ${day} ${month} ${year}`;
};

export function parseToISOString(input: string | Date | null | undefined): string | null {
  if (input === null || input === undefined) {
    return null;
  }

  let parsedValue;

  if (typeof input === 'string') {
    parsedValue = new Date(input);
  } else if (input instanceof Date) {
    parsedValue = input;
  } else {
    console.error('Invalid input type. Expected string or Date.');
    return null;
  }

  if (!isNaN(parsedValue.getTime())) {
    return parsedValue.toISOString();
  } else {
    console.error(`Invalid date or datetime value`);
    return null;
  }
}

export enum DateComparison {
  Yesterday = 'yesterday',
  Today = 'today',
  Tomorrow = 'tomorrow',
  OtherDay = 'other',
}

export const areDatesEqual = (dateA: Date, dateB: Date): boolean => dateA.toDateString() === dateB.toDateString();

export function formatTimeTo12HourFormat(time: string | undefined): string {
  if (time === undefined) {
    console.error('Missing required parameter: time');
    return '';
  }

  const [hours, minutes] = time.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) {
    console.error('Invalid time format');
    return '';
  }

  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function formatDateTimePeriod(
  startDate: Date | string | undefined,
  startTime: string | undefined,
  endDate: Date | string | undefined,
  endTime: string | undefined,
): string {
  // Check for undefined cases
  if (startDate === undefined || startTime === undefined || endDate === undefined || endTime === undefined) {
    return 'Missing date or time information';
  }

  // Convert startDate and endDate to Date objects if they are strings
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  // Check if start or end dates are invalid
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 'Invalid date format';
  }

  // Format start and end dates
  const startDateString = start.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const endDateString = end.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  // Format start and end times
  const formattedStartTime = formatTimeTo12HourFormat(startTime);
  const formattedEndTime = formatTimeTo12HourFormat(endTime);

  // Check if start or end times are invalid
  if (!formattedStartTime || !formattedEndTime) {
    return 'Invalid time format';
  }

  // Check if start and end dates are the same
  if (start.toDateString() === end.toDateString()) {
    return `${startDateString} ${formattedStartTime} - ${formattedEndTime}`;
  } else {
    return `${startDateString} ${formattedStartTime} - ${endDateString} ${formattedEndTime}`;
  }
}

export function combineDateTime(dateValue: string | Date | undefined, timeStr: string | undefined): Date | null {
  // Check if dateValue is undefined
  if (dateValue === undefined) {
    console.error('Date value is undefined');
    return null;
  }

  let date: Date;

  // If dateValue is a string, parse it to a Date object
  if (typeof dateValue === 'string') {
    date = new Date(dateValue);
    // Check if the parsing was successful
    if (isNaN(date.getTime())) {
      console.error('Invalid date string');
      return null;
    }
  } else {
    date = dateValue;
  }

  // Check if timeStr is undefined
  if (timeStr === undefined) {
    console.error('Time string is undefined');
    return null;
  }

  // Split the time string
  const [hours, minutes] = timeStr.split(':').map(Number);

  // Set the time values to the Date object
  date.setHours(hours);
  date.setMinutes(minutes);

  return date;
}

// Define a function that takes a string as input and validates if it's in date format
export function validateDate(input?: string): Date {
  // Check if the input is undefined or null
  if (input === undefined || input === null) {
    // If input is undefined or null, return the current date
    return new Date();
  }

  // Create a regex pattern to match the date format (YYYY-MM-DD)
  const dateFormatPattern = /^\d{4}-\d{2}-\d{2}$/;

  // Check if the input string matches the date format pattern
  if (dateFormatPattern.test(input)) {
    // If it's a valid date format, parse the input string to a Date object and return
    return new Date(input);
  } else {
    // If not a valid date format, return the current date
    return new Date();
  }
}

export function formatDate(input?: Date | string | number): string {
  const date = input ? (input instanceof Date ? input : new Date(input)) : new Date();

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date input');
  }

  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedTime = date.toLocaleString('en-US', options);

  if (isToday) {
    return `${formattedTime} | Today`;
  } else {
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    return `${formattedTime} | ${formattedDate}`;
  }
}
export function checkForIntepretableDate(inputDate: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const isToday =
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear();

  const isYesterday =
    inputDate.getDate() === yesterday.getDate() &&
    inputDate.getMonth() === yesterday.getMonth() &&
    inputDate.getFullYear() === yesterday.getFullYear();

  if (isToday) {
    return 'Today';
  } else if (isYesterday) {
    return 'Yesterday';
  } else {
    return formatDateToCustomString(inputDate);
  }
}

export const getDayLabel = (dateString?: string | number | Date) => {
  if (!dateString) {
    return '';
  }
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  const yesterday = new Date(today);

  tomorrow.setDate(today.getDate() + 1);
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    // const suffix =
    //   day % 10 === 1 && day !== 11
    //     ? 'st'
    //     : day % 10 === 2 && day !== 12
    //     ? 'nd'
    //     : day % 10 === 3 && day !== 13
    //     ? 'rd'
    //     : 'th';
    return (
      <span>
        {month} {day}
        {/* <sup>{suffix}</sup> */}
      </span>
    );
  }
};

export const timeSince = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years ago';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months ago';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days ago';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago';
  }
  return Math.floor(seconds) + ' seconds ago';
};

export const formatDateOrToday = (input: Date | string): string => {
  const inputDate = new Date(input);
  const today = new Date();

  // Check if the date is today
  const isToday = inputDate.toDateString() === today.toDateString();

  return isToday ? 'Today' : inputDate.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
};

export const formatTimeFromDate = (input: Date | string): string => {
  const inputDate = new Date(input);

  return inputDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }); // Only time
};
