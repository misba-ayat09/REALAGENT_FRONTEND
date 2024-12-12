import { createFetchThunk } from '../../root-store';
import { UserChatBotService } from '../../../api/services';

export default class UserChatbotThunks {
  static addToUserChatBotHistory = createFetchThunk(
    'UserChatBot/addToUserChatBotHistory',
    UserChatBotService.addToUserChatBotHistory,
  );
  static getChatHistory = createFetchThunk('UserChatBot/getChatHistory', UserChatBotService.getChatHistory);
  static getAllQuestionAnswers = createFetchThunk(
    'UserChatBot/getAllQuestionAnswers',
    UserChatBotService.getAllQuestionAnswers,
  );
}
