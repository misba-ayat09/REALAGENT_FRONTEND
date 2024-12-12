import { Config } from '../../config';
import { API, APIResponse, Slug } from '../../services';
import {
  SendEmailRequest,
  SendEmailResponse,
  EmailRequest,
  EmailResponseType,
  DraftRequest,
  UpdateDraftBody,
  AIEmailGenerationRequest,
  AIEmailGenerationResponse,
} from '../types';

export default class EmailService {
  static processMail = () =>
    API.post<APIResponse<SendEmailResponse>>({
      slug: Slug.PROCESS_MAIL,
    });

  static getEmails = (params: EmailRequest) =>
    API.post<APIResponse<EmailResponseType[]>>({
      slug: Slug.GET_INBOX,
      body: params,
    });

  static getEmail = (threadId: string) =>
    API.get<APIResponse<EmailResponseType>>({
      slug: Slug.GET_MAIL + `/${threadId}`,
    });

  static sendEmail = (body: SendEmailRequest) =>
    API.post<APIResponse<SendEmailResponse>>({
      slug: Slug.SEND_EMAIL,
      body,
    });

  static saveAsDraft = (body: DraftRequest) =>
    API.post<APIResponse<EmailResponseType>>({
      slug: Slug.SAVE_AS_DRAFT,
      body,
    });

  static updateDraft = (id: string, body: UpdateDraftBody) =>
    API.patch<APIResponse<SendEmailResponse>>({
      slug: Slug.SAVE_AS_DRAFT,
      body: {
        draftId: id,
        email: body,
      },
    });

  static getAllDrafts = () =>
    API.get<APIResponse<EmailResponseType[]>>({
      slug: Slug.SAVE_AS_DRAFT,
    });

  static getDraft = (id: string) =>
    API.get<APIResponse<EmailResponseType>>({
      slug: `${Slug.SAVE_AS_DRAFT}/${id}`,
    });

  static deleteDraft = (id: string) =>
    API.delete<APIResponse<SendEmailResponse>>({
      slug: `${Slug.SAVE_AS_DRAFT}/${id}`,
    });

  static getSignature = () =>
    API.get<APIResponse<string>>({
      slug: Slug.SIGNATURE,
    });

  static updateSignature = (signature: string) =>
    API.put<APIResponse<string>>({
      slug: Slug.SIGNATURE,
      body: { signature },
    });

  // AI email generation service
  static generateAIEmail = async (body: AIEmailGenerationRequest) => {
    try {
      const url = Config.AI_EMAIL_AGENT + Slug.GENERATE_AI_EMAIL;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data: AIEmailGenerationResponse = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
}
