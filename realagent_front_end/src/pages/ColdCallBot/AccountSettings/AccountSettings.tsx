import { Flex, TextInput, Divider, Paper, Text, Button, Group, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import VoiceFileCard from '../../../components/Card/VoiceFileCard';
import { useAppSelector, useAppDispatch } from '../../../store';
import styles from './profile.module.css';
import { toast } from 'sonner';
import { AgentType } from '../../../common/enum/agent.enum';
import { addVoice, getVoiceConfig } from '../../../store/features/ColdCallBot';
import { getSavedNumber, getVoices, updateVoice } from '../../../store/features/ColdCallBot/coldCallBotSlice';
import { AddVoiceFormdata } from '../../../store/features/ColdCallBot/coldCallBotAPI';
import { phoneAgentAPI } from '../../../store/features/PhoneAgent/phoneAgentAPI';
import ConsentModal from '../../../components/Modal/ConsentModal';
import TrashButton from '../../../components/Button/TrashButton';
import WithModal from '../../../components/Modal/WithModal';

const AccountSettings: React.FC = () => {
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const calls = useAppSelector((state) => state.coldCallBot.configuration?.twilioPhoneNumber);
  const dispatch = useAppDispatch();
  const [selectedVoiceId, setSelectedVoiceId] = useState<string | null>(null);
  const name = useAppSelector((state) => state?.coldCallBot?.voices);
  const voice = useAppSelector((state) => state?.coldCallBot?.configuaration);
  const theme = useMantineTheme();
  useEffect(() => {
    dispatch(getSavedNumber(AgentType.ColdCalling));
    dispatch(getVoiceConfig(AgentType.ColdCalling));
    dispatch(getVoices());
  }, [ dispatch]);

  const [formData, setFormData] = useState<AddVoiceFormdata>({
    name: '',
    organization: '',
    startMessage: '',
    voiceId: '',
    enableReminder: false,
    remindBeforeHours: '',
    remindBeforeMinutes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setIsSaveDisabled(false);
  };

  const handleClick = () => {
    if (voice?._id) {
      handleUpdateClick();
    } else {
      handleAddClick();
    }
  };

  const handleAddClick = () => {
    setIsSaveDisabled(true);
    dispatch(addVoice(formData)).then(() => {
      dispatch(getVoiceConfig(AgentType.ColdCalling));
    });
  };

  const handleUpdateClick = () => {
    setIsSaveDisabled(true);
    dispatch(updateVoice(formData)).then(() => {
      dispatch(getVoiceConfig(AgentType.ColdCalling));
    });
  };

  const handleSelectVoice = (voiceId: string) => {
    setSelectedVoiceId(voiceId);
    setFormData((prev) => ({
      ...prev,
      voiceId,
    }));
    setIsSaveDisabled(false);
  };

  useEffect(() => {
    if (voice) {
      setFormData({
        name: voice.name || '',
        organization: voice.organization || '',
        startMessage: voice.startMessage || '',
        voiceId: voice.voiceId || '',
        enableReminder: voice.enableReminder || false,
        remindBeforeHours: voice.remindBeforeHours || '',
        remindBeforeMinutes: voice.remindBeforeMinutes || '',
      });
      setIsSaveDisabled(true);
      setSelectedVoiceId(voice.voiceId);
    }
  }, [voice]);

  const handleClickRemoveNumber = async () => {
    const toastId = toast.loading('Removing number...');

    try {
      const response = await phoneAgentAPI.removeNumber();

      if (response && response.success) {
        dispatch(getVoiceConfig(AgentType.ColdCalling));
        toast.success('Number successfully removed', {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error('Error removing number', {
        id: toastId,
      });
    }
  };

  return (
    <Flex direction={'column'} px="xs" bg={'#FFFFFF'}>
      <Group className={styles.group}>
        <Text className={styles.text1}>Settings</Text>
        <Text className={styles.text2}>User account settings</Text>
      </Group>
      <Flex>
        <Flex w={'100%'}>
          <Flex direction={'column'} gap={'24px'} w={'100%'} maw={'386px'}>
            <Group className={styles.group}>
              <label className={styles.label}>Your number</label>
              <Flex justify={'space-between'} align={'center'} gap={'30px'}>
                <Text>{calls ?? 'Your Number is not added'}</Text>
                {calls ? (
                  <WithModal
                    onAccept={() => handleClickRemoveNumber()}
                    ModalComponent={(e) => (
                      <ConsentModal
                        text={'Are you sure you want to delete this number?'}
                        subText={'This action cannot be undone and this number will be removed permanently.'}
                        {...e}
                      />
                    )}>
                    <TrashButton
                      iconSize={16.17}
                      defaultColor={theme.colors.azureBlue[1]}
                      iconColor={theme.colors.azureBlue[6]}
                    />
                  </WithModal>
                ) : null}
              </Flex>
            </Group>
            <TextInput
              classNames={{
                input: styles.text_input,
                label: styles.label,
              }}
              placeholder="Add Assistant name"
              label="Assistant Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <TextInput
              classNames={{
                input: styles.text_input,
                label: styles.label,
              }}
              placeholder="Add Organization name"
              label="Organization name"
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              error={errors.organization}
            />
            <Button className={styles.button} onClick={handleClick} disabled={isSaveDisabled}>
              Save
            </Button>
            <Group />
          </Flex>
        </Flex>
        <Flex px={'20px'} justify={'center'}>
          <Divider orientation="vertical" style={{ marginTop: '30px' }} pb={16} c={'#DCE5EA'} size={'2px'} />
        </Flex>
        <Flex w={'100%'} direction={'column'} gap={'24px'} style={{ marginTop: '25px' }}>
          <Paper>
            <Text className={styles.label}>Choose Voice</Text>
            <Text className={styles.subTitle}>Choose from variety of voices</Text>
          </Paper>
          {name
            ?.slice()
            .sort((a, b) => {
              return a.voiceId === selectedVoiceId ? -1 : b.voiceId === selectedVoiceId ? 1 : 0;
            })
            .map((item) => (
              <VoiceFileCard
                key={item.voiceId}
                voiceId={item.voiceId}
                name={item.name}
                url={item.previewUrl}
                isSelected={selectedVoiceId === item.voiceId}
                onSelectVoice={handleSelectVoice}
              />
            ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AccountSettings;
