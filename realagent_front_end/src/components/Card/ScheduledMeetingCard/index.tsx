import { useMemo, useState } from 'react';
import { Card, Flex, Group, Text, useMantineTheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { PATH_WEBSITE } from '../../../router/route';
import { MeetingFormModal } from '../../Modal';
import { ScheduleMeetingFormData, UpdateMeetingFormData } from '../../../api/types';
import { Meeting } from '../../../store/features/meetings/types';
import { determineMeetingStatus, formatDateOrToday, formatTimeFromDate, getDayLabel } from '../../../utils';
import WithModal from '../../Modal/WithModal';
import ConsentModal from '../../Modal/ConsentModal';
import TrashButton from '../../Button/TrashButton';
import EditButton from '../../Button/EditButton';
import SimpleButton from '../../Button/SimpleButton';
import { useMeetingTimer } from '../../../hooks';
import { useAppDispatch } from '../../../store';
import MeetingThunks from '../../../store/features/meetings/thunks';
import { AgentIcon, AgentIconType } from '../../Icon/AgentIcon';
import { AgentType } from '../../../common/enum/agent.enum';
import { getallDashboardAgent } from '../../../store/features/dashboardAgent/dashboardAgentSlice';
import { Activity } from '../../../store/features/activities/types';

interface ScheduledMeetingCardProps {
  showHeader?: boolean;
  isUpcoming?: boolean;
  showDivider?: boolean;
  meeting: Meeting;
  activity?: Activity;
}
const MAX_VISIBLE_ATTENDEES = 2;
const ScheduledMeetingCard: React.FC<ScheduledMeetingCardProps> = ({ showHeader, isUpcoming, meeting, activity }) => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();

  const [showAllAttendees, setShowAllAttendees] = useState(false);
  const attendees = meeting.attendees;
  const visibleAttendees = attendees.slice(0, MAX_VISIBLE_ATTENDEES);
  const remainingAttendees = attendees.length - MAX_VISIBLE_ATTENDEES;

  const handleToggleAttendees = () => {
    setShowAllAttendees(!showAllAttendees);
  };

  const navigate = useNavigate();

  const { isJoinEnabled } = useMeetingTimer(meeting?.meetingStart);

  const meetingStatus = useMemo(() => {
    try {
      return determineMeetingStatus(meeting.meetingStart, meeting.meetingEnd);
    } catch (error) {
      console.error(error);
      return 'invalid';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meeting.meetingStart, meeting.meetingEnd, isJoinEnabled]);

  const [meetingToBeEdited, setMeetingToBeEdited] = useState<UpdateMeetingFormData>();
  const [isMeetingEdited, setIsMeetingEdited] = useState(false);

  const handleClick = (meetingId: string) => {
    navigate(PATH_WEBSITE.getMeetRoomRoute(meetingId));
  };

  const handleDelete = async () => {
    dispatch(MeetingThunks.remove(meeting._id));
    dispatch(getallDashboardAgent({ page: 1, limit: 20, sortOrder: 'desc' }));
  };

  const hanldeEditMeeting = (meeting: Meeting) => {
    const currentDateTime = new Date(meeting.meetingStart);
    const tenMinutesAfter = new Date(currentDateTime.getTime() + 10 * 60000).toISOString();
    setMeetingToBeEdited({
      attendees: meeting.attendees,
      topic: meeting.topic,
      description: meeting.description,
      meetingStart: new Date(meeting.meetingStart).toISOString(),
      meetingEnd: meeting?.meetingEnd ? new Date(meeting?.meetingEnd).toISOString() : tenMinutesAfter,
    });
    setIsMeetingEdited(true);
  };

  const editMeetData = useMemo(
    () => ({
      topic: meetingToBeEdited?.topic ?? '',
      agenda: meetingToBeEdited?.description ?? '',
      startDate: meetingToBeEdited?.meetingStart ? new Date(meetingToBeEdited.meetingStart) : null,
      endDate: meetingToBeEdited?.meetingEnd ? new Date(meetingToBeEdited.meetingEnd) : null,
      attendees: meetingToBeEdited?.attendees?.map((attendee) => attendee.email) || [],
    }),
    [meetingToBeEdited],
  );

  const handleUpdateMeeting = async (data: ScheduleMeetingFormData) => {
    dispatch(MeetingThunks.update({ id: meeting._id, body: data }));
    dispatch(getallDashboardAgent({ page: 1, limit: 20, sortOrder: 'desc' }));
  };
  const handleViewClick = () => {
    navigate(
      PATH_WEBSITE.websiteActivitiesChat + '?activityId=' + (activity?._id ?? meeting?.activity ?? meeting?.activityId),
    );
  };
  return (
    <>
      <MeetingFormModal
        opened={isMeetingEdited}
        onClose={() => setIsMeetingEdited(false)}
        onAccept={(data) =>
          handleUpdateMeeting({
            topic: data.topic,
            description: data.agenda,
            meetingStart: data.startDate?.toISOString() || new Date().toISOString(),
            meetingEnd: data.endDate?.toISOString(),
            attendees: data.attendees?.map((a) => ({ email: a })),
          })
        }
        initialData={editMeetData}
      />

      <Card w={'100%'} bg={'#FFFFFF'} p={'16px 8px'}>
        <Flex w="100%" pb={10} pl={10} justify="space-between" align="center">
          {showHeader && (
            <Group style={{ display: 'flex', flexDirection: 'row' }}>
              <AgentIcon icon={AgentType.Website} type={AgentIconType.Type4} size={34} />
              <Text fs={'16'} fw={'600'} c={'#292929'}>
                Website Bot
              </Text>
            </Group>
          )}

          <Text fw={600} fz={14} ff="Roboto" c="#B1B1B1" pr={30}>
            {getDayLabel(meeting.meetingStart)}
          </Text>
        </Flex>
        <Flex w={'100%'} pb={10} pl={10} justify={'space-between'} align={'center'}>
          <Flex gap={'10px'}>
            <Flex direction="column" gap={'10px'} mt={10}>
              <Text fw={700} fz={20} c="#595959">
                {meetingStatus === 'upcoming' || meetingStatus === 'ongoing'
                  ? `Schedule a ${meeting.topic}`
                  : `Had a ${meeting.topic}`}
              </Text>

              <Text fw={400} fz={14} ff="Roboto" c="#595959" lineClamp={3}>
                {meeting.description}
              </Text>
              {visibleAttendees.map((attendee, index) => (
                <Text key={index} fw={400} fz={14} ff="Roboto" c="#595959">
                  {attendee.email}
                </Text>
              ))}
              {remainingAttendees > 0 && !showAllAttendees && (
                <Text
                  onClick={handleToggleAttendees}
                  fw={400}
                  fz={14}
                  ff="Roboto"
                  c="blue"
                  style={{ cursor: 'pointer' }}>
                  +{remainingAttendees} more
                </Text>
              )}
              {/* Show hidden attendees when expanded */}

              {showAllAttendees && (
                <>
                  {attendees.slice(MAX_VISIBLE_ATTENDEES).map((attendee, index) => (
                    <Text key={index + MAX_VISIBLE_ATTENDEES} fw={400} fz={14} ff="Roboto" c="#595959">
                      {attendee.email}
                    </Text>
                  ))}
                  <Text onClick={handleToggleAttendees} fw={400} fz={14} ff="Roboto" c="blue">
                    Show less
                  </Text>
                </>
              )}
            </Flex>
          </Flex>
          <Flex justify={'space-between'} align={'center'} gap={'50px'}>
            <Flex direction="column" align="flex-start" gap={'16px'} mr={'21px'}>
              <Text fw={600} fz={'16px'} ff={'Roboto'} c={'#292929'}>
                {`Date :${formatDateOrToday(meeting.meetingStart)}`}
              </Text>
              <Text fw={600} fz={'16px'} ff={'Roboto'} c={'#292929'}>
                {`Time : ${formatTimeFromDate(meeting.meetingStart)}`}
              </Text>
            </Flex>
            {isUpcoming || meetingStatus === 'upcoming' || meetingStatus === 'ongoing' ? (
              <Flex direction="column" align="center" gap={'16px'} mr={'21px'}>
                <SimpleButton text="Join Now" disabled={!isJoinEnabled} onClick={() => handleClick(meeting._id)} />

                <Flex gap={8}>
                  <EditButton
                    iconSize={16.17}
                    defaultColor={theme.colors.azureBlue[1]}
                    iconColor={theme.colors.azureBlue[6]}
                    onClick={() => hanldeEditMeeting(meeting)}
                  />

                  <WithModal
                    onAccept={() => handleDelete()}
                    ModalComponent={(e) => (
                      <ConsentModal
                        text={'Are you sure you want to delete this?'}
                        subText={'This action cannot be undone'}
                        {...e}
                      />
                    )}>
                    <TrashButton
                      iconSize={16.17}
                      defaultColor={theme.colors.azureBlue[1]}
                      iconColor={theme.colors.azureBlue[6]}
                    />
                  </WithModal>
                </Flex>
              </Flex>
            ) : (
              <Flex direction="column" align="center" gap={'16px'} mr={'21px'}>
                <SimpleButton text="View details" onClick={handleViewClick} />
              </Flex>
            )}
          </Flex>
        </Flex>
      </Card>
    </>
  );
};

export default ScheduledMeetingCard;
