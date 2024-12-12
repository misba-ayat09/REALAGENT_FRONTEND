import { FlexBox } from '../../common/FlexBox/FlexBox';
import InboxEmailPreviewCard from '../InboxEmailPreviewCard';
import MailLogsRoot from '../MailLogs/MailLogsRoot';
import { Box } from '@mantine/core';
import { email_agent_padding } from '..';
import { InboxEmailType } from '../../../store/features/emailAgent/emailAgentAPI';
import { checkForIntepretableDate } from '../../../utils';
import EmailsNotFound from '../../../pages/EmailAgent/EmailsNotFound';
import { EmailType } from '../../../store/features/emailAgent/types';

interface EmailDetailsProps {
  emails?: EmailType[];
  setEmail: (value: EmailType | null) => void;
  showHeader?: boolean;
  createdAt?: string;
}

const EmailInbox: React.FC<EmailDetailsProps> = ({ emails: allEmails, setEmail,}) => {
  const map = new Map();
  const handleViewEmail = (email: InboxEmailType) => {
    setEmail(email);
  };

  return (
    <MailLogsRoot>
      <div style={{ height: '20px' }} />
      <FlexBox
        width={'100%'}
        padding={'0px 10px'}
        container
        margin={'10px 0 0 0 '}
        flexDirection="column"
        style={{ gap: '0px', flex: '1', flexShrink: 0 }}>
        {allEmails?.length ? (
          allEmails?.map((labelledEmail, index) => {
            const lookUpKey = checkForIntepretableDate(new Date(labelledEmail.internalDate));
            const isExisting = map.get(lookUpKey);
            if (!isExisting) {
              map.set(lookUpKey, true);
            }
            return (
              <>
                {!isExisting && (
                  <Box p={email_agent_padding}>
                    <MailLogsRoot.MailLogsDayIndicator
                      title={checkForIntepretableDate(new Date(labelledEmail.internalDate))}
                    />
                  </Box>
                )}
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
                  {/* { isVisible &&<Divider size={2} styles={{root:{borderColor:"rgba(220, 229, 234, 1)"}}}/>} */}
                </div>
              </>
            );
          })
        ) : (
          <EmailsNotFound />
        )}
      </FlexBox>
    </MailLogsRoot>
  );
};

export default EmailInbox;
