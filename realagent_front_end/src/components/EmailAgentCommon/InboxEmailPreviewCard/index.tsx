import { Box, Divider, Flex, Text } from '@mantine/core';
import classes from './index.module.css';
import { IconDotsVertical } from '@tabler/icons-react';
import EmailOptions from '../EmailOptions/EmailOptions';
import { InboxEmailType } from '../../../store/features/emailAgent/emailAgentAPI';
import { formatMeetingTime } from '../../../utils';

const Index: React.FC<{
  px?: string;
  mx?: string;
  hanldeClick: (e: InboxEmailType) => void;
  email: InboxEmailType;
  onDelete: (e: React.MouseEvent<HTMLDivElement>, id: string) => void;
}> = ({ mx, hanldeClick, email, px = '0px 10px', onDelete }) => {
  return (
    <Box px={16}>
      <Flex
        className={classes.card}
        onClick={() => hanldeClick(email)}
        style={{ cursor: 'pointer', minHeight: '103px' }}
        direction="row"
        m={mx}
        p={px}
        justify="space-between"
        align="center">
        <Flex direction="column">
          <Text className={classes.title}>{email?.subject?.trim() === '' ? '(No Subject)' : email.subject}</Text>

          <Text className={classes.emailPreviewContent}>{email.preview}</Text>
        </Flex>
        <Flex direction="row" align="center" style={{ gap: '10px', alignItems: 'center' }}>
          <Text w={160} style={{ textAlign: 'right' }} fw={400} c={'rgba(89, 89, 89, 1)'} className={classes.title}>
            {formatMeetingTime(email?.internalDate)}
          </Text>
          <EmailOptions replyToEmail={() => hanldeClick(email)} deleteEmail={(e) => onDelete(e, email.id)}>
            <IconDotsVertical size={20} />
          </EmailOptions>
        </Flex>
      </Flex>
      <Divider size={'2px'} />
    </Box>
  );
};

export default Index;
