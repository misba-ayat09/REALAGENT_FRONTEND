import { ChatAPIKeyService, ChatBotService } from '../../../api/services';
import { createFetchThunk } from '../../root-store';

export default class ChatbotThunks {
  static create = createFetchThunk('Chatbot/create', ChatBotService.create);
  static findOne = createFetchThunk('Chatbot/findOne', ChatBotService.findOne);
  static update = createFetchThunk('Chatbot/update', ChatBotService.update);
  static remove = createFetchThunk('Chatbot/remove', ChatBotService.remove);

  static findApiKey = createFetchThunk('Chatbot/findApiKey', ChatAPIKeyService.findOne);
  static updateApiKey = createFetchThunk('Chatbot/updateApiKey', ChatAPIKeyService.update);
}
