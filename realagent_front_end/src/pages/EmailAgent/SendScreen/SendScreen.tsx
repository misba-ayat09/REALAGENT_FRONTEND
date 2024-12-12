import EmailSent from '../../../components/EmailAgentCommon/EmailSent/EmailSent';
import { useAppDispatch, useAppSelector } from '../../../store';
import ScreenWrapper from '../ScreenWrapper';
import EmailsNotFound from '../EmailsNotFound';
import { useEffect } from 'react';
import EmailThunks from '../../../store/features/emailAgent/thunks';

const SendScreen = () => {
  const dispatch = useAppDispatch();

  const sentEmails = useAppSelector((state) => state.email.emails.SENT || []);

  useEffect(() => {
    dispatch(EmailThunks.getSent({}));
  }, []);

  return <ScreenWrapper>{sentEmails?.length === 0 ? <EmailsNotFound /> : <EmailSent />}</ScreenWrapper>;
};

export default SendScreen;
