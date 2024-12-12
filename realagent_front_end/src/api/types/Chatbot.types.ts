import { ChatbotType } from '../../store/features/chatBot/types';

export interface ChatbotFormData extends Partial<Omit<ChatbotType, '_id'>> {}

export interface ChatbotResponse extends ChatbotType {
  user: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  __v: number;
}
