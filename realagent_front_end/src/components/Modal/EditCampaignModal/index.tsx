import React, { useState, useEffect } from 'react';
import { Modal, Text, Button, Group, TextInput, Flex } from '@mantine/core';
import { useAppDispatch } from '../../../store';
import { toast } from 'sonner';
import classes from './edit.module.css';
import { UpdateCampaignFormdata } from '../../../store/features/AddCampaign';
import { getallCampaign, updateCampaign } from '../../../store/features/AddCampaign/campaignSlice';
interface EditModalProps {
  open: boolean;
  onClose: () => void;
  campaignDetailsToBeEdited: UpdateCampaignFormdata;
}

const EditCampaignModal: React.FC<EditModalProps> = ({ open, onClose, campaignDetailsToBeEdited }) => {
  const [formData, setFormData] = useState<UpdateCampaignFormdata>(campaignDetailsToBeEdited);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (campaignDetailsToBeEdited && open) {
      setFormData(campaignDetailsToBeEdited);
    }
  }, [campaignDetailsToBeEdited, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await dispatch(updateCampaign(formData)).then(() => {
      dispatch(getallCampaign());
      toast.success('Campaign updated successfully');
    });
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
        size={'xs'}
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
              <Text className={classes.modalTitle}>Edit Campaign</Text>
              <Text className={classes.modalTitle1}>Edited campaign will be reflected in the campaign list</Text>
            </Group>
          </Modal.Header>

          <Modal.Body
            classNames={{
              body: classes.modalBody,
            }}>
            <Group justify="center">
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                />
              </div>
              <Flex gap={'md'} w={'100%'} justify={'flex-end'} mt={'10px'}>
                <Button className={classes.cancelButton} onClick={handleOnClose}>
                  Cancel
                </Button>
                <Button variant="default" className={classes.addButton} onClick={handleSubmit} bg={'#007BFF'}>
                  Edit
                </Button>
              </Flex>
            </Group>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default EditCampaignModal;
