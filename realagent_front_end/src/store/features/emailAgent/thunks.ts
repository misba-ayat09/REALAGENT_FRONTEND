import EmailService from '../../../api/services/EmailService';
import { EmailRequest, UpdateDraftBody } from '../../../api/types';
import { EmailLabel } from '../../../common/enum/email-label.enum';
import { createFetchThunk } from '../../root-store';

export default class EmailThunks {
  static sendEmail = createFetchThunk('Email/sendEmail', EmailService.sendEmail);

  static getEmail = createFetchThunk('Email/getEmail', EmailService.getEmail);

  static getEmails = createFetchThunk('Email/getEmails', EmailService.getEmails);

  static getImportant = createFetchThunk('Email/getImportant', (params: Omit<EmailRequest, 'labelIds'>) =>
    EmailService.getEmails({ ...params, labelIds: [EmailLabel.IMPORTANT] }),
  );

  static getSpam = createFetchThunk('Email/getSpam', (params: Omit<EmailRequest, 'labelIds'>) =>
    EmailService.getEmails({ ...params, labelIds: [EmailLabel.SPAM] }),
  );

  static getEnquiry = createFetchThunk('Email/getEnquiry', (params: Omit<EmailRequest, 'labelIds'>) =>
    EmailService.getEmails({ ...params, labelIds: [EmailLabel.CATEGORY_REAL_ESTATE_ENQUIRY] }),
  );

  static getMeeting = createFetchThunk('Email/getMeeting', (params: Omit<EmailRequest, 'labelIds'>) =>
    EmailService.getEmails({ ...params, labelIds: [EmailLabel.CATEGORY_REAL_ESTATE_MEETING] }),
  );

  static getOther = createFetchThunk('Email/getOther', (params: Omit<EmailRequest, 'labelIds'>) =>
    EmailService.getEmails({ ...params, labelIds: [EmailLabel.CATEGORY_REAL_ESTATE_OTHER] }),
  );

  static getSent = createFetchThunk('Email/getSent', (params: Omit<EmailRequest, 'labelIds'>) =>
    EmailService.getEmails({ ...params, labelIds: [EmailLabel.SENT] }),
  );

  static getDraft = createFetchThunk('Email/getDraft', (params: Omit<EmailRequest, 'labelIds'>) =>
    EmailService.getEmails({ ...params, labelIds: [EmailLabel.DRAFT] }),
  );

  static saveAsDraft = createFetchThunk('Email/saveAsDraft', EmailService.saveAsDraft);

  static updateDraft = createFetchThunk('Email/updateDraft', ({ id, body }: { id: string; body: UpdateDraftBody }) =>
    EmailService.updateDraft(id, body),
  );

  static getAllDrafts = createFetchThunk('Email/getAllDrafts', EmailService.getAllDrafts);

  // static getDraft = createFetchThunk('Email/getDraft', EmailService.getDraft);

  static deleteDraft = createFetchThunk('Email/deleteDraft', EmailService.deleteDraft);

  static getSignature = createFetchThunk('Email/getSignature', EmailService.getSignature);

  static updateSignature = createFetchThunk('Email/updateSignature', EmailService.updateSignature);

  static generateAIEmail = createFetchThunk('Email/generateAIEmail', EmailService.generateAIEmail);
}
