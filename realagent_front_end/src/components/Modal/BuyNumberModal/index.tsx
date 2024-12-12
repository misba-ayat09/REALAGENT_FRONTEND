import React, { useEffect, useState } from 'react';
import { Modal, Text, Divider, Paper, TextInput, Loader, Flex } from '@mantine/core';
import { toast } from 'sonner';
import classes from './numberModal.module.css';
import { useAppDispatch, useAppSelector } from '../../../store';
import {
  addTwilioNumber,
  getAvailableNumber,
  getSavedNumber,
  getVoiceConfig,
} from '../../../store/features/ReceptionistAgent';
import SimpleButton from '../../Button/SimpleButton';
import { AgentType } from '../../../common/enum/agent.enum';

interface BuyNumberModalProps {
  open: boolean;
  onClose: () => void;
}

const BuyNumberModal: React.FC<BuyNumberModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const availableNumber = useAppSelector((state) => state.phoneAgent?.number?.phoneNumber);
  const [organizationName, setOrganizationName] = useState('Realtor');
  const [loading, setLoading] = useState({ fetch: false, submit: false });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (organizationName.trim() === '') {
      toast.error('Organization name cannot be empty.');
      return;
    }

    if (availableNumber) {
      setLoading((prev) => ({ ...prev, submit: true }));
      try {
        await dispatch(addTwilioNumber({ phoneNumber: availableNumber, organizationName })).unwrap();
        dispatch(getSavedNumber(AgentType.Receptionist));
        dispatch(getVoiceConfig(AgentType.Receptionist));
        setSuccess(true);
      } catch (error) {
        toast.error('Failed to save the number.');
      } finally {
        setLoading((prev) => ({ ...prev, submit: false }));
      }
    } else {
      toast.error('No available number to add.');
    }
  };

  useEffect(() => {
    if (open) {
      setSuccess(false); // Reset success state on open
      setLoading((prev) => ({ ...prev, fetch: true }));
      dispatch(getAvailableNumber())
        .unwrap()
        .catch(() => toast.error('Failed to fetch available number'))
        .finally(() => setLoading((prev) => ({ ...prev, fetch: false })));
    }
  }, [dispatch, open]);

  const handleContinue = () => {
    onClose(); // Close modal on continue
  };

  return (
    <Modal.Root opened={open} onClose={onClose} centered>
      <Modal.Overlay />
      <Modal.Content classNames={{ content: classes.modalContent }}>
        {success ? (
          <Modal.Body p={0} classNames={{ body: classes.modalBody }}>
            <Flex h={'332px'} w={'100%'} direction="column" align="center" justify="center">
              <Flex
                p={10}
                h={'50%'}
                w={'100%'}
                className={classes.congratsFlex}
                direction="column"
                align="center"
                justify="center"
                gap="lg">
                <Text className={classes.title}>Your number</Text>
                <Text className={classes.generatedNumber}>{availableNumber}</Text>
              </Flex>

              <Flex
                px={30}
                py={10}
                h={'50%'}
                direction="column"
                align="center"
                justify="center"
                gap="lg"
                bg={'#FFFFFF'}>
                <Text className={classes.congratsTitle}>Amazing work!</Text>
                <Text className={classes.congratsSubtitle}>
                  Your personalized number has been generated. It's one of a kind!
                </Text>
                <SimpleButton text="Continue" onClick={handleContinue} />
              </Flex>
            </Flex>
          </Modal.Body>
        ) : (
          <>
            <Modal.Header>
              <Flex direction="column" align="flex-start">
                <Text className={classes.modalTitle}>Generated a number for you</Text>
                <Text className={classes.modalSubtitle}>This is your generated phone number</Text>
              </Flex>
            </Modal.Header>
            <Modal.Body classNames={{ body: classes.modalBody }}>
              <Paper>
                <Divider pb={16} color="#DCE5EA" />
              </Paper>
              {loading.fetch ? (
                <Flex h="100%" mih={200} w="100%" justify="center" align="center">
                  <Loader size="lg" />
                </Flex>
              ) : (
                <Flex direction="column" gap="md">
                  <div className={classes.inputGroup}>
                    <Text className={classes.text}>Current allotted number</Text>
                    <TextInput value={availableNumber || 'Loading...'} readOnly className={classes.numberInput} />
                  </div>
                  <div className={classes.inputGroup}>
                    <Text className={classes.text}>Organization name</Text>
                    <TextInput
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      placeholder="Enter organization name..."
                      className={classes.numberInput}
                    />
                  </div>
                  <Flex justify="flex-end" gap="md" align="center" mt="lg">
                    <SimpleButton text="Cancel" onClick={onClose} className={classes.cancelButton} />
                    <SimpleButton
                      text="Confirm"
                      loading={loading.submit}
                      onClick={handleSubmit}
                      className={classes.confirmButton}
                      disabled={loading.submit}
                    />
                  </Flex>
                </Flex>
              )}
            </Modal.Body>
          </>
        )}
      </Modal.Content>
    </Modal.Root>
  );
};

export default BuyNumberModal;
