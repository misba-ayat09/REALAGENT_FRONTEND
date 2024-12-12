import React, { useEffect } from 'react';
import { Divider, Flex, Paper, Text } from '@mantine/core';
import { ConnectedAccountsList } from '../../components';
import { Icon } from '../../components/common/Icons/Icon';
import { IconType } from '../../components/common/Icons';
import { useConnectedAccounts } from '../../hooks';
import { SocialMedia } from '../../common/enum';
import { useAppDispatch, useAppSelector } from '../../store';
import Calendar, { CalendarEvent } from '../../components/common/Calendar';
import './calenderScreen.css';
import { getCalendarEvents } from '../../store/features/calendar';

const CalendarScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.authentication.userData);
  const calendarData = useAppSelector((state) => state.calendar.calendarData);
  const [allEvents, setAllEvents] = React.useState<CalendarEvent[]>([]);
  const { connectedAccounts } = useConnectedAccounts();
  useEffect(() => {
    dispatch(getCalendarEvents());
  }, [dispatch]);

  useEffect(() => {
    if (calendarData) {
      const events = calendarData.map<CalendarEvent>((item) => ({
        id: item.id,
        title: item.topic,
        start: new Date(item.start),
        end: new Date(item.end),
        description: item.description,
        attendees: item.attendees?.map((attendee) => attendee.name ?? attendee.email ?? ''),
      }));
      setAllEvents(events);
    }
  }, [calendarData]);

  return (
    <Flex
      direction={'column'}
      p="16px"
      bg={'#FFFFFF'}
      mih={'calc(100vh - 100px)'}
      w={'100%'}
      className="border-radius-full">
      <Flex direction={'row'} justify={'space-between'}>
        <Flex direction={'column'} gap={'2.5px'}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>{`${userData.firstName ?? ''}'s Calendar`}</Text>
          <Text style={{ fontSize: 16, fontWeight: 400, color: '#595959' }}>
            View and manage all your calendar events
          </Text>
        </Flex>
        <Flex direction={'column'} gap={'2.5px'}>
          <ConnectedAccountsList
            accounts={connectedAccounts[SocialMedia.GOOGLE]}
            label="Synced"
            icon={<Icon icon={IconType.Sync} style={{ width: 20, height: 20, marginTop: 10 }} />}
          />
          <Flex direction={'row'} gap={'2.5px'}>
            <Text fs={'16px'} fw={600}>
              TimeZone:
            </Text>
            <Text>{userData.timezone || 'UTC'}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Paper w={'100%'}>
        <Divider pb={16} c={'#DCE5EA'} size={'2px'} />
      </Paper>
      <Calendar events={allEvents} />
    </Flex>
  );
};

export default CalendarScreen;
