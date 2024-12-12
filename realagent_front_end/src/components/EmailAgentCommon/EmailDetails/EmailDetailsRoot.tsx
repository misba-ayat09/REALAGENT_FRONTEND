import { Avatar, Box, Button, Divider, Text } from '@mantine/core';
import { FlexBox } from '../../common/FlexBox/FlexBox';
import classes from './index.module.css';
import { email_agent_padding } from '..';
import React from 'react';
import {IconChevronLeft } from '@tabler/icons-react';

interface EmailDetailsRootProps extends React.FC<{ children: React.ReactNode; onBackPress: () => void }> {
  EmailSubjectTitle: React.FC<EmailSubjectProps>;
  SenderDetails: React.FC<SenderDetailsProps>;
  EmailDetails: React.FC<EmailDetailsProps>;
  AttachmentSection: React.FC<AttachmentSectionInterface>;
}

interface AttachmentSectionInterface {
  children: React.ReactNode;
}

interface SenderDetailsProps {
  senderEmail: string;
  senderTimeStamp: string;
  ccEmails?: string[];
  bccEmails?: string[];
}

interface EmailDetailsProps {
  content: string;
}

interface EmailSubjectProps {
  title: string;
}

const EmailDetailsRoot: EmailDetailsRootProps = ({ children, onBackPress }) => {
  return (
    <FlexBox
      padding={email_agent_padding}
      backgroundColor="white"
      container
      flexDirection="column"
      style={{ gap: '10px', position: 'relative',height:"100vh"}}>
      <Button
        onClick={onBackPress}
        leftSection={<IconChevronLeft />}
        radius={20}
        c={'blue'}
        bg={'rgba(240, 245, 248, 1)'}
        w={100}
        h={100}
        mt={10}>
        <span>Back</span>
      </Button>
      {children}
    </FlexBox>
  );
};

const EmailSubjectTitle: React.FC<EmailSubjectProps> = ({ title }) => {
  return (
    <FlexBox container style={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Text className={classes.title}>{title}</Text>
      {/* <FlexBox container style={{ alignItems: 'center', gap: '10px' }}>
        <IconArrowBackUp strokeWidth={1} />
        <IconArrowBackUp strokeWidth={1} style={{ transform: 'scaleX(-1)' }} />
      </FlexBox> */}
    </FlexBox>
  );
};

const SenderDetails: React.FC<SenderDetailsProps> = ({ senderEmail, senderTimeStamp, ccEmails, bccEmails }) => {
  return (
    <FlexBox container style={{ alignItems: 'center', gap: '10px' }}>
      <Avatar radius={'50%'} h={50} w={50} style={{ flexShrink: 1 }} />

      <FlexBox container flexDirection="column">
        <Text c={'black'} fw={500} fz={16}>
          {senderEmail}
        </Text>
        <Text c={'rgba(122, 122, 122, 1)'} fz={14}>
          {senderTimeStamp}
        </Text>

        {ccEmails && ccEmails?.length > 0 && (
          <Text c={'rgba(122, 122, 122, 1)'} fz={14}>
            cc: {ccEmails.join(', ')}
          </Text>
        )}

        {bccEmails && bccEmails?.length > 0 && (
          <Text c={'rgba(122, 122, 122, 1)'} fz={14}>
            bcc: {bccEmails.join(', ')}
          </Text>
        )}
      </FlexBox>
    </FlexBox>
  );
};

const EmailDetails: React.FC<EmailDetailsProps> = ({ content }) => {
  return (
    <FlexBox container margin={'20px 0 0 0'}>
      <Text>{content}</Text>
    </FlexBox>
  );
};
const AttachmentSection: React.FC<AttachmentSectionInterface> = ({ children }) => {
  return (
    <Box style={{ position: 'absolute', bottom: '0px', width: '100%', left: '0px', padding: '20px 0px' }}>
      <Divider styles={{ root: { borderColor: 'rgba(240, 245, 248, 1)' } }} size={2} />
      <Text mt={10} style={{ padding: email_agent_padding }} c={'rgba(122, 122, 122, 1)'} fw={400}>
        Attachments
      </Text>
      {children}
    </Box>
  );
};

EmailDetailsRoot.EmailSubjectTitle = EmailSubjectTitle;
EmailDetailsRoot.SenderDetails = SenderDetails;
EmailDetailsRoot.EmailDetails = EmailDetails;
EmailDetailsRoot.AttachmentSection = AttachmentSection;

export default EmailDetailsRoot;
