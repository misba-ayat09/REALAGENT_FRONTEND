import { ApiCallStatus } from '../../../services';

export interface ConversationFlow {
  _id: string;
  introMessage: string;
  collectInfo: string;
  exitFlow: string;
  goodbye: string;
  campaign: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  __v: number;
}

export interface ConversationFlowState {
  status: ApiCallStatus;
  conversationFlowData?: ConversationFlow;
}
