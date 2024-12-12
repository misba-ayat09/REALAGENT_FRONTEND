import React, { useState } from 'react';
import { Modal, Button, TextInput, Group, Stack, MultiSelect, Flex } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useLoadingState } from '../../../hooks';
import { CalendarEventFormData, getCalendarEvents } from '../../../store/features/calendar';
import { toast } from 'sonner';
import { useAppDispatch } from '../../../store';

export type Attendee = {
  email?: string;
  name?: string;
};

interface CalendarEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: CalendarEventFormData) => void;
}

const CalendarEventModal: React.FC<CalendarEventModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [summary, setSummary] = useState<string>('');
  const [startDateTime, setStartDateTime] = useState<Date>(new Date());
  const [endDateTime, setEndDateTime] = useState<Date>(new Date());
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [newAttendee, setNewAttendee] = useState<Attendee>({});
  const [timezone] = useState<string>('Asia/Kolkata');
  const [isLoading, startLoading, finishLoading] = useLoadingState();
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (!summary.trim()) {
      toast.warning('Please enter a summary for the event.');
      return;
    }

    if (!startDateTime) {
      toast.warning('Start date is required.');
      return;
    }

    if (!endDateTime) {
      toast.warning('End date is required.');
      return;
    }

    if (new Date(endDateTime) <= new Date(startDateTime)) {
      toast.warning('End date must be after the start date.');
      return;
    }

    if (!attendees || attendees?.length === 0) {
      toast.warning('Please add at least one attendee.');
      return;
    }

    try {
      startLoading();
      const eventData: CalendarEventFormData = {
        summary,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: timezone,
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: timezone,
        },
        reminders: {
          useDefault: true,
        },
        attendees,
      };
      onSubmit(eventData);
    } catch (error) {
      console.error('Error submitting event:', error);
      toast.error('Error submitting event. Please try again.');
    } finally {
      finishLoading();
      onClose();
      dispatch(getCalendarEvents());
    }
  };

  const handleAddAttendee = () => {
    if (newAttendee.email || newAttendee.name) {
      setAttendees([...attendees, newAttendee]);
      setNewAttendee({});
    }
  };

  return (
    <Modal opened={isOpen} onClose={onClose} p={0} styles={{ body: { padding: 0 } }} title="Add Calendar Event">
      <Stack gap="md" p={0}>
        <TextInput
          px={20}
          label="Event Summary"
          placeholder="Enter event summary"
          value={summary}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSummary(event.currentTarget.value)}
          required
        />
        <Flex justify={'space-between'}>
          <DateTimePicker
            px={20}
            w={'50%'}
            minDate={new Date()}
            label="Start Date and Time"
            placeholder="Pick start date and time"
            value={startDateTime}
            onChange={(date) => {
              if (date) {
                setStartDateTime(date);
              }
            }}
            required
          />
          <DateTimePicker
            px={20}
            w={'50%'}
            minDate={new Date()}
            label="End Date and Time"
            placeholder="Pick end date and time"
            value={endDateTime}
            onChange={(date) => {
              if (date) {
                setEndDateTime(date);
              }
            }}
            required
          />
        </Flex>
        <MultiSelect
          px={20}
          label="Attendees"
          placeholder="Select attendees"
          data={attendees.map((attendee, index) => ({
            value: `${index}`,
            label: `${attendee.name || ''} (${attendee.email || ''})`.trim(),
          }))}
          value={attendees.map((_, index) => `${index}`)}
          onChange={(values) => {
            setAttendees(values.map((value) => attendees[parseInt(value, 10)]));
          }}
          searchable
        />
        <Flex direction={'column'} gap="md" bg={'#F0F5F8'} px={20} py={'md'}>
          <TextInput
            label="Add Attendee Email"
            placeholder="Enter email"
            value={newAttendee.email || ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setNewAttendee({
                ...newAttendee,
                email: event.currentTarget.value,
              })
            }
          />
          <TextInput
            label="Add Attendee Name"
            placeholder="Enter name"
            value={newAttendee.name || ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setNewAttendee({
                ...newAttendee,
                name: event.currentTarget.value,
              })
            }
          />
          <Group>
            <Button onClick={handleAddAttendee}>Add Attendee</Button>
          </Group>
        </Flex>
        <Flex direction={'column'} w={'100%'} mt="md" px={20} pb={20}>
          <Button loading={isLoading} onClick={handleSubmit}>
            Add Event
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
};

export default CalendarEventModal;
