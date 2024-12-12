import { EmailLabel } from '../../../common/enum/email-label.enum';
import { ApiCallStatus } from '../../../services';
import { Schema$MessagePart } from './emailAgentAPI';

export interface EmailType {
  id: string;
  threadId: string;
  subject: string;
  from: string[];
  to: string[];
  cc?: string[];
  bcc?: string[];
  contentType: string;
  mimeType: string;
  internalDate: string;
  body: string;
  preview: string;
  attachments?: Schema$MessagePart[];
}

export interface EmailAgentState {
  status: ApiCallStatus;
  emails: Partial<Record<EmailLabel, EmailType[]>>;
}
