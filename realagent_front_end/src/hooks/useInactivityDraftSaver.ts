import { useEffect } from 'react';
import { DraftRequest, emailAgentAPI, Schema$MessagePart } from '../store/features/emailAgent/emailAgentAPI';

export enum EmailStateNames {
  FROM = 'from',
  TO = 'to',
  SUBJECT = 'subject',
  BODY = 'body',
  CC = 'cc',
  ATTACHMENTS = 'attachments',
}

export interface EmailProps {
  [EmailStateNames.FROM]: string;
  [EmailStateNames.TO]: string[];
  [EmailStateNames.SUBJECT]: string;
  [EmailStateNames.BODY]: string;
  [EmailStateNames.CC]: string[];
  [EmailStateNames.ATTACHMENTS]: Schema$MessagePart[];
}

interface UseInactivityDraftSaverParams {
  cachedEmail: Partial<EmailProps>;
  draftId?: string | null;
  timeout: number;
}

const useInactivityDraftSaver = ({
  cachedEmail,
  draftId,
  timeout: DRAFT_SAVE_TIMEOUT = 5000, // 5 seconds
}: UseInactivityDraftSaverParams) => {
  useEffect(() => {
    let inactivityTimeoutId: number | undefined;

    const resetInactivityTimeout = () => {

      if (inactivityTimeoutId) {
        clearTimeout(inactivityTimeoutId);
      }

      if (cachedEmail) {
        inactivityTimeoutId = window.setTimeout(() => {

          if (cachedEmail.from || cachedEmail.to?.length || cachedEmail.subject || cachedEmail.body) {
            saveDraftIfNecessary();
          } else {
          }
        }, DRAFT_SAVE_TIMEOUT);

      }
    };

    const saveDraftIfNecessary = async () => {

      if (cachedEmail) {
        const emailPayload: DraftRequest['email'] = {
          from: { email: cachedEmail.from ?? '' },
          to: cachedEmail.to?.map((email) => ({ email })) ?? [],
          subject: cachedEmail.subject ?? '',
          cc: cachedEmail.cc?.map((email) => ({ email })) ?? [],
          body: { text: cachedEmail.body },
        };

        try {

          if (draftId) {
            await emailAgentAPI.updateDraft({ draftId, email: emailPayload });
          } else {
            // const newDraft = await emailAgentAPI.saveAsDraft({ email: emailPayload });
            // console.log('[DEBUG] Draft saved successfully:', newDraft);
          }
        } catch (error) {
        }
      } else {
      }
    };

    const handleUserAction = () => {
      resetInactivityTimeout();
    };

    // Attach event listeners for user activity
    window.addEventListener('keydown', handleUserAction);
    window.addEventListener('mousemove', handleUserAction);
    window.addEventListener('click', handleUserAction);

    // Save draft on page unload
    window.addEventListener('beforeunload', saveDraftIfNecessary);

    const cleanupEventListeners = () => {

      if (inactivityTimeoutId) {
        clearTimeout(inactivityTimeoutId);
      }

      window.removeEventListener('keydown', handleUserAction);
      window.removeEventListener('mousemove', handleUserAction);
      window.removeEventListener('click', handleUserAction);
      window.removeEventListener('beforeunload', saveDraftIfNecessary);
    };

    // Cleanup function on unmount
    return cleanupEventListeners;
  }, [cachedEmail, draftId, DRAFT_SAVE_TIMEOUT]);
};

export default useInactivityDraftSaver;
