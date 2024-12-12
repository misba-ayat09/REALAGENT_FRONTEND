import { API, APIResponse, Slug } from '../../../services';
import { QaChatBotHistoryFormData, QaChatBotHistoryResponse } from './types';

const getQaChatBotHistory = async () =>
  API.get<APIResponse<QaChatBotHistoryResponse>>({
    slug: Slug.QA_CHATBOT,
  });

const addToQaChatBotHistory = (formData: QaChatBotHistoryFormData) =>
  API.post<APIResponse<QaChatBotHistoryResponse>>({
    slug: Slug.QA_CHATBOT,
    body: formData,
  });

export const QaChatBotHistoryAPI = {
  getQaChatBotHistory,
  addToQaChatBotHistory,
};
