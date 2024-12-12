import { Config } from '../../config';
import { API, APIResponse, Slug } from '../../services';
import {
  AnswerQuestionsResponse,
  ChatWithAIBotResponse,
  QuestionAnswersResponse,
  UserChatBotHistoryFormData,
  UserChatBotHistoryResponse,
} from '../types';

export default class UserChatBotService {
  static getChatHistory = () =>
    API.get<APIResponse<UserChatBotHistoryResponse>>({
      slug: Slug.USER_CHATBOT,
    });

  static addToUserChatBotHistory = (formData: UserChatBotHistoryFormData) =>
    API.post<APIResponse<UserChatBotHistoryResponse>>({
      slug: Slug.USER_CHATBOT,
      body: formData,
    });

  static answerQuestions = async (userId: string, username: string, userInput: string) => {
    const url = `${Config.BOT_CHAT_URL}/qa_assistant/`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '7B9X-F2H5-R8M1-T6P3',
      },
      body: JSON.stringify({
        user_id: userId,
        username: username,
        user_input: userInput,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = (await response.json()) as AnswerQuestionsResponse;

    return data;
  };

  static getAllQuestionAnswers = async (userId: string) => {
    const url = `${Config.BOT_CHAT_URL}/get_qa/${userId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '7B9X-F2H5-R8M1-T6P3',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = (await response.json()) as QuestionAnswersResponse;

    return data?.question_answers ?? [];
  };

  static chatWithAIBot = async (userId: string, userInput: string) => {
    const url = `${Config.BOT_CHAT_URL}/inchat/`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '7B9X-F2H5-R8M1-T6P3',
      },
      body: JSON.stringify({
        user_id: userId,
        user_message: userInput,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = (await response.json()) as ChatWithAIBotResponse;

    return data;
  };
}
