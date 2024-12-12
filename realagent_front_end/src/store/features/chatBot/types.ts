import { GenericState } from '../../root-store/type';

export interface ChatbotType {
  _id: string;
  displayName: string;
  initialMessage: string;
  suggestedMessage: string;
  messagePlaceholder: string;
  chatbotProfilePicture: string;
  thumbnailVideo: string;
  introVideo: string;
  embedUrl: string;
}

export interface ChatAPIKey {
  apiKey: string;
  apiKeyId: string;
  userId: string;
}

export interface ChatbotState extends GenericState {
  chatbots: ChatbotType[];
  apiKeys: ChatAPIKey[];
}
