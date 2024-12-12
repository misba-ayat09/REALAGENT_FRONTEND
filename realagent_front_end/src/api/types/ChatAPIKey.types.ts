import { ChatAPIKey } from '../../store/features/chatBot/types';

export type ChatAPIKeyFormData = NonNullable<unknown>;

export interface ChatAPIKeyResponse extends ChatAPIKey {}
