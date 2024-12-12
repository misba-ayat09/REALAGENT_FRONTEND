import EmailDetailsRoot from './EmailDetailsRoot';
import { formatDateToMonthDay, formatMeetingTime } from '../../../utils';
import React, { useEffect } from 'react';
import { EmailType } from '../../../store/features/emailAgent/types';
import { emailAgentAPI } from '../../../store/features/emailAgent/emailAgentAPI';
import { useLoadingState } from '../../../hooks';
import { LoadingOverlay } from '@mantine/core';

interface EmailDetailsProps {
  email: EmailType;
  clearEmail: () => void;
}
const EmailContent = ({ html }: { html: string }) => {
  return (
    <iframe
      srcDoc={html}
      style={{
        width: '100%',
        height: '190%',
        border: 'none',
        zIndex: 10,
      }}
      title="Email content"
    />
  );
};
const EmailDetails: React.FC<EmailDetailsProps> = ({ email, clearEmail }) => {
  if (!email) return null;
  const [selectedEmail, setSelectedEmail] = React.useState<EmailType|null>(null);
  // const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isLoading, startLoading, finishLoading] = useLoadingState();

  useEffect(() => {
    const fetchEmail = async () => {
      startLoading();
      emailAgentAPI.getMessage(email.id).then((data) => {
        finishLoading();
        setSelectedEmail({
          id: data?.result?.id??"",
          threadId: data?.result?.threadId??"",
          subject: data?.result?.subject??"",
          from: data?.result?.from??[], 
          to: data?.result?.to??[],
          cc: data?.result?.cc??[],
          bcc: data?.result?.bcc??[],
          contentType: data?.result?.contentType??"",
          mimeType: data?.result?.mimeType??"",
          internalDate: data?.result?.internalDate??"",
          body: data?.result?.body??"",
          preview: data?.result?.preview??"",
        });
      })
      .catch(() => {
        finishLoading();
      });
    } 
    fetchEmail()
  },[])
  return (
    <>
    <LoadingOverlay visible={isLoading} />
    {
      selectedEmail&&  <EmailDetailsRoot onBackPress={clearEmail}>
      
      <EmailDetailsRoot.EmailSubjectTitle title={selectedEmail?.subject} />
      <EmailDetailsRoot.SenderDetails
        senderEmail={selectedEmail?.from.join('')}
        ccEmails={selectedEmail?.cc}
        bccEmails={selectedEmail?.bcc}
        senderTimeStamp={formatMeetingTime(selectedEmail.internalDate) + ' ' + formatDateToMonthDay(selectedEmail.internalDate)}
      />
      {/* <EmailDetailsRoot.EmailDetails content={selectedEmail.body}/> */}
      {/* <div dangerouslySetInnerHTML={{ __html: selectedEmail.body.trim()!==''?selectedEmail.body.trim():selectedEmail.preview }} /> */}
      {/* <EmailDetailsRoot.AttachmentSection>
            <FlexBox container flexDirection='row' style={{padding:email_agent_padding,gap:"20px"}}>
                <UploadedFile fileName='file.pdf' onDelete={()=>{}} />
                <UploadedFile fileName='file.pdf' onDelete={()=>{}} />
            </FlexBox>
        </EmailDetailsRoot.AttachmentSection> */}
        <EmailContent html={selectedEmail.body.trim() !== '' ? selectedEmail.body.trim() : selectedEmail.preview} />


    </EmailDetailsRoot>
    
    }
    
    </>

  
  );
};

export default EmailDetails;
