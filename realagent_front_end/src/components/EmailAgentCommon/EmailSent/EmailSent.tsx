import { useEffect, useState } from 'react';
import { FlexBox } from '../../common/FlexBox/FlexBox';
import InboxEmailPreviewCard from '../InboxEmailPreviewCard';
import MailLogsRoot from '../MailLogs/MailLogsRoot';
import { useAppDispatch, useAppSelector } from '../../../store';
import { Box, LoadingOverlay } from '@mantine/core';
import { EmailDetails } from '../EmailDetails';
import { email_agent_padding } from '..';
import { EmailLookUpHelper } from '../../../utils/aiemail-service-helper';
import { checkForIntepretableDate } from '../../../utils';
import EmailThunks from '../../../store/features/emailAgent/thunks';
import { EmailType } from '../../../store/features/emailAgent/types';

const EmailSent = () => {
  const sentEmails = useAppSelector((state) => state.email.emails.SENT || []);
  const emailStatus = useAppSelector((state) => state.email.status);
  const dispatch = useAppDispatch();
  const emailLookUp = EmailLookUpHelper.getInstance();
  const map = new Map();

  const [selectedEmail, setSelectedEmail] = useState<EmailType | null>(null);

  useEffect(() => {
    emailLookUp.lookupInit(sentEmails);
  }, [emailLookUp, sentEmails]);

  useEffect(() => {
    dispatch(EmailThunks.getSent({}));
  }, []);

  const handleViewEmail = (email: EmailType) => setSelectedEmail(email);

  return (
    <>
      <LoadingOverlay visible={emailStatus === 'loading'} />
      {!selectedEmail ? (
        <MailLogsRoot>
          <div style={{ height: '20px' }} />

          <FlexBox
            width={'100%'}
            padding={'0px 10px'}
            container
            margin={'10px 0 0 0 '}
            flexDirection="column"
            style={{ gap: '0px', flex: '1', flexShrink: 0 }}>
            {sentEmails.map((labelledEmail, index) => {
              const lookUpKey = checkForIntepretableDate(new Date(labelledEmail.internalDate));
              const isExisting = map.get(lookUpKey);
              if (!isExisting) {
                map.set(lookUpKey, true);
              }

              return (
                <>
                  {!isExisting ? (
                    <Box p={email_agent_padding}>
                      <MailLogsRoot.MailLogsDayIndicator
                        title={checkForIntepretableDate(new Date(labelledEmail.internalDate))}
                      />
                    </Box>
                  ) : null}
                  <div key={`inboxEmailPreviewCard${index}`}>
                    <InboxEmailPreviewCard
                      onDelete={(e) => {
                        e.preventDefault();
                      }}
                      hanldeClick={handleViewEmail}
                      email={labelledEmail}
                      mx="10px 20px"
                      key={`inboxEmailPreviewCard${index}`}
                    />
                  </div>
                </>
              );
            })}
          </FlexBox>
        </MailLogsRoot>
      ) : (
        <EmailDetails email={selectedEmail} clearEmail={() => setSelectedEmail(null)} />
      )}
    </>
  );
};

export default EmailSent;
