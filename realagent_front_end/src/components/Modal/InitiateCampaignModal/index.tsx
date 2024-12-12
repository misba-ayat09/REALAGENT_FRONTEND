import React, { useEffect, useRef, useState } from 'react';
import { Modal, Text, Button, Group, Flex, Box } from '@mantine/core';
import classes from './CampaignModal.module.css';
import { toast } from 'sonner';
import { MS_EXCEL_MIME_TYPE } from '@mantine/dropzone';
import { IconFileExcel, IconDownload } from '@tabler/icons-react';
import { CustomDropzone } from '../../CustomDropzone';
import { DatePicker, TimeInput } from '@mantine/dates';
import { groupAPI } from '../../../store/features/AddGroups';
import { useAppDispatch, useAppSelector } from '../../../store';
import { addCampaignEvent, getAllCampaignEvents } from '../../../store/features/CampaignEvent/campaignEventSlice.ts';
import { AddCampaignEventFormdata } from '../../../store/features/CampaignEvent/campaignEventAPI.ts.ts';
import { getallGroup } from '../../../store/features/AddGroups/groupsSlice.ts';

interface InitiateCampaignModalProps {
  open: boolean;
  onClose: () => void;
  campaignid: string;
}

const InitiateCampaignModal: React.FC<InitiateCampaignModalProps> = ({ open, onClose, campaignid }) => {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<File | null>(null);
  const openRef = useRef<() => void>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const groupId = useAppSelector((state) => state.groups.result);
  const id = groupId.map((group) => group._id);
  console.log(id, 'groupId');
  console.log(campaignid, 'campaignid');
  const [formData, setFormData] = useState<AddCampaignEventFormdata>({
    scheduledDate: null,
    group: '',
    campaign: campaignid,
  });

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (selectedDate && selectedTime) {
      const combinedDateTime = new Date(selectedDate);
      combinedDateTime.setHours(selectedTime.getHours());
      combinedDateTime.setMinutes(selectedTime.getMinutes());
      combinedDateTime.setSeconds(0);
      setFormData((prev) => ({
        ...prev,
        scheduledDate: combinedDateTime.toISOString(),
      }));
    }
  }, [selectedDate, selectedTime]);

  useEffect(() => {
    dispatch(getallGroup());
  }, [dispatch]);

  const handleOnClose = () => {
    onClose();
  };

  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      setFiles(files[0]);
    }
  };

  const handleOnSubmit = async () => {
    try {
      let newGroupId = '';
      if (files) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', files);
        const group = await groupAPI.AddGroup(uploadFormData);
        console.log('Group API Response:', group);
        if (group && group.result && group.result._id) {
          newGroupId = group.result._id;
        } else {
          toast.error('Error uploading file. Please try again.');
          return;
        }
      } else {
        toast.error('Please upload an Excel file before initiating.');
        return;
      }

      if (!formData.scheduledDate) {
        toast.error('Please select a scheduled date and time');
        return;
      }
      if (!newGroupId) {
        toast.error('Error uploading file. Please try again.');
        return;
      }
      const formattedDate = new Date(formData.scheduledDate).toISOString();
      await dispatch(
        addCampaignEvent({
          campaign: campaignid,
          scheduledDate: formattedDate,
          group: newGroupId,
        }),
      );
      toast.success('Campaign initiated successfully!');
      onClose();
      dispatch(
        getAllCampaignEvents({
          page: 1,
          limit: 20,
          sortOrder: 'desc',
          isApproved: false,
        }),
      );
    } catch (error) {
      console.error('Error initiating campaign:', error);
      toast.error('Error initiating the campaign. Please try again.');
    }
  };
  useEffect(() => {
    if (selectedDate && selectedTime) {
      const combinedDateTime = new Date(selectedDate);
      combinedDateTime.setHours(selectedTime.getHours());
      combinedDateTime.setMinutes(selectedTime.getMinutes());
      combinedDateTime.setSeconds(0);
      setFormData((prev) => ({
        ...prev,
        scheduledDate: combinedDateTime.toISOString(),
      }));
    }
  }, [selectedDate, selectedTime]);
  
  return (
    <>
      <Modal.Root
        opened={open}
        onClose={onClose}
        centered
        classNames={{
          root: classes.modalRoot,
        }}>
        <Modal.Overlay
          classNames={{
            overlay: classes.modalOverlay,
          }}
        />
        <Modal.Content
          classNames={{
            content: classes.modalContent,
          }}>
          <Modal.Header>
            <Group style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-start' }}>
              <Text className={classes.modalTitle}>Initiate Campaign</Text>
              <Text className={classes.modalTitle1}>Contacts exported will be reflected in the campaign</Text>
            </Group>
          </Modal.Header>
          <Modal.Body
            classNames={{
              body: classes.modalBody,
            }}>
            <Group justify="start">
              <Box
                className={classes.inputGroup}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <Text className={classes.label}>Upload Contacts</Text>
                <CustomDropzone openRef={openRef} onDrop={handleDrop} accept={MS_EXCEL_MIME_TYPE} />
              </Box>
              <Flex w={'100%'} gap={'md'} direction={'column'}>
                <Text className={classes.label}>Download sample excel file</Text>
                <Flex
                  px={5}
                  bg={'#E6F2FF'}
                  h={'50px'}
                  w={'80%'}
                  align={'center'}
                  justify={'space-between'}
                  onClick={() => {
                    window.open('https://storage.googleapis.com/realtorbot-public/documents/contacts.xlsx');
                  }}>
                  <IconFileExcel></IconFileExcel>
                  <Text className={classes.link}>Sample Excel</Text>
                  <IconDownload color={'#007BFF'}></IconDownload>
                </Flex>
              </Flex>
              <Flex dir="column" w={'100%'} align={'center'} justify={'center'}>
                <DatePicker minDate={new Date()} value={selectedDate} onChange={handleDateChange} />
              </Flex>
              <TimeInput
                label="Pick Time"
                withSeconds={false}
                required
                w={'100%'}
                value={selectedTime ? selectedTime.toTimeString().slice(0, 5) : undefined}
                onChange={(event) => {
                  const timeString = event.currentTarget.value;
                  const [hours, minutes] = timeString.split(':').map(Number);
                  if (selectedDate) {
                    const updatedTime = new Date(selectedDate);
                    updatedTime.setHours(hours);
                    updatedTime.setMinutes(minutes);
                    setSelectedTime(updatedTime);
                  }
                }}
              />

              <Flex gap={'md'} w={'100%'} justify={'flex-end'} mt={'10px'} mr={'20px'}>
                <Button className={classes.cancelButton} onClick={handleOnClose}>
                  Cancel
                </Button>
                <Button
                  variant="default"
                  className={classes.addButton}
                  onClick={handleOnSubmit}
                  disabled={!files}
                  bg={'#007BFF'}>
                  Initiate
                </Button>
              </Flex>
            </Group>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default InitiateCampaignModal;
