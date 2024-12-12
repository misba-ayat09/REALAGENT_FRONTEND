import { ChatBotUsers } from '../../common/enum';
import { QaType } from '../../store/features/userChatBot';

export type UserChatBotConveresation = {
  text: string;
  user: ChatBotUsers;
  timestamp: number;
  isSetupConversation?: boolean;
};

export type UserChatBotHistoryFormData = {
  messages: Array<Partial<Omit<UserChatBotConveresation, 'timestamp'>>>;
};

export interface UserChatBotHistoryResponse {
  _id: string;
  messages: Array<UserChatBotConveresation>;
  user: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  __v: number;
}

export interface AnswerQuestionsResponse {
  ai_response: string;
  status: 'pending' | 'success';
  question_number: number;
}

export interface QuestionAnswersResponse {
  question_answers: QaType[];
}

export interface ChatWithAIBotResponse {
  response: string;
  status: string;
}
