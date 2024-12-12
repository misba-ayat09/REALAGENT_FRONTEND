import { API, APIResponse, Slug } from '../../services';
import { ChatAPIKeyFormData, ChatAPIKeyResponse } from '../types';

export default class ChatAPIKeyService {
  static create = (body: ChatAPIKeyFormData = {}) =>
    API.post<APIResponse<ChatAPIKeyResponse>>({
      slug: Slug.APIKEY,
      body,
    });

  static findOne = () =>
    API.get<APIResponse<ChatAPIKeyResponse>>({
      slug: Slug.APIKEY,
    });

  static update = (body: ChatAPIKeyFormData = {}) =>
    API.put<APIResponse<ChatAPIKeyResponse>>({
      slug: Slug.APIKEY,
      body,
    });

  static remove = () =>
    API.delete<APIResponse<{ message: string }>>({
      slug: Slug.APIKEY,
    });
}
