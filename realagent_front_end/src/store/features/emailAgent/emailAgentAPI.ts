import { EmailLabel } from "../../../common/enum/email-label.enum";
import { API, APIResponse, Slug } from "../../../services"; 

export interface Schema$MessagePart {
  body?: Schema$MessagePartBody;
  filename?: string | null;
  headers?: Schema$MessagePartHeader[];
  mimeType?: string | null;
  partId?: string | null;
  parts?: Schema$MessagePart[];
}

export interface Schema$MessagePartBody {
  data?: string | null; // Base64-encoded data
  size?: number | null; // File size in bytes
}

export interface Schema$MessagePartHeader {
  name?: string | null;
  value?: string | null;
}

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

export interface InboxEmailType {
  id: string;
  threadId: string;
  subject: string;
  from: string[];
  to: string[];
  cc?: string[]; // Optional cc field
  bcc?: string[]; // Optional bcc field
  contentType: string;
  mimeType: string;
  internalDate: string;
  body:string
  preview:string
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

export interface InboxEmailType {}

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
  email: {
    from: { email: string };
    to: { email: string }[];
    subject: string;
    body: { text?: string; html?: string };
    cc: { email: string }[];
  };
  draftId: string;
}

const sendEmail = async (body: SendEmailRequest) =>
  await API.post<APIResponse<SendEmailResponse>>({ slug: Slug.SEND_EMAIL, body });

// process your gmails
const processMail = async () => await API.post<APIResponse<SendEmailResponse>>({ slug: Slug.PROCESS_MAIL });

const getInbox = async (body: EmailRequest) =>
  await API.post<APIResponse<InboxEmailType[]>>({ slug: Slug.GET_INBOX, body });

const getMessage = async (id: string) =>{
  return await API.post<APIResponse<InboxEmailType>>({ slug: Slug.GET_MAIL ,body: { threadId: id }});
}
const saveAsDraft = async (body:DraftRequest) =>
  await API.post<APIResponse<InboxEmailType>>({ slug: Slug.SAVE_AS_DRAFT,body });

const updateDraft = async (body:UpdateDraftBody) =>
  await API.patch<APIResponse<SendEmailResponse>>({ slug: Slug.SAVE_AS_DRAFT,body });

const getAllDrafts = async () =>
  await API.get<APIResponse<InboxEmailType[]>>({ slug: Slug.SAVE_AS_DRAFT });

const getDraft = async (id:string) =>
  await API.get<APIResponse<InboxEmailType>>({ slug: Slug.SAVE_AS_DRAFT +`/${id}` });

const getSignature = async () =>
  await API.get<APIResponse<string>>({ slug: Slug.SIGNATURE});

const updateSignature = async (signature:string) =>
  await API.put<APIResponse<string>>({ slug: Slug.SIGNATURE,
    body: {
      signature
    }
  });


const deleteDraft = async (id:string) =>
  await API.delete<APIResponse<SendEmailResponse>>({ slug: Slug.SAVE_AS_DRAFT + `/${id}` });

export const emailAgentAPI = { sendEmail,updateSignature, getSignature, processMail, getInbox ,getMessage,saveAsDraft, updateDraft, deleteDraft, getAllDrafts, getDraft};
