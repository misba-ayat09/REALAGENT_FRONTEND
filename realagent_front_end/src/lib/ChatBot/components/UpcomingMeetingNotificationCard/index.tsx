import React from 'react';
import { formatDateOrToday, formatTimeFromDate } from '../../../../utils';
import { Box, Flex } from '@mantine/core';
import SimpleButton from '../../../../components/Button/SimpleButton';
import { Text } from '@mantine/core';
import { Meeting } from '../../../../store/features/meetings/types';
import { useMeetingTimer } from '../../../../hooks';

interface UpcomingMeetingNotificationCardProps {
  upcomingMeeting: Meeting;
}

const UpcomingMeetingCard: React.FC<UpcomingMeetingNotificationCardProps> = ({ upcomingMeeting }) => {
  const meetingDate = formatDateOrToday(upcomingMeeting.meetingStart);
  const isToday = meetingDate === 'Today';
  const meetingTime = formatTimeFromDate(upcomingMeeting.meetingStart);
  const attendees = upcomingMeeting.attendees;
  const firstAttendeeName = attendees[0]?.name ?? attendees[0]?.email;

  const { isJoinEnabled } = useMeetingTimer(upcomingMeeting?.meetingStart);

  return (
    <Flex direction={'column'} h={'100%'} w={'100%'} justify={'flex-end'} align={'flex-start'} gap={'50px'}>
      <Flex direction={'column'} gap={'8px'}>
        <Text fw={400} fs="16px" ff="Roboto" c="#FFFFFF">
          Hi, you have a meeting{' '}
          {isToday ? (
            <>
              <Text span fw={600} fs="40px" ff="Roboto" c="#FFFFFF">
                today
              </Text>{' '}
            </>
          ) : (
            <>
              on{' '}
              <Text span fw={600} fs="40px" ff="Roboto" c="#FFFFFF">
                {meetingDate}
              </Text>{' '}
            </>
          )}
          at{' '}
          <Text span fw={600} fs="40px" ff="Roboto" c="#FFFFFF">
            {meetingTime}
          </Text>
          .
        </Text>
        <Text fw={400} fs="16px" ff="Roboto" c="#FFFFFF">
          {attendees.length === 1 ? (
            <>
              with{' '}
              <Text span fw={600} fs="40px" ff="Roboto" c="#FFFFFF">
                {firstAttendeeName}
              </Text>
              .
            </>
          ) : (
            <>
              with{' '}
              <Text span fw={600} fs="40px" ff="Roboto" c="#FFFFFF">
                {firstAttendeeName}
              </Text>{' '}
              and{' '}
              <Text span fw={600} fs="40px" ff="Roboto" c="#FFFFFF">
                {attendees.length - 1}
              </Text>{' '}
              others.
            </>
          )}
        </Text>
      </Flex>
      <Box w={'100%'}>
        <SimpleButton
          disabled={!isJoinEnabled}
          fullWidth
          c={isJoinEnabled ? 'azureBlue' : 'gray'}
          color={isJoinEnabled ? '#FFFFFF' : 'gray'}
          text="Join"
        />
      </Box>
    </Flex>
  );
};

export default UpcomingMeetingCard;
