/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
// import classes from './index.module.css';
import ActivitiesCard from '../../../../components/Card/ActivitiesCard';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { Flex, Text } from '@mantine/core';
import ScheduleMeetingCard from '../../../../components/Card/ScheduleMeetingCard';
import MeetingThunks from '../../../../store/features/meetings/thunks';
import ActivityThunks from '../../../../store/features/activities/thunks';

const ActivityScreen: React.FC = () => {
  const activities = useAppSelector((state) => state.activity.activities.list);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(ActivityThunks.findActivities({ page: 1, limit: 10 }));
  }, []);

  const handleFetchMeetings = () => {
    dispatch(MeetingThunks.findUpcoming({ page: 1, limit: 20 }));
  };

  return (
    <Flex direction={'column'} bg={'#FFFFFF'} px={'16px'} className={'border-radius-full'}>
      <Flex py={'24px'}>
        <ScheduleMeetingCard
          title="Schedule Meeting"
          description="Schedule your meeting"
          fetchMeetings={handleFetchMeetings}
        />
      </Flex>
      {activities?.length ? (
        activities.map((activity) => <ActivitiesCard key={activity._id} activity={activity} />)
      ) : (
        <Flex justify="center" align="center" mih="400px" w="100%">
          <Text>No activities to show.</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default ActivityScreen;
