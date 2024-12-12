/* eslint-disable react-hooks/rules-of-hooks */
import { Card, Flex, Text } from '@mantine/core';
import { useState } from 'react';
import { MeetingFormModal } from '../../Modal';
import SimpleButton from '../../Button/SimpleButton';
import MeetingService from '../../../api/services/MeetingService';
import { ScheduleMeetingFormData } from '../../../api/types';
import { useLoadingState } from '../../../hooks';
import { toast } from 'sonner';
import { ApiResponseStatus, ErrorResponse } from '../../../services';
import { AxiosError } from 'axios';
import ActivityService from '../../../api/services/ActivityService';
import { format } from 'date-fns';
interface ScheduleMeetingCardProps {
  title: string;
  description: string;
  fetchMeetings?: () => void;
}

const ScheduleMeetingCard: React.FC<ScheduleMeetingCardProps> = ({ title, description, fetchMeetings }) => {
  const [meetingModelOpen, setModalOpenMeeting] = useState(false);

  const [isLoading, startLoading, finishLoading] = useLoadingState();

  const openModal = () => {
    setModalOpenMeeting(true);
  };

  const closeModal = () => {
    setModalOpenMeeting(false);
  };

  const handleCreateMeeting = async (data: ScheduleMeetingFormData) => {
    startLoading();
    try {
      const activityId = await ActivityService.create({});

      const meetingStart = data?.meetingStart
        ? format(data.meetingStart, "yyyy-MM-dd'T'HH:mm:ssXXX")
        : new Date().toISOString();

      const meetingEnd = data.meetingEnd ? format(data.meetingEnd, "yyyy-MM-dd'T'HH:mm:ssXXX") : undefined;
      const response = await MeetingService.create({
        ...data,
        activityId: activityId ? activityId.result._id : undefined,
        meetingStart,
        meetingEnd,
      });

      if (response && response.status === ApiResponseStatus.SUCCESS) {
        toast.success('Meeting scheduled successfully');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error((error as AxiosError<ErrorResponse>).response?.data.error?.message ?? 'An unknown error occurred');
      } else {
        toast.error('Failed to schedule meeting');
      }
    } finally {
      finishLoading();
      fetchMeetings && fetchMeetings();
    }
  };

  return (
    <Card p={'24px 16px'} w={'100%'} bg={'#FFFFFF'} radius={'15px'}>
      <Flex
        justify={'space-between'}
        align={'center'}
        w={'100%'}
        bg={'#F5F5F5'}
        p={'12.5px 24px'}
        style={{ borderRadius: '15px' }}>
        <Flex direction={'column'}>
          <Text fw={700} fz={24} c={'#292929'}>
            {title}
          </Text>
          <Text fw={400} fz={14} c={'#595959'}>
            {description}
          </Text>
        </Flex>
        <Flex>
          <MeetingFormModal
            opened={meetingModelOpen}
            onClose={closeModal}
            onAccept={(data) =>
              handleCreateMeeting({
                topic: data.topic,
                description: data.agenda,
                meetingStart: data.startDate?.toISOString() || new Date().toISOString(),
                meetingEnd: data.endDate?.toISOString(),
                attendees: data.attendees?.map((a) => ({ email: a })),
              })
            }
          />
          <SimpleButton loading={isLoading} text="Schedule Meeting" px={'22px'} onClick={openModal} />
        </Flex>
      </Flex>
    </Card>
  );
};

export default ScheduleMeetingCard;
