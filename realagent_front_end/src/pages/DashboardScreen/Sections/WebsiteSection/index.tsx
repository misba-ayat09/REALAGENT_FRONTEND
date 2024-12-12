import React, { useEffect } from 'react';
import ScheduledMeetingCard from '../../../../components/Card/ScheduledMeetingCard';
import classes from './index.module.css';
import { Flex, Text } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../../store';
import MeetingThunks from '../../../../store/features/meetings/thunks';

const WebsiteSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const { list: upcomingMeetings } = useAppSelector((state) => state.meeting.upcomingMeetings);

  const handleFetchMeetings = () => {
    dispatch(MeetingThunks.findUpcoming({ page: 1, limit: 20 }));
  };

  useEffect(() => {
    handleFetchMeetings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      {upcomingMeetings?.length > 0 ? (
        upcomingMeetings?.map((meeting) => (
          <ScheduledMeetingCard isUpcoming={true} showDivider={true} meeting={meeting} />
        ))
      ) : (
        <Flex justify="center" align="center" mih="400px" w="100%">
          <Text>No upcoming meetings.</Text>
        </Flex>
      )}
    </div>
  );
};

export default WebsiteSection;
