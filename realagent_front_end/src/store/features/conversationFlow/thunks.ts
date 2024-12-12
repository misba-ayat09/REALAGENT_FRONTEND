import ConversationFlowService from '../../../api/services/ConversationFlowService';
import { createFetchThunk } from '../../root-store';

export default class ConversationFlowThunks {
  static create = createFetchThunk('ConversationFlow/create', ConversationFlowService.create);
  static find = createFetchThunk('ConversationFlow/find', ConversationFlowService.find);
  static update = createFetchThunk('ConversationFlow/update', ConversationFlowService.update);
  static remove = createFetchThunk('ConversationFlow/remove', ConversationFlowService.remove);
}
