import {
  Flex,
  TextInput,
  Divider,
  Paper,
  Text,
  Button,
  Group,
  Textarea,
  useMantineTheme,
  RadioGroup,
  Radio,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import VoiceFileCard from '../Card/VoiceFileCard';
import { useAppSelector, useAppDispatch } from '../../store';
import { getSavedNumber } from '../../store/features/ReceptionistAgent';
import { AddVoiceFormdata, phoneAgentAPI } from '../../store/features/ReceptionistAgent/ReceptionistAgentAPI';
import {
  addVoice,
  updateVoice,
  getVoiceConfig,
  getVoices,
} from '../../store/features/ReceptionistAgent/receptionistAgentSlice';
import styles from './profile.module.css';
import TrashButton from '../Button/TrashButton';
import WithModal from '../Modal/WithModal';
import ConsentModal from '../Modal/ConsentModal';
import { toast } from 'sonner';
import PhoneInput from 'react-phone-input-international';
import SimpleButton from '../Button/SimpleButton';
import { AgentType } from '../../common/enum/agent.enum';

export default function AccountSettingsCard() {
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const calls = useAppSelector((state) => state.phoneAgent.configuration?.twilioPhoneNumber);
  const dispatch = useAppDispatch();
  const [selectedVoiceId, setSelectedVoiceId] = useState<string | null>(null);
  const name = useAppSelector((state) => state?.phoneAgent?.voices);
  const voice = useAppSelector((state) => state?.phoneAgent?.configuaration);
  const theme = useMantineTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };
  useEffect(() => {
    dispatch(getSavedNumber(AgentType.Receptionist));
    dispatch(getVoiceConfig(AgentType.Receptionist));
    dispatch(getVoices());
  }, [dispatch]);

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
      dispatch(getVoiceConfig(AgentType.Receptionist));
    });
  };

  const handleUpdateClick = () => {
    setIsSaveDisabled(true);
    dispatch(updateVoice(formData)).then(() => {
      dispatch(getVoiceConfig(AgentType.Receptionist));
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
        dispatch(getVoiceConfig(AgentType.Receptionist));
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
    <Flex direction={'column'}>
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
              </Flex>
            </Group>

            <RadioGroup mb="md" label="Choose Voice">
              <Group dir="row" mt={'lg'}>
                <Radio label="Male" value="male" />
                <Radio label="Female" value="female" />
              </Group>
            </RadioGroup>
            <Group gap={'0px'}>
              <Text className={styles.label}>Forward Call To (Optional)</Text>
              <PhoneInput
                placeholder="Phone Number"
                enableSearch
                disableSearchIcon
                country={'us'}
                onBlur={handleBlur}
                onFocus={handleFocus}
                containerStyle={{
                  width: 'calc(350px * var(--scale-factor))',
                  height: 'calc(46px * var(--scale-factor))',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '64px',
                  marginTop: '10px',
                  border: 'none',
                  outline: 'none',
                }}
                inputStyle={{
                  width: '100%',
                  height: 'calc(46px * var(--scale-factor))',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '64px',
                  backgroundColor: 'rgba(106, 106, 106, 0.1)',
                  border: 'none',
                  outline: 'none',
                }}
                searchStyle={{
                  width: 'calc(165px * var(--scale-factor))',
                  height: 'calc(31px * var(--scale-factor))',
                  borderRadius: '5px',
                  backgroundColor: 'white',
                  borderColor: isFocused ? 'green' : '#B24432',
                  padding: '10px',
                  margin: '0px',
                  placeSelf: 'center',
                  fontSize: 'calc(16 * var(--scale-factor))',
                  fontFamily: 'Roboto',
                }}
                dropdownStyle={{
                  width: 'calc(188px * var(--scale-factor))',
                  height: 'calc(182px * var(--scale-factor))',
                  border: 'none',
                  outline: 'none',
                  fontSize: 'calc(16 * var(--scale-factor))',
                  fontFamily: 'Roboto',
                  padding: '10x',
                  borderRadius: '5px',
                  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
                }}
                buttonStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: 'none',
                  outline: 'none',
                  borderTopLeftRadius: '64px',
                  borderBottomLeftRadius: '64px',
                }}
              />
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
            <Textarea
              classNames={{
                input: styles.text_area,
                label: styles.label,
              }}
              placeholder="Intro Message"
              label="First Message"
              name="startMessage"
              value={formData.startMessage}
              onChange={handleChange}
              error={errors.startMessage}
            />
            <Button className={styles.button} onClick={handleClick} disabled={isSaveDisabled}>
              Save
            </Button>
            <Group />
            <Flex
              bg={'rgba(178, 68, 50, 0.1)'}
              p={'35px 24px'}
              justify={'space-between'}
              align={'center'}
              gap={'2px'}
              style={{ borderRadius: '10px' }}>
              <Flex direction={'column'} gap={'16px'}>
                <Text ff={'Roboto'} fw={600} fz={'14px'} c={'#292929'}>
                  Delete Number
                </Text>
                <Flex direction={'row'} gap={'16px'}>
                  <TrashButton iconSize={16.17} defaultColor={theme.colors.red[1]} iconColor={theme.colors.red[6]} />
                  <Text ff={'Roboto'} fw={400} fz={'14px'} c={'#292929'}>
                    Deleting number will erase all your logs and permanently remove your account.{' '}
                  </Text>
                </Flex>
              </Flex>
              <WithModal
                onAccept={() => handleClickRemoveNumber()}
                ModalComponent={(e) => (
                  <ConsentModal
                    text={'Are you sure you want to delete this number?'}
                    subText={'This action cannot be undone and this number will be removed permanently.'}
                    {...e}
                  />
                )}>
                <SimpleButton text="Delete" color="#B24432" miw={'112px'} onClick={handleClickRemoveNumber} />
              </WithModal>
            </Flex>
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
}
