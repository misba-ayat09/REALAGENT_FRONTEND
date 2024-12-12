import { ConversationFlow } from '../../store/features/conversationFlow/types';

export type ConversationFlowFormData = Omit<ConversationFlow, '_id' | 'createdAt' | 'updatedAt' | 'version' | '__v'>;

export type ConversationFlowResponse = ConversationFlow;
