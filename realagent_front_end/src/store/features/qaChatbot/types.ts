import { ChatBotUsers } from '../../../common/enum';
import { ApiCallStatus } from '../../../services';

export type QaType = {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  __v: number;
};

export type QaChatBotConveresation = {
  text: string;
  user: ChatBotUsers;
};

export type QaChatBotHistoryFormData = {
  messages: Array<QaChatBotConveresation>;
};

export interface QaChatBotConveresationType extends QaChatBotConveresation {
  timestamp: number;
}

export type QaChatBotHistoryResponse = {
  _id: string;
  messages: Array<QaChatBotConveresationType>;
  user: QaType;
  createdAt: string;
  updatedAt: string;
  version: number;
  __v: number;
};

export interface VersionState {
  status: ApiCallStatus;
  conversations: Array<QaChatBotConveresationType>;
}
