export enum ValidationPattern {
  AlphabetsOnly = 1,
  NumbersOnly = 2,
  Email = 3,
  Phone = 4,
  URL = 5,
  Username = 6,
  Password = 7,
  AlphaWithDotSpace = 8,
  AlphaWithDotSpaceNumber = 9
}

export const ValidationRegex: Record<ValidationPattern, RegExp> = {
  [ValidationPattern.AlphabetsOnly]: /^[a-zA-Z]+$/,
  [ValidationPattern.NumbersOnly]: /^[0-9]+$/,
  [ValidationPattern.Email]: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  [ValidationPattern.Phone]: /^\+?[0-9]+$/,
  [ValidationPattern.URL]: /^(ftp|http|https):\/\/[^ "]+$/,
  [ValidationPattern.Username]: /^[a-zA-Z0-9_]+$/,
  [ValidationPattern.Password]: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  [ValidationPattern.AlphaWithDotSpace]: /^[a-zA-Z\s.]*$/,
  [ValidationPattern.AlphaWithDotSpaceNumber]: /^[a-zA-Z0-9.\s]*$/
};

export function validateInput(input: string, pattern: RegExp): boolean {
  return pattern.test(input);
}

export interface NotificationParams {
  title: string;
  message: string;
}

export const validateAndNotify = (
  validate: (value: string | undefined) => boolean,
  value: string | undefined,
  notificationParams: NotificationParams,
  failedValidations: NotificationParams[]
) => {
  if (!validate(value)) {
    failedValidations.push(notificationParams);
    return false;
  }
  return true;
};

export const isValidBasicUrl = (url: string): boolean => {
  const urlPattern = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/; // Matches domain like example.com
  return urlPattern.test(url);
};

export function isTruthy(value: unknown): boolean {
  if (Array.isArray(value)) {
    return value?.length > 0;
  }

  if (value && typeof value === 'object') {
    return Object.keys(value)?.length > 0;
  }

  return !!value;
}
