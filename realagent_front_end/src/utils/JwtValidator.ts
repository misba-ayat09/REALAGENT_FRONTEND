import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  id?: string;
  userId?: string;
  email?: string;
  sessionId?: string;
  iat?: number;
  exp?: number;
  [key: string]: unknown;
}

export class JwtValidator {
  private static instance: JwtValidator;
  // private readonly timeOffset: number = 5 * 60 * 1000; // 5 minutes offset in milliseconds

  private constructor() {}

  public static getInstance(): JwtValidator {
    if (!JwtValidator.instance) {
      JwtValidator.instance = new JwtValidator();
    }
    return JwtValidator.instance;
  }

  public validateToken(token: string | null): boolean {
    try {
      if (!token || typeof token !== 'string') {
        console.error('Invalid token: Token is either null or not a string.');
        return false;
      }

      const decodedToken: JwtPayload = jwtDecode<JwtPayload>(token);

      if (!decodedToken.exp) {
        console.error('Invalid token: Missing expiration time (exp).');
        return false;
      }

      // Adjust local time with the fixed time offset
      const adjustedCurrentTime = Date.now();
      const expirationTime = decodedToken.exp * 1000;

      if (adjustedCurrentTime >= expirationTime) {
        console.error('Token has expired.');
        return false;
      }

      // Calculate remaining time
      // const remainingTimeMs = expirationTime - adjustedCurrentTime;
      // const remainingSeconds = Math.floor(remainingTimeMs / 1000) % 60;
      // const remainingMinutes = Math.floor(remainingTimeMs / (1000 * 60)) % 60;
      // const remainingHours = Math.floor(remainingTimeMs / (1000 * 60 * 60));

      // console.log(
      //   `Token is valid. Time remaining: ${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds.`,
      // );

      // Optional: Validate other fields (e.g., sessionId)
      if (!decodedToken.sessionId) {
        console.error('Invalid token: Missing sessionId.');
        return false;
      }

      return true; // Token is valid if all checks pass
    } catch (error) {
      console.error('Error validating token:', error);
      return false; // Return false in case of any error during validation
    }
  }
}

const jwtValidator = JwtValidator.getInstance(); // Get the singleton instance
const validateToken = jwtValidator.validateToken.bind(jwtValidator); // Bind the method to the instance

export { validateToken };
