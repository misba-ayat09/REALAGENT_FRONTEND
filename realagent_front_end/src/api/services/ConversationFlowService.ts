import { API, APIResponse, Slug } from '../../services';
import { ConversationFlowFormData, ConversationFlowResponse } from '../types';

export default class ConversationFlowService {
  static create = (body: Partial<ConversationFlowFormData>) =>
    API.post<APIResponse<ConversationFlowResponse>>({
      slug: Slug.CONVERSATION_FLOW,
      body,
    });

  static find = () =>
    API.get<APIResponse<ConversationFlowResponse>>({
      slug: Slug.CONVERSATION_FLOW,
    });

  static update = (body: Partial<ConversationFlowFormData>) =>
    API.patch<APIResponse<ConversationFlowResponse>>({
      slug: Slug.CONVERSATION_FLOW,
      body,
    });

  static remove = () =>
    API.delete<APIResponse<ConversationFlowResponse>>({
      slug: Slug.CONVERSATION_FLOW,
    });
}
