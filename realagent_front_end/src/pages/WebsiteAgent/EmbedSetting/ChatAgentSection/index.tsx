import React, { useEffect, useState } from 'react';
import SimpleButton from '../../../../components/Button/SimpleButton';
import { Divider, Flex, Input, Paper, PasswordInput, Text, TextInput, useMantineTheme } from '@mantine/core';
import styles from './index.module.css';
import TrashButton from '../../../../components/Button/TrashButton';
import WithModal from '../../../../components/Modal/WithModal';
import ConsentModal from '../../../../components/Modal/ConsentModal';
import { CopyToClipboardButton, IconButton } from '../../../../components';
import { cx } from '../../../../helper';
import { CustomDropzone } from '../../../../components/CustomDropzone';
import UploadedFileCard from '../../../../components/Card/UploadedFileCard';
import { ChatbotType } from '../../../../store/features/chatBot/types';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { ChatAPIKeyService, ChatBotService } from '../../../../api/services';
import { useLoadingState } from '../../../../hooks';
import ChatbotThunks from '../../../../store/features/chatBot/thunks';
import { IconRefresh } from '@tabler/icons-react';
import { IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { VIDEO_MIME_TYPE } from '../../../../components/CustomDropzone/mime-types';
import FileService from '../../../../api/services/FileService';
import { FileCategory } from '../../../../common/enum';
import { ApiCallStatus } from '../../../../services';
import { toast } from 'sonner';

export interface ChatbotAssetsType {
  chatbotProfilePicture: File;
  thumbnailVideo: File;
  introVideo: File;
}

const ChatAgentSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useMantineTheme();

  const chatBotstatus = useAppSelector((state) => state.chatBot.status);
  const [chatBotData] = useAppSelector((state) => state.chatBot.chatbots);
  const [apiKey] = useAppSelector((state) => state.chatBot.apiKeys);

  const [isGenerateApiKeyLoading, startGenerateApiKeyLoading, finishGenerateApiKeyLoading] = useLoadingState();

  const [formData, setFormData] = useState<Partial<ChatbotType>>({});
  const [assetsData, setAssetsData] = useState<Partial<ChatbotAssetsType>>({});

  useEffect(() => {
    if (chatBotData) {
      setFormData(chatBotData);
    }
  }, [chatBotData]);
  const validateMessage = (message: string): { isValid: boolean; error: string } => {
    // Trim the message to remove leading/trailing spaces
    const trimmedMessage = message.trim();

    // Check if message is empty or only whitespace
    if (!trimmedMessage) {
      return { isValid: false, error: 'Message cannot be empty' };
    }

    // Check if message starts with a special character or number
    if (/^[^a-zA-Z]/.test(trimmedMessage)) {
      return { isValid: false, error: 'Message must start with a letter' };
    }

    // Check if message is too short (less than 3 characters)
    if (trimmedMessage.length < 3) {
      return { isValid: false, error: 'Message must be at least 3 characters long' };
    }

    // Check if message contains only valid characters
    if (!/^[a-zA-Z][a-zA-Z0-9\s.,!?'"-]*$/.test(trimmedMessage)) {
      return { isValid: false, error: 'Message contains invalid characters' };
    }

    return { isValid: true, error: '' };
  };
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const chatbotProfilePicture = assetsData.chatbotProfilePicture?.name || formData.chatbotProfilePicture;
  const introVideo = assetsData.introVideo?.name || formData.introVideo;
  // const thumbnailVideo = assetsData.thumbnailVideo?.name || formData.thumbnailVideo;

  const handleDrop = (field: keyof ChatbotAssetsType) => (files: File[]) => {
    setAssetsData((prev) => ({ ...prev, [field]: files[0] }));
  };

  const removeAsset = (field: keyof ChatbotAssetsType) => () => {
    setAssetsData((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const removeFile = (field: keyof ChatbotType) => () => {
    setFormData((prev) => {
      const updated = { ...prev };
      updated[field] = '';
      return updated;
    });
  };
  const validateForm = (): boolean => {
    // Validate initial message
    const initialMessageValidation = validateMessage(formData.initialMessage || '');
    if (!initialMessageValidation.isValid) {
      toast.error(`Initial Message: ${initialMessageValidation.error}`);
      return false;
    }

    // Validate message placeholder
    const placeholderValidation = validateMessage(formData.messagePlaceholder || '');
    if (!placeholderValidation.isValid) {
      toast.error(`Message Placeholder: ${placeholderValidation.error}`);
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    const newFormData: Partial<ChatbotType> = { ...formData };
    if (assetsData?.chatbotProfilePicture) {
      const fileFormData = new FormData();
      fileFormData.append('file', assetsData.chatbotProfilePicture);
      fileFormData.append('fileCategory', FileCategory.IMAGE);
      const response = await FileService.create(FileCategory.IMAGE, fileFormData);
      newFormData.chatbotProfilePicture = response?.result?.fileName;
    }

    if (assetsData?.thumbnailVideo) {
      const fileFormData = new FormData();
      fileFormData.append('file', assetsData.thumbnailVideo);
      fileFormData.append('fileCategory', FileCategory.VIDEO);
      const response = await FileService.create(FileCategory.VIDEO, fileFormData);
      newFormData.thumbnailVideo = response?.result?.fileName;
    }

    if (assetsData?.introVideo) {
      const fileFormData = new FormData();
      fileFormData.append('file', assetsData.introVideo);
      fileFormData.append('fileCategory', FileCategory.VIDEO);
      const response = await FileService.create(FileCategory.VIDEO, fileFormData);
      newFormData.introVideo = response?.result?.fileName;
    }
    dispatch(ChatbotThunks.update(newFormData));
  };

  const handleGenerateApiKey = async () => {
    startGenerateApiKeyLoading();
    ChatAPIKeyService.create()
      .then(() => {
        dispatch(ChatbotThunks.findApiKey());
      })
      .finally(() => {
        finishGenerateApiKeyLoading();
      });
  };

  const handleDeleteToken = async () => {
    try {
      ChatAPIKeyService.remove().then(() => {
        dispatch(ChatbotThunks.findApiKey());
      });
    } catch (error) {
      //
    }
  };

  const handleRegenerateToken = async () => {
    try {
      ChatAPIKeyService.update().then(() => {
        dispatch(ChatbotThunks.findApiKey());
      });
    } catch (error) {
      //
    }
  };

  const handleDeleteChatbot = async () => {
    try {
      ChatBotService.remove().then(() => {
        dispatch(ChatbotThunks.findOne());
        handleDeleteToken();
      });
    } catch (error) {
      //
    }
  };

  return (
    <Flex direction={'column'} gap={'24px'}>
      <Flex>
        <Flex w={'45%'}>
          <Flex direction={'column'} gap={'24px'} w={'100%'} maw={'386px'}>
            <TextInput
              variant="filled"
              label="Initial Messages"
              placeholder="Hi! What can I help you with?"
              classNames={{ input: styles.textInputSmall }}
              value={formData.initialMessage}
              onChange={handleInputChange('initialMessage')}
            />
            {/* <TextInput
              variant="filled"
              label="Suggested Messages"
              placeholder="What is example.com?"
              classNames={{ input: styles.textInputSmall }}
              value={formData.suggestedMessage}
              onChange={handleInputChange('suggestedMessage')}
            /> */}
            <TextInput
              variant="filled"
              label="Message Placeholder"
              placeholder="Message..."
              classNames={{ input: styles.textInputSmall }}
              value={formData.messagePlaceholder}
              onChange={handleInputChange('messagePlaceholder')}
            />
            <Input.Wrapper label="Update chatbot profile picture">
              {chatbotProfilePicture ? (
                <UploadedFileCard
                  fileName={chatbotProfilePicture}
                  style={{ marginTop: '20px' }}
                  onDelete={
                    assetsData.chatbotProfilePicture?.name
                      ? removeAsset('chatbotProfilePicture')
                      : removeFile('chatbotProfilePicture')
                  }
                />
              ) : (
                <CustomDropzone
                  fullWidth
                  onDrop={handleDrop('chatbotProfilePicture')}
                  accept={IMAGE_MIME_TYPE}
                  subTitle="Supported File Types: .jpg, .jpeg, .png"
                  title="Click to select Image"
                />
              )}
            </Input.Wrapper>
            <TextInput
              variant="filled"
              label="Display name"
              placeholder="Enter name here"
              classNames={{ input: styles.textInputSmall }}
              value={formData.displayName}
              onChange={handleInputChange('displayName')}
            />
            <Input.Wrapper label="Upload Intro Video">
              {introVideo ? (
                <UploadedFileCard
                  fileName={introVideo}
                  style={{ marginTop: '20px' }}
                  onDelete={assetsData.introVideo?.name ? removeAsset('introVideo') : removeFile('introVideo')}
                />
              ) : (
                <CustomDropzone
                  fullWidth
                  onDrop={handleDrop('introVideo')}
                  accept={VIDEO_MIME_TYPE}
                  subTitle="Supported File Types: .mp4, .mov"
                  title="Click to select Video"
                />
              )}
            </Input.Wrapper>
            {/* <Input.Wrapper label="Upload Intro Video Thumbnail">
              {thumbnailVideo ? (
                <UploadedFileCard
                  fileName={thumbnailVideo}
                  style={{ marginTop: '20px' }}
                  onDelete={
                    assetsData.thumbnailVideo?.name ? removeAsset('thumbnailVideo') : removeFile('thumbnailVideo')
                  }
                />
              ) : (
                <CustomDropzone
                  fullWidth
                  onDrop={handleDrop('thumbnailVideo')}
                  accept={VIDEO_MIME_TYPE}
                  subTitle="Supported File Types: .mp4, .mov"
                />
              )}
            </Input.Wrapper> */}
            <div>
              <SimpleButton
                text="Save"
                mt={24}
                loading={chatBotstatus === ApiCallStatus.Loading}
                onClick={handleSave}
              />
            </div>
          </Flex>
        </Flex>
        <Flex px={'20px'} justify={'center'}>
          <Divider orientation="vertical" />
        </Flex>
        <Flex w={'65%'} direction={'column'} gap={'24px'}>
          <Paper>
            <Text className={styles.title}>Generate Token</Text>
            <Text className={styles.subTitle}>Generate a token to embed the chatbot on your website</Text>
            <div>
              <SimpleButton
                text="Generate Token"
                mt={24}
                disabled={!!apiKey?.apiKeyId}
                loading={isGenerateApiKeyLoading}
                onClick={handleGenerateApiKey}
              />
            </div>
          </Paper>
          {apiKey?.apiKeyId && (
            <Flex w={'100%'} justify={'space-between'} align={'center'} gap={'8px'} maw={'317px'}>
              <PasswordInput
                w={'100%'}
                variant="filled"
                classNames={{
                  input: cx(styles.textInputSmall, styles.inputDisplay),
                }}
                value={apiKey?.apiKeyId}
                readOnly
              />
              <CopyToClipboardButton
                value={apiKey?.apiKeyId}
                iconSize={16.17}
                defaultColor={theme.colors.azureBlue[1]}
                iconColor={theme.colors.azureBlue[7]}
                copiedColor={theme.colors.azureBlue[2]}
              />
              <IconButton
                icon={IconRefresh}
                iconSize={16.17}
                defaultColor={theme.colors.azureBlue[1]}
                iconColor={theme.colors.azureBlue[6]}
                onClick={handleRegenerateToken}
              />
              <WithModal
                onAccept={handleDeleteToken}
                ModalComponent={(e) => (
                  <ConsentModal
                    text={'Are you certain you want to delete this token?'}
                    subText={
                      'This action is irreversible. Deleting the token will disconnect the associated chatbot, and it will no longer function.'
                    }
                    {...e}
                  />
                )}>
                <TrashButton
                  iconSize={16.17}
                  defaultColor={theme.colors.azureBlue[1]}
                  iconColor={theme.colors.azureBlue[6]}
                />
              </WithModal>
            </Flex>
          )}
        </Flex>
      </Flex>
      <Flex
        bg={'rgba(178, 68, 50, 0.1)'}
        p={'35px 24px'}
        justify={'space-between'}
        align={'center'}
        style={{ borderRadius: '10px' }}>
        <Flex direction={'column'} gap={'16px'}>
          <Text className={styles.title}>Delete Chatbot</Text>
          <Text className={styles.subTitle} c={'#292929'}>
            Are you sure you want to delete this Chatbot. This action cannot be undone.
          </Text>
        </Flex>
        <SimpleButton text="Yes, Delete" color="#B24432" miw={'112px'} onClick={handleDeleteChatbot} />
      </Flex>
    </Flex>
  );
};

export default ChatAgentSection;
