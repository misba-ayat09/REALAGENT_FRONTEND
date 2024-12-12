import { Flex, Text, useMantineTheme } from '@mantine/core';
import classes from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { determineMeetingStatus, formatDateOrToday, formatTimeFromDate, getDayLabel } from '../../../utils';
import SimpleButton from '../../Button/SimpleButton';
import { Activity, MeetingData } from '../../../store/features/activities/types';
import { PATH_WEBSITE } from '../../../router/route';
import { NavigationIcon, NavigationIconType } from '../../Navigation/NavigationIcon';
import { useMemo, useState } from 'react';
import { useMeetingTimer } from '../../../hooks';
import { ScheduleMeetingFormData, UpdateMeetingFormData } from '../../../api/types';
import MeetingThunks from '../../../store/features/meetings/thunks';
import { useAppDispatch } from '../../../store';
import { MeetingFormModal } from '../../Modal';
import EditButton from '../../Button/EditButton';
import TrashButton from '../../Button/TrashButton';
import ConsentModal from '../../Modal/ConsentModal';
import WithModal from '../../Modal/WithModal';
import { IconButton } from '../../Button';
import { IconInfoSmall } from '@tabler/icons-react';

interface ActivitiesCardProps {
  activity: Activity;
}

const ActivitiesCard: React.FC<ActivitiesCardProps> = ({ activity }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const meeting = activity.meetingData;
  const chatBotHistory = activity.chatBotHistoryData;

  const hasMessages = activity?.chatBotHistory || !!activity?.chatBotHistoryData?.messages?.length;

  const { isJoinEnabled } = useMeetingTimer(meeting?.meetingStart);

  const meetingStatus = useMemo(() => {
    if (!meeting) return 'invalid';
    try {
      return determineMeetingStatus(meeting?.meetingStart, meeting?.meetingEnd);
    } catch (error) {
      console.error(error);
      return 'invalid';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meeting?.meetingStart, meeting?.meetingEnd, isJoinEnabled]);

  const chatBotHistoryStatus = useMemo(() => {
    if (chatBotHistory?.participant) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }, [chatBotHistory]);

  const [meetingToBeEdited, setMeetingToBeEdited] = useState<UpdateMeetingFormData>();
  const [isMeetingEdited, setIsMeetingEdited] = useState(false);

  const handleDelete = async () => {
    if (meeting) {
      dispatch(MeetingThunks.remove(meeting._id));
    }
  };

  const hanldeEditMeeting = (meeting?: MeetingData) => {
    if (meeting) {
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
    }
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
    if (meeting) {
      dispatch(MeetingThunks.update({ id: meeting._id, body: data }));
    }
  };

  const handleOnClickJoinMeet = () => {
    if (meeting) {
      navigate(PATH_WEBSITE.getMeetRoomRoute(meeting._id));
    }
  };

  const handleOnClickViewConversation = () => {
    navigate(PATH_WEBSITE.websiteActivitiesChat + '?activityId=' + activity._id);
  };

  return (
    <>
      {meeting ? (
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
      ) : null}
      <Flex mih={'110px'} mah={'150px'} w={'100%'} p={'16px'} justify={'space-between'} align={'center'} bg={'#FFFFFF'}>
        <Flex direction={'column'} gap={'5px'} h={'100%'} w={'50%'}>
          {meetingStatus === 'invalid' && chatBotHistoryStatus === 'valid' && (
            <Text fw={700} fz={20} c="#292929">
              Had a meeting with {chatBotHistory?.participant?.name || 'Client'}
            </Text>
          )}
          <Flex justify="space-between" align={'center'} gap={'8px'}>
            <Text fw={600} fz={14} ff={'Roboto'} c={'#B1B1B1'}>
              {getDayLabel(activity.createdAt)}
            </Text>
          </Flex>

          <Flex justify={'flex-start'} align={'center'} gap={'8px'}>
            <Text className={classes.title} c={'#292929'}>
              {meetingStatus === 'invalid'
                ? activity.chatBotHistoryData?.participant?.email ?? activity.chatBotHistoryData?.participant?.name
                : activity.meetingData?.topic ?? activity.meetingData?.attendees[0]?.name}
            </Text>
            {activity.meetingData && <NavigationIcon type={NavigationIconType.Meet} color={'#007BFF'} size={24} />}
          </Flex>
          <Text className={classes.detail} lineClamp={3} c={'#595959'}>
            {activity.chatBotHistoryData?.summary ?? activity.meetingData?.description ?? ''}
          </Text>
          <Text className={classes.detail} lineClamp={1} mt={5} c={'#595959'}>
            {Array.isArray(activity?.meetingData?.attendees) && activity?.meetingData?.attendees?.length > 0
              ? activity.meetingData.attendees.map((attendee) => attendee.name ?? attendee.email ?? '').join(', ')
              : activity.chatBotHistoryData?.participant?.email ?? ''}
          </Text>
        </Flex>

        <Flex
          direction="column"
          justify={'flex-start'}
          align="flex-start"
          ml={'16px'}
          gap={'16px'}
          h={'100%'}
          w={'20%'}>
          <Text fw={600} fz={'16px'} ff={'Roboto'} c={'#292929'}>
            {`Date : ${formatDateOrToday(activity.meetingData?.meetingStart ?? activity.createdAt)}`}
          </Text>
          <Text fw={600} fz={'16px'} ff={'Roboto'} c={'#292929'}>
            {`Time : ${formatTimeFromDate(activity.meetingData?.meetingStart ?? activity.createdAt)}`}
          </Text>
        </Flex>
        <Flex justify={'flex-end'} h={'100%'} w={'30%'} px={'42px'}>
          {meetingStatus === 'upcoming' || meetingStatus === 'ongoing' ? (
            <Flex direction="column" align="center" gap={'16px'}>
              <SimpleButton text="Join Now" disabled={!isJoinEnabled} onClick={handleOnClickJoinMeet} />

              <Flex gap={8}>
                <EditButton
                  iconSize={16.17}
                  defaultColor={theme.colors.azureBlue[1]}
                  iconColor={theme.colors.azureBlue[6]}
                  onClick={() => hanldeEditMeeting(meeting)}
                />

                {hasMessages && (
                  <IconButton
                    tooltipLabel="View Conversation"
                    iconSize={34}
                    defaultColor={theme.colors.azureBlue[1]}
                    iconColor={theme.colors.azureBlue[6]}
                    onClick={handleOnClickViewConversation}
                    icon={IconInfoSmall}
                  />
                )}

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
            <SimpleButton
              text={
                meetingStatus === 'invalid'
                  ? 'View Conversation'
                  : chatBotHistoryStatus === 'valid'
                  ? 'View Details'
                  : 'Meeting Info'
              }
              onClick={handleOnClickViewConversation}
              style={meetingStatus === 'invalid' ? { left: '22px' } : {}}
            />
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default ActivitiesCard;
