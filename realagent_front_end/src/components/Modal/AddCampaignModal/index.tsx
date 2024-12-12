import React, { useEffect, useState } from 'react';
import { Modal, Text, Button, Group, TextInput, Flex } from '@mantine/core';
import { useAppDispatch } from '../../../store';
import classes from './CampaignModal.module.css';
import { AddCampaignFormdata } from '../../../store/features/AddCampaign';
import { addCampaign, getallCampaign } from '../../../store/features/AddCampaign/campaignSlice';

interface AddToCampaignModalProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

const AddCampaignModal: React.FC<AddToCampaignModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<AddCampaignFormdata>({
    campaignTitle: '',
    purpose: '',
  });

  useEffect(() => {
    dispatch(getallCampaign());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    await dispatch(addCampaign(formData));
    dispatch(getallCampaign());

    onClose();
  };
  const handleOnClose = () => {
    onClose();
  };

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
              <Text className={classes.modalTitle}>Add Campaign</Text>
            </Group>
          </Modal.Header>
          <Modal.Body
            classNames={{
              body: classes.modalBody,
            }}>
            <Group>
              <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
                <TextInput
                  classNames={{
                    input: classes.email_password_input,
                    label: classes.label,
                  }}
                  placeholder="Campaign name"
                  label="Campaign"
                  type="text"
                  name="campaignTitle"
                  required
                  value={formData.campaignTitle}
                  onChange={handleChange}
                />
                <TextInput
                  classNames={{
                    input: classes.email_password_input,
                    label: classes.label,
                  }}
                  placeholder="Purpose of the Campaign"
                  label="Purpose"
                  type="text"
                  name="purpose"
                  required
                  value={formData.purpose}
                  onChange={handleChange}
                />
              </div>
              <Flex gap={'md'} w={'100%'} justify={'flex-end'} mt={'10px'} p={'10px'} pr={40}>
                <Button className={classes.cancelButton} onClick={handleOnClose}>
                  Cancel
                </Button>
                <Button variant="default" className={classes.addButton} onClick={handleSubmit} bg={'#007BFF'}>
                  Save
                </Button>
              </Flex>
            </Group>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default AddCampaignModal;
