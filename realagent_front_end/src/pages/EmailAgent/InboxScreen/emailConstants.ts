import { EmailLabel } from '../../../common/enum/email-label.enum';
import EmailThunks from '../../../store/features/emailAgent/thunks';

export enum Tabs {
  Important = 'Important',
  Spam = 'Spam',
  Enquiry = 'Enquiry',
  Meeting = 'Meeting',
  Other = 'Other',
}

export const LABEL_TAB_LOOKUP = {
  [Tabs.Important]: EmailLabel.IMPORTANT,
  [Tabs.Spam]: EmailLabel.SPAM,
  [Tabs.Enquiry]: EmailLabel.CATEGORY_REAL_ESTATE_ENQUIRY,
  [Tabs.Meeting]: EmailLabel.CATEGORY_REAL_ESTATE_MEETING,
  [Tabs.Other]: EmailLabel.CATEGORY_REAL_ESTATE_OTHER,
};

export const tabThunkMap = {
  [Tabs.Important]: EmailThunks.getImportant,
  [Tabs.Spam]: EmailThunks.getSpam,
  [Tabs.Enquiry]: EmailThunks.getEnquiry,
  [Tabs.Meeting]: EmailThunks.getMeeting,
  [Tabs.Other]: EmailThunks.getOther,
};
