import { API, APIResponse, Slug } from '../../services';
import { ChatbotFormData, ChatbotResponse } from '../types';

export default class ChatBotService {
  static create = () =>
    API.post<APIResponse<{ message: string }>>({
      slug: Slug.CHATBOT,
      body: {},
    });

  static findOne = () =>
    API.get<APIResponse<ChatbotResponse>>({
      slug: Slug.CHATBOT,
    });

  static update = (formData: ChatbotFormData) =>
    API.patch<APIResponse<ChatbotResponse>>({
      slug: Slug.CHATBOT,
      body: formData,
    });

  static remove = () =>
    API.delete<APIResponse<{ message: string }>>({
      slug: Slug.CHATBOT,
      body: {},
    });
  }
