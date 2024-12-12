import { Flex, Group, Divider, Paper, Text } from '@mantine/core';
import { AgentType } from '../../common/enum/agent.enum';
import { FlexBox } from '../common/FlexBox/FlexBox';
import { AgentIcon, AgentIconType } from '../Icon/AgentIcon';
import { timeSince } from '../../utils';

interface EmailInboxCardProps {
  subject?: string;
  preview?: string;
  createdAt?: string;
}

const InboxEmailCard: React.FC<EmailInboxCardProps> = ({ subject, preview, createdAt }) => {
  return (
    <>
      <Flex w={'100%'} direction={'column'} align="center" justify="space-between">
        <Flex w={'100%'} pb={10} pl={10} justify={'space-between'} align={'center'}>
          <Flex gap={'10px'}>
            <FlexBox container style={{ gap: '5px', flexDirection: 'column' }}>
              <Flex justify="space-between" align={'center'} gap={'8px'}>
                <Group style={{ display: 'flex', flexDirection: 'row' }}>
                  <AgentIcon icon={AgentType.Email} type={AgentIconType.Type4} size={34} />
                  <Text>Email Bot</Text>
                </Group>
                <Text>{createdAt && timeSince(new Date(createdAt))}</Text>
              </Flex>
              <Text fw={500} fz={24} ff={'Roboto'} c={'#000000'} mt={0} pt={0}>
                {subject}
              </Text>
              <Text fw={400} fz={14} ff={'Roboto'} c={'#7A7A7A'}>
                {preview}
              </Text>
            </FlexBox>
          </Flex>
        </Flex>
        <Paper w={'100%'}>
          <Divider pb={16} c={'#DCE5EA'} size={'2px'} />
        </Paper>
      </Flex>
    </>
  );
};

export default InboxEmailCard;
