import { EmailLabel } from '../../common/enum/email-label.enum';
import { Schema$MessagePart } from '../../store/features/emailAgent/emailAgentAPI';
import { EmailType } from '../../store/features/emailAgent/types';

export interface SendEmailRequest {
  email: {
    from: { email: string };
    to: { email: string }[];
    subject: string;
    body: { text?: string; html?: string };
    cc: { email: string }[];
    attachments?: Schema$MessagePart[];
  };
}

export interface SendEmailResponse {
  id: string;
  threadId: string;
  labelIds: EmailLabel[];
}

export interface EmailRequest {
  query?: string;
  maxResults?: number;
  pageToken?: string;
  labelIds: EmailLabel[];
}

export type EmailResponseType = EmailType;

export interface DraftRequest {
  email: {
    from: { email: string };
    to: { email: string }[];
    subject: string;
    body: { text?: string; html?: string };
    cc: { email: string }[];
  };
}

export interface UpdateDraftBody {
  from: { email: string };
  to: { email: string }[];
  subject: string;
  body: { text?: string; html?: string };
  cc: { email: string }[];
}

// AI email generation related types
export interface AIEmailGenerationRequest {
  user_content: string;
}

export interface TemplateType {
  subject: string;
  body: string;
}

export interface AIEmailGenerationResponse {
  templates: TemplateType[];
}
