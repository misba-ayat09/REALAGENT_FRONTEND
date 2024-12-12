import { Config } from '../config';

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the API.
   */
  baseURL: string;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  // Set the base URL for the API to the value from your Config.
  baseURL: Config.API_URL,

  // Set the default timeout for requests (e.g., 600 seconds).
  timeout: 600000,
};
export const DEFAULT_VAPI_API_CONFIG: ApiConfig = {
  // Set the base URL for the API to the value from your Config.
  baseURL: Config.VAPI_API_URL,

  // Set the default timeout for requests (e.g., 600 seconds).
  timeout: 600000,
};
export const DEFAULT_INTERNAL_CHATBOT_API_CONFIG: ApiConfig = {
  // Set the base URL for the API to the value from your Config.
  baseURL: Config.VITE_INTERNAL_CHATBOT_API_URL,

  // Set the default timeout for requests (e.g., 600 seconds).
  timeout: 600000,
};

export const DEFAULT_ARTICLE_API_CONFIG: ApiConfig = {
  // Set the base URL for the API to the value from your Config.
  baseURL: Config.ARTICLE_API_URL,

  // Set the default timeout for requests (e.g., 600 seconds).
  timeout: 600000,
};

export const DEFAULT_API_DATA_SOURCE_CONFIG: ApiConfig = {
  // Set the base URL for the API to the value from your Config.
  baseURL: Config.DATA_SOURCE_API_URL,

  // Set the default timeout for requests (e.g., 600 seconds).
  timeout: 600000,
};

// export const DEFAULT_API_BOT_CONFIG: ApiConfig = {
//   // Set the base URL for the API to the value from your Config.
//   baseURL: Config.BOT_API_URL,

//   // Set the default timeout for requests (e.g., 600 seconds).
//   timeout: 600000,
// };
// export const DEFAULT_API_DATA_SOURCE_CONFIG: ApiConfig = {
//   // Set the base URL for the API to the value from your Config.
//   baseURL: Config.DATA_SOURCE_API_URL,

//   // Set the default timeout for requests (e.g., 600 seconds).
//   timeout: 600000,
// };

// export const ARTICLE_API_CONFIG: ApiConfig = {
//   baseURL: Config.ARTICLES_API_URL,
//   timeout: 600000,
// };

// export const  API: ApiConfig = {
//   baseURL: Config.VITE_CHATHISTORY_API_URL,
//   timeout: 600000,
// }

// export const MEETING_API_CONFIG: ApiConfig = {
//   baseURL: Config.MEETING_API_URL,
//   timeout: 600000,
// }
