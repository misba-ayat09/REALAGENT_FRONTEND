import React, { useEffect, useState } from 'react';
import { Calendar, CalendarEventModal, ConnectedAccountsList } from '../../components';
import { Button, Divider, Flex, Modal, Paper, Text, useMantineTheme } from '@mantine/core';
import { EventContentArg, EventInput } from '@fullcalendar/core/index.js';
import { IconCircleCheck, IconEdit, IconTrash } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  calendarAPI,
  CalendarEventFormData,
  getCalendarEvents,
  removeEventToCalendar,
  updateEventInCalendar,
} from '../../store/features/calendar';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { toast } from 'sonner';
import { ApiResponseStatus, ErrorResponse } from '../../services';
import { AxiosError } from 'axios';
import { useConnectedAccounts } from '../../hooks';
import { SocialMedia } from '../../common/enum';
import { FlexBox } from '../../components/common/FlexBox/FlexBox';
import { IconType } from '../../components/common/Icons';
import { Icon } from '../../components/common/Icons/Icon';
import CalendarEventEditModal from '../../components/Modal/CalendarEventModal/CalendarEventEditModal';

const CalendarScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.authentication.userData);
  // const calendarData = useAppSelector((state) => state.calendar.calendarData);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null); // Store the selected event ID
  const isDesktop = useMediaQuery('(min-width: 1200px)');
  const theme = useMantineTheme();

  const [isModalOpen, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [isEditModalOpen, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);

  useEffect(() => {
    dispatch(getCalendarEvents());
  }, []);

  // useEffect(() => {
  //   if (calendarData) {
  //     const events = calendarData.map((item) => ({
  //       id: item.id,
  //       title: item.summary,
  //       start: new Date(item.start.dateTime),
  //       end: new Date(item.end.dateTime),
  //       allDay: false,
  //       extendedProps: {
  //         isCompleted: false,
  //       },
  //     }));
  //     setAllEvents(events);
  //   }
  // }, [calendarData]);

  const [allEvents, setAllEvents] = useState<EventInput[]>([]);

  const onPressAddEvent = () => openModal();

  const { connectedAccounts } = useConnectedAccounts();

  const handleRemoveEvent = async (id: string) => {
    try {
      // Wait for the deletion to complete and get the result
      await dispatch(removeEventToCalendar(id)).unwrap();

      // Filter out the deleted event from the allEvents state
      setAllEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));

      // Close the delete modal
      setIsDeleteModal(false);

      // Show success toast
      toast.success('Event removed successfully!');
    } catch (error) {
      toast.error('Failed to remove event');
    }
  };

  const handleUpdateEvent = async (eventData: CalendarEventFormData) => {
    try {
      // Assuming you have access to the event ID in a different way, or need to update this logic
      const id = selectedEventId; // Make sure `selectedEventId` is set correctly

      if (!id) {
        toast.error('No event selected to update.');
        return;
      }

      await dispatch(updateEventInCalendar({ id, formData: eventData })).unwrap();
      toast.success('Event updated successfully!');
    } catch (error) {
      toast.error('Failed to update event');
    }
  };

  const handleAddEvent = async (formData: CalendarEventFormData) => {
    try {
      const response = await calendarAPI.addEventToCalendar(formData);
      if (response?.status === ApiResponseStatus.SUCCESS) {
        toast.success('Event added successfully!');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error((error as AxiosError<ErrorResponse>).response?.data.error?.message ?? 'An unknown error occurred');
      } else {
        toast.error('Failed to add event');
      }
    } finally {
      dispatch(getCalendarEvents());
    }
  };

  const renderEventContent = (eventContent: EventContentArg) => {
    const { event } = eventContent;
    const isCompleted = event.extendedProps.isCompleted;

    return (
      <Flex justify={'flex-start'} align={'center'} gap={5}>
        <span className="ml-2">{isCompleted ? <IconCircleCheck className="h-5 w-5 text-green-500" /> : ''}</span>
        <span
          style={{
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}>
          {event.title}
        </span>
        <IconTrash
          className="h-5 w-5 text-red-500 hover:text-red-700 ml-3 cursor-pointer"
          onClick={() => {
            setIsDeleteModal(true);
            setSelectedEventId(event.id); // Set the selected event ID when trash is clicked
          }}
        />
        <IconEdit
          className="h-5 w-5 text-gray-500 hover:text-blue-500 ml-3 cursor-pointer"
          onClick={() => {
            openEditModal();
            setSelectedEventId(event.id); // Set the selected event ID when edit icon is clicked
          }}
        />
      </Flex>
    );
  };

  return (
    <Flex direction={'column'} gap={'2.5px'}>
      <Flex direction={'column'} px="xs" py="xs" bg={'#FFFFFF'} mih={'calc(100vh - 100px)'} w={'100%'}>
        <Modal bg="rgba(240, 245, 248, 1)" opened={isDeleteModal} onClose={() => setIsDeleteModal(false)}>
          <FlexBox
            borderRadius={10}
            padding={10}
            margin={0}
            height={isDesktop ? 177 : 'auto'}
            width={'100%'}
            style={{ flexDirection: 'column', alignItems: 'center' }}
            alignContent="center"
            justifyContent="space-between"
            container>
            <Text>Are you sure you want to delete this Event?</Text>
            <FlexBox container alignContent="center" width={'100%'} justifyContent="center" style={{ gap: '40px' }}>
              <Button
                bg={theme.colors.azureBlue[2]}
                onClick={() => setIsDeleteModal(false)}
                styles={(theme) => ({
                  root: {
                    color: theme.colors.azureBlue[7],
                  },
                })}>
                Cancel
              </Button>
              <Button
                bg={theme.colors.azureBlue[7]}
                onClick={() => selectedEventId && handleRemoveEvent(selectedEventId)} // Call the remove function with the selected event ID
                styles={() => ({
                  root: {
                    color: 'white',
                  },
                })}>
                Delete
              </Button>
            </FlexBox>
          </FlexBox>
        </Modal>

        <Flex direction={'row'} justify={'space-between'} p={'xs'}>
          <Flex direction={'column'} gap={'2.5px'} style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 600 }}>{`${userData.firstName ?? ''}'s Calendar`}</Text>
            <Text style={{ fontSize: 16, fontWeight: 400, color: '#595959' }}>
              View and manage all your calendar events
            </Text>
          </Flex>
          <ConnectedAccountsList
            accounts={connectedAccounts[SocialMedia.GOOGLE]}
            label="Synced"
            icon={<Icon icon={IconType.Sync} style={{ width: 20, height: 20, marginTop: 10 }} />}
          />
        </Flex>

        <Paper w={'100%'}>
          <Divider pb={16} c={'#DCE5EA'} size={'2px'} />
        </Paper>

        <CalendarEventModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleAddEvent} />

        <CalendarEventEditModal isOpen={isEditModalOpen} onClose={closeEditModal} onSubmit={handleUpdateEvent} />

        <Calendar
          customButtons={{
            addEvent: {
              text: 'Add Event',
              click: onPressAddEvent,
            },
          }}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'addEvent',
          }}
          events={allEvents}
          nowIndicator={true}
          eventContent={renderEventContent}
        />
      </Flex>
    </Flex>
  );
};

export default CalendarScreen;
