import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Modal,
  Group,
  Text,
  Flex,
  TextInput,
  Textarea,
  NumberInput,
  useMantineTheme,
  Divider,
  Paper,
} from '@mantine/core';
import SimpleButton from '../../Button/SimpleButton';
import styles from './index.module.css';
import { scaler } from '../../../utils';
import { WordLimit } from '../../WordLimit';
import { DateTimePicker } from '@mantine/dates';
import { PillsInput, Pill } from '@mantine/core';
import { toast } from 'sonner';

interface MeetingFormModalProps {
  opened: boolean;
  onClose: () => void;
  onAccept: (formData: FormData) => void;
  initialData?: Partial<FormData>;
}

interface FormData {
  topic: string;
  startDate: Date | null;
  endDate: Date | null;
  agenda: string;
  attendees: string[];
}

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const MeetingFormModal: React.FC<MeetingFormModalProps> = React.memo(({ opened, onClose, onAccept, initialData }) => {
  const theme = useMantineTheme();

  const [formData, setFormData] = useState<FormData>(() => ({
    topic: '',
    startDate: null,
    endDate: null,
    agenda: '',
    attendees: [],
    ...initialData,
  }));

  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [duration, setDuration] = useState<number>(1.0);

  useEffect(() => {
    if (initialData) {
      setFormData((prevData) => ({
        ...prevData,
        topic: initialData.topic || '',
        startDate: initialData.startDate || null,
        endDate: initialData.endDate || null,
        agenda: initialData.agenda || '',
        attendees: [...new Set(initialData.attendees || [])],
      }));

      if (initialData.startDate && initialData.endDate) {
        const durationInHours = (initialData.endDate.getTime() - initialData.startDate.getTime()) / (1000 * 60 * 60);
        setDuration(Math.round(durationInHours * 100) / 100);
      }
    } else {
      setFormData({ topic: '', startDate: null, endDate: null, agenda: '', attendees: [] });
    }
  }, [initialData, opened]);

  const calculateEndDate = useCallback(() => {
    if (formData.startDate) {
      const endDate = new Date(formData.startDate.getTime());
      endDate.setMinutes(endDate.getMinutes() + duration * 60);
      setFormData((prevData) => ({
        ...prevData,
        endDate,
      }));
    }
  }, [formData.startDate, duration]);

  useEffect(() => {
    calculateEndDate();
  }, [formData.startDate, duration, calculateEndDate]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (prevData[name as keyof FormData] !== value) {
        return {
          ...prevData,
          [name]: value,
        };
      }
      return prevData;
    });
  }, []);

  const handleDateChange = useCallback(
    (date: Date | null) => {
      setFormData((prevData) => ({
        ...prevData,
        startDate: date,
      }));
      calculateEndDate();
    },
    [calculateEndDate],
  );

  const handleDurationChange = useCallback(
    (value: number | string) => {
      const hours = Number(value);
      if (hours !== duration) {
        setDuration(hours);
        calculateEndDate();
      }
    },
    [calculateEndDate, duration],
  );

  const handleAttendeeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAttendeeEmail(e.target.value ?? '');
  }, []);

  const addAttendee = useCallback(
    (emailInput: string) => {
      const emailList = emailInput
        .split(',')
        .map((email) => email.trim())
        .filter((email) => email);

      let isDuplicate = false;

      emailList.forEach((email) => {
        if (email && !formData.attendees.includes(email.toLowerCase()) && validateEmail(email)) {
          setFormData((prevData) => ({
            ...prevData,
            attendees: [...prevData.attendees, email.toLowerCase()],
          }));
        } else if (!validateEmail(email)) {
          toast.warning(`Please enter a valid email address: ${email}`);
        } else if (formData.attendees.includes(email.toLowerCase())) {
          isDuplicate = true;
        }
      });

      if (isDuplicate) {
        toast.warning(`Some emails are already added.`);
      }

      setAttendeeEmail('');
    },
    [formData.attendees],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === ',' || e.key === 'Enter') {
        e.preventDefault();
        addAttendee(attendeeEmail);
      }
    },
    [attendeeEmail, addAttendee],
  );

  const handleBlur = useCallback(() => {
    addAttendee(attendeeEmail);
  }, [attendeeEmail, addAttendee]);

  const validateForm = (formData: FormData) => {
    const { topic, startDate, endDate, attendees} = formData;

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const validationMessages = [
      { condition: !topic, message: 'Topic is required to schedule a meeting.' },
      { condition: !startDate, message: 'Start date is required.' },
      { condition: !endDate, message: 'End date is required.' },
      { condition: start && end && end <= start, message: 'End date must be after the start date.' },
      { condition: !attendees || attendees?.length === 0, message: 'Please add at least one attendee.' },
    ];

    for (const { condition, message } of validationMessages) {
      if (condition) return message;
    }

    return null;
  };

  const handleSubmit = useCallback(() => {
    calculateEndDate();

    const errorMessage = validateForm(formData);

    if (errorMessage) {
      toast.warning(errorMessage);
      return;
    }

    onAccept(formData);
    onClose();
  }, [calculateEndDate, formData, onAccept, onClose]);

  const pills = useMemo(
    () =>
      formData.attendees.map((email, index) => (
        <Pill
          key={index}
          withRemoveButton
          bg={theme.colors.azureBlue[1]}
          onRemove={() =>
            setFormData((prev) => ({
              ...prev,
              attendees: prev.attendees.filter((_, i) => i !== index),
            }))
          }>
          {email}
        </Pill>
      )),
    [formData.attendees, theme.colors.azureBlue],
  );
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      radius={'15px'}
      styles={{ body: { padding: '0' } }}>
      <Flex direction="column" mih="604px" justify="flex-start" gap="8px" p="24px">
        <Flex direction="column" justify="center" gap="8px">
          <Flex direction="column" justify="center" align="flex-start" gap="8px">
            <Text className={styles.text}>{initialData ? 'Edit Meeting' : 'Schedule Meeting'}</Text>
            <Text className={styles.subText}>
              {initialData ? 'Modify the meeting details' : 'Schedule a meeting around your availability'}
            </Text>
            <Paper w={'100%'} pt={'4px'}>
              <Divider c={'#DCE5EA'} size={'2px'} />
            </Paper>
          </Flex>
          <TextInput
            w="100%"
            classNames={{
              input: styles.textInput,
            }}
            required
            label="Meeting Name"
            placeholder="Enter meeting name"
            value={formData.topic}
            onChange={handleInputChange}
            name="topic"
            type="text"
            maxLength={30}
            rightSectionWidth={scaler(62)}
            styles={{
              label: {
                paddingBottom: '8px',
              },
              input: {
                paddingRight: scaler(62),
              },
            }}
            rightSection={<WordLimit text={formData.topic} limit={30} />}
          />
          <DateTimePicker
            clearable
            w="100%"
            variant="filled"
            classNames={{
              input: styles.textInput,
            }}
            styles={{
              label: {
                paddingBottom: '8px',
              },
            }}
            required
            minDate={new Date()}
            label="Start Date and Time"
            placeholder="--/--/--  --:--:--"
            value={formData.startDate}
            onChange={handleDateChange}
            name="startDate"
          />
          <NumberInput
            value={duration}
            onChange={handleDurationChange}
            label="Duration (hours)"
            variant="filled"
            classNames={{
              input: styles.textInput,
            }}
            styles={{
              label: {
                paddingBottom: '8px',
              },
            }}
            min={0.5}
            max={24}
            step={0.25}
            placeholder="Enter duration in hours"
            required
          />
          <Textarea
            w="100%"
            classNames={{
              input: styles.textArea,
            }}
            label="Meeting Agenda"
            placeholder="Enter agenda here"
            value={formData.agenda}
            onChange={handleInputChange}
            name="agenda"
            required
            maxLength={200}
            rightSectionWidth={scaler(62)}
            styles={{
              label: {
                paddingBottom: '8px',
              },
              input: {
                paddingRight: scaler(62),
              },
            }}
            rightSection={<WordLimit text={formData.agenda} limit={200} />}
          />
          <PillsInput
            required
            label="Attendees"
            classNames={{
              input: styles.pillsInput,
            }}
            styles={{
              label: {
                paddingBottom: '8px',
              },
            }}>
            <Pill.Group>
              {pills}
              <PillsInput.Field
                style={{ width: '100%' }}
                placeholder="Enter attendee emails separated by commas"
                value={attendeeEmail}
                onChange={handleAttendeeChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                aria-label="Attendee email input"
              />
            </Pill.Group>
          </PillsInput>
        </Flex>
        <Group justify="flex-end" mt="md">
          <SimpleButton variant="light" text="Cancel" onClick={onClose} />
          <SimpleButton text={initialData ? 'Save Changes' : 'Schedule'} onClick={handleSubmit} />
        </Group>
      </Flex>
    </Modal>
  );
});

export default MeetingFormModal;
