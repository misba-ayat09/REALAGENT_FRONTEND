import { UserChatBotConveresation } from '../../../api/types';
import { ApiCallStatus } from '../../../services';

export type QaType = {
  question: string;
  answer: string;
};

export interface UserChatBotState {
  status: ApiCallStatus;
  isQACompleted: boolean;
  conversations: Array<UserChatBotConveresation>;
  questionAnswers: QaType[];
}
