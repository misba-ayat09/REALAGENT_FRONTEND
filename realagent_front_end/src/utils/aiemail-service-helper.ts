import { InboxEmailType } from '../store/features/emailAgent/emailAgentAPI';
import { checkForIntepretableDate } from './dateUtils';
interface GroupedEmails {
  [key: string]: InboxEmailType[];
}

export class EmailLookUpHelper {
  private static instance: EmailLookUpHelper;
  private lookup: Map<string, boolean> = new Map();
  public emailCounter: Map<string, number> = new Map();
  public categorisedEmail: GroupedEmails = {};
  constructor() {}

  public static getInstance(): EmailLookUpHelper {
    if (!EmailLookUpHelper.instance) {
      EmailLookUpHelper.instance = new EmailLookUpHelper();
    }
    return EmailLookUpHelper.instance;
  }
  public setLookUp(date: string, isExisting: boolean) {
    this.lookup.set(date, isExisting);
    return this;
  }
  public getLookUp(date: string) {
    this.lookup.get(date);
    return this;
  }
  public isTitleAlreadySet(date: string): boolean | undefined {
    return this.lookup.get(date);
  }
  public lookupInit(allEmails: InboxEmailType[]): this {
    allEmails.map((labelledEmail) => {
      const lookUpKey = checkForIntepretableDate(new Date(labelledEmail.internalDate));
      this.setLookUp(lookUpKey, false);
    });
    this.categoriseEmail(allEmails);
    return this;
  }

  public filterEmailsWithLookUpKey(emails: InboxEmailType[], lookUpKey: string) {
    return emails.filter((email) => email.internalDate === lookUpKey);
  }

  public categoriseEmail(allEmails: InboxEmailType[]) {
    const cat: GroupedEmails = {};
    const groupedBySubject = allEmails.reduce((acc, item) => {
      const { internalDate } = item;
      const subject = checkForIntepretableDate(new Date(internalDate));
      if (!acc[subject]) {
        acc[subject] = [];
      }

      acc[subject].push(item);
      return acc;
    }, cat);
    this.categorisedEmail = groupedBySubject;
    return this;
  }

  public countEmail(emailDate: string) {
    if (this.emailCounter.get(emailDate)) {
      this.emailCounter.set(emailDate, (this.emailCounter.get(emailDate) as number) + 1);
    } else {
      this.emailCounter.set(emailDate, 1);
    }
  }

  public getTotalEmailsCounted(emailDate: string) {
    return this.emailCounter.get(emailDate);
  }

  public isEmailLastInUnderLabel(_emailDate: string) {
    // return this.emailCounter.get(emailDate) === this.categorisedEmail[emailDate]?.length
  }

  public getLastEmail(emailDate: string): InboxEmailType | null {
    return this.categorisedEmail[emailDate]
      ? this.categorisedEmail[emailDate][this.categorisedEmail[emailDate]?.length - 1]
      : null;
  }
}
