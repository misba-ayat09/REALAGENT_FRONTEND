import React, { useEffect, useState } from 'react';
import classes from './index.module.css';
import { Button, Card, Divider, Flex, Text, Loader } from '@mantine/core';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Icon } from '../../../../components/common/Icons/Icon';
import { IconType } from '../../../../components/common/Icons';
import ActivityService from '../../../../api/services/ActivityService';
import { Activity } from '../../../../store/features/activities/types';
import SimpleButton from '../../../../components/Button/SimpleButton';
import Chat from '../../../../components/ActivitychatCard/chat';
import { isTruthy } from '../../../../utils';

enum ActivityPage {
  ACTIVITY = 'activity',
  CONVERSATION = 'conversation',
  TRANSCRIPTION = 'transcription',
}

const ActivitiesChat: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activityId = searchParams.get('activityId');
  const [activity, setActivity] = useState<Activity>();
  const [activityPage, setActivityPage] = useState<ActivityPage>(ActivityPage.ACTIVITY);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!activityId) return;

    (async () => {
      setLoading(true);
      try {
        const result = await ActivityService.find(activityId);
        if (result?.result) {
          setActivity(result.result);
        }
      } catch (error) {
        // TODO: Handle error
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      setActivity(undefined);
      setActivityPage(ActivityPage.ACTIVITY);
      setLoading(false); // Ensure loader stops on unmount
    };
  }, [activityId]);

  const handleClick = () =>
    activityPage === ActivityPage.ACTIVITY ? navigate(-1) : setActivityPage(ActivityPage.ACTIVITY);

  const hasRecording = isTruthy(activity?.meetingData?.recording);
  const hasMessages = isTruthy(activity?.chatBotHistoryData?.messages);
  const hasTranscription = hasRecording && isTruthy(activity?.meetingData?.transcription?.transcript);
  const noRecordingOrConversation = !activity || (!hasRecording && !hasMessages);

  return (
    <Flex direction={'column'} mih={'89vh'} bg={'#FFFFFF'} p={'16px'} gap={'16px'} className={'border-radius-full'}>
      <Button
        className={classes.button}
        onClick={handleClick}
        leftSection={<Icon icon={IconType.leftArrow} style={{ width: '11px', height: '20px' }} />}>
        Back
      </Button>

      {loading ? (
        <Flex justify={'center'} align={'center'} mih={'80vh'}>
          <Loader size="lg" variant="bars" />
        </Flex>
      ) : (
        <>
          {noRecordingOrConversation && (
            <>
              <Divider size={'2px'} c={'#DCE5EA'} />
              <Flex direction={'column'} align={'center'} gap={'8px'} mt={'24px'}>
                <Text fw={600} fz={'18px'} ff={'Roboto'} c={'#FF5733'}>
                  Oops! No recording or conversation is available for this activity.
                </Text>
                <Text fw={400} fz={'14px'} ff={'Roboto'} c={'#7A7A7A'}>
                  Please wait some time if something is expected to be here.
                </Text>
              </Flex>
            </>
          )}

          {activityPage === ActivityPage.ACTIVITY && activity && (
            <>
              <Flex justify={'flex-start'} align={'flex-start'} direction={'column'} gap={'4px'}>
                <Text fw={600} fz={'20px'} ff={'Roboto'} c={'#292929'}>
                  {Array.isArray(activity?.meetingData?.attendees) && activity?.meetingData?.attendees?.length > 0
                    ? activity.meetingData.attendees.map((attendee) => attendee.name).join(', ')
                    : activity.chatBotHistoryData?.participant?.name ?? ''}
                </Text>
                <Text fw={400} fz={'16px'} ff={'Roboto'} c={'#595959'}>
                  {Array.isArray(activity?.meetingData?.attendees) && activity?.meetingData?.attendees?.length > 0
                    ? activity.meetingData.attendees.map((attendee) => attendee.email).join(', ')
                    : activity.chatBotHistoryData?.participant?.email ?? ''}
                </Text>
              </Flex>

              {hasRecording && <Divider size={'2px'} c={'#DCE5EA'} mt={'15px'} />}

              {hasRecording && (
                <Flex gap={'10px'} mt={'0px'}>
                  <Card h={'192px'} miw={'337px'} p={0} maw={'337px'} bg={'#d6d6d6'}>
                    <video
                      height={'100%'}
                      width={'100%'}
                      style={{ margin: 0 }}
                      src={activity.meetingData?.recording}
                      controls
                    />
                  </Card>

                  {hasTranscription && (
                    <Flex direction={'column'} gap={'8px'}>
                      <Text fw={600} fz={'16px'} ff={'Roboto'} c={'#595959'}>
                        Meeting summary
                      </Text>
                      <Text fw={400} fz={'16px'} ff={'Roboto'} c={'#595959'}>
                        {activity?.meetingData?.transcription?.summary ?? 'No meeting summary available.'}
                      </Text>
                      <div>
                        <SimpleButton
                          text="View transcription"
                          onClick={() => setActivityPage(ActivityPage.TRANSCRIPTION)}
                        />
                      </div>
                    </Flex>
                  )}
                </Flex>
              )}

              {hasMessages && (
                <>
                  <Divider size={'2px'} c={'#DCE5EA'} />
                  <Flex direction={'column'} gap={'8px'}>
                    <Text fw={600} fz={'16px'} ff={'Roboto'} c={'#595959'}>
                      Chat summary
                    </Text>
                    <Text fw={400} fz={'16px'} ff={'Roboto'} c={'#595959'}>
                      {activity?.chatBotHistoryData?.summary ?? 'No summary available.'}
                    </Text>
                    {hasMessages && (
                      <div>
                        <SimpleButton
                          text="View conversation"
                          onClick={() => setActivityPage(ActivityPage.CONVERSATION)}
                        />
                      </div>
                    )}
                  </Flex>
                </>
              )}
            </>
          )}

          {activityPage === ActivityPage.CONVERSATION && (
            <>
              {hasMessages ? (
                <Chat
                  participantName={activity?.chatBotHistoryData?.participant?.name ?? 'Client Name'}
                  messages={activity?.chatBotHistoryData?.messages ?? []}
                />
              ) : (
                <Text fw={500} fz={16} c={'#7A7A7A'} mt={20} style={{ textAlign: 'center' }}>
                  No conversation available.
                </Text>
              )}
            </>
          )}

          {activityPage === ActivityPage.TRANSCRIPTION && (
            <Flex direction={'column'} gap={'8px'}>
              <Text fw={600} fz={'16px'} ff={'Roboto'} c={'#595959'}>
                Meeting transcription
              </Text>
              {hasTranscription ? (
                <Text fw={400} fz={'16px'} ff={'Roboto'} c={'#595959'}>
                  {activity?.meetingData?.transcription?.transcript ?? ''}
                </Text>
              ) : (
                <Text fw={500} fz={16} c={'#7A7A7A'} mt={20} style={{ textAlign: 'center' }}>
                  No transcription available.
                </Text>
              )}
              {hasMessages && (
                <div>
                  <SimpleButton text="View conversation" onClick={() => setActivityPage(ActivityPage.CONVERSATION)} />
                </div>
              )}
            </Flex>
          )}
        </>
      )}
    </Flex>
  );
};

export default ActivitiesChat;
