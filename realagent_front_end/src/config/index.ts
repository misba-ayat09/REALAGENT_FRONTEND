interface Config {
  readonly MODE: string;
  readonly API_URL: string;
  readonly BOT_CHAT_URL: string;
  readonly ARTICLE_API_URL: string;
  readonly TEXT_TO_SPEECH_API_URL: string;
  readonly GENERATE_CONTENT_API_URL: string;
  readonly VAPI_API_URL: string;
  readonly MEET_DOMAIN: string;
  readonly DATA_SOURCE_API_URL: string;
  readonly AI_EMAIL_AGENT: string;
  readonly VITE_INTERNAL_CHATBOT_API_URL: string;
  readonly SM_BASE_URL: string;
}

const getConfigValue = <T>(key: string, defaultValue: T): T => {
  return import.meta.env[key] ? (import.meta.env[key] as T) : defaultValue;
};

const BaseConfig: Config = {
  MODE: getConfigValue<string>('MODE', 'development'),
  API_URL: getConfigValue<string>('VITE_BASE_URL', ''),
  BOT_CHAT_URL: getConfigValue<string>('VITE_BOT_CHAT_API_URL', ''),
  ARTICLE_API_URL: getConfigValue<string>('VITE_ARTICLE_API_URL', ''),
  VAPI_API_URL: getConfigValue<string>('VITE_VAPI_BASE_URL', ''),
  TEXT_TO_SPEECH_API_URL: getConfigValue<string>('VITE_TEXT_TO_SPEECH_API_URL', ''),
  GENERATE_CONTENT_API_URL: getConfigValue<string>('VITE_GENERATE_CONTENT_API_URL', ''),
  AI_EMAIL_AGENT: getConfigValue<string>('VITE_AI_EMAIL_API_URL', ''),
  MEET_DOMAIN: getConfigValue<string>('VITE_MEET_DOMAIN', ''),
  VITE_INTERNAL_CHATBOT_API_URL: getConfigValue<string>('VITE_INTERNAL_CHATBOT_API_URL', ''),
  // BOT_API_URL: getConfigValue<string>("VITE_BOT_API_URL", ""),
  // ARTICLES_API_URL: getConfigValue<string>("VITE_ARTICLE_URL", ""),
  DATA_SOURCE_API_URL: getConfigValue<string>('VITE_DATASOURCE_API_URL', ''),
  SM_BASE_URL: getConfigValue<string>('VITE_SM_BASE_URL', ''),
};

export const Config: Readonly<Config> = { ...BaseConfig };
