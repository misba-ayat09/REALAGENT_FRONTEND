/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react';
import ScheduledMeetingCard from '../../../components/Card/ScheduledMeetingCard';
import ScheduleMeetingCard from '../../../components/Card/ScheduleMeetingCard';
import classes from './index.module.css';
import { Flex, Text, Tabs as MantineTab } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../store';
import { ConditionalRenderer } from '../../../components';
import MeetingThunks from '../../../store/features/meetings/thunks';

export enum Tabs {
  Upcoming = 'Upcoming',
  History = 'History',
}

const MeetingScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const { list: upcomingMeetings } = useAppSelector((state) => state.meeting.upcomingMeetings);
  const { list: pastMeetings } = useAppSelector((state) => state.meeting.pastMeetings);

  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Upcoming);

  const handleFetchMeetings = () => {
    dispatch(MeetingThunks.findUpcoming({ page: 1, limit: 20 }));
    dispatch(MeetingThunks.findPast({ page: 1, limit: 20 }));
  };

  useEffect(() => {
    handleFetchMeetings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex direction={'column'} bg={'#FFFFFF'} px={'16px'} className={'border-radius-full'}>
      <Flex py={'24px'}>
        <ScheduleMeetingCard
          title="Schedule Meeting"
          description="Schedule your meeting"
          fetchMeetings={handleFetchMeetings}
        />
      </Flex>
      <Flex>
        <MantineTab
          defaultValue={Tabs.Upcoming}
          onChange={(val) => setActiveTab(val as Tabs)}
          color="#007BFF"
          w={'100%'}
          variant="pills"
          radius={27}
          classNames={{
            tab: classes.tab,
          }}>
          <MantineTab.List>
            <MantineTab.Tab value={Tabs.Upcoming}>Upcoming</MantineTab.Tab>
            <MantineTab.Tab value={Tabs.History}>History</MantineTab.Tab>
          </MantineTab.List>
        </MantineTab>
      </Flex>
      <Flex direction="column" pt={'24px'}>
        <ConditionalRenderer param1={activeTab} param2={Tabs.Upcoming}>
          <>
            {upcomingMeetings?.length ? (
              upcomingMeetings?.map((meeting) => (
                <ScheduledMeetingCard isUpcoming={true} showDivider={true} meeting={meeting} />
              ))
            ) : (
              <Flex justify="center" align="center" mih="400px" w="100%">
                <Text>No upcoming meetings.</Text>
              </Flex>
            )}
          </>
        </ConditionalRenderer>
        <ConditionalRenderer param1={activeTab} param2={Tabs.History}>
          {pastMeetings?.map((meeting) => (
            <ScheduledMeetingCard isUpcoming={false} showDivider={true} meeting={meeting} />
          ))}
        </ConditionalRenderer>
      </Flex>
    </Flex>
  );
};

export default MeetingScreen;
