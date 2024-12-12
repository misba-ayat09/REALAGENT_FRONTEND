import React, { useCallback, useState } from 'react';
import { Modal, Text, Button, Flex, Textarea, Group } from '@mantine/core';
import styles from './PostModal.module.css';
import { fileHubAPI } from '../../../store/features/fileHub/fileHubAPI';
import { FileCategory, SocialMedia } from '../../../common/enum';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { socialMediaAgentAPI } from '../../../store/features/socialMediaAgent';
import { limitText } from '../../../utils';
import { useLoadingState } from '../../../hooks';
import { useAppDispatch, useAppSelector } from '../../../store';
import { updateSocialMediaContent } from '../../../store/features/socialMediaAgent/social-media-content/socialMediaContentSlice';
import { toast } from 'sonner';
import { IconType } from '../../common/Icons';
import { randomId } from '@mantine/hooks';
import { GcpImage } from '../../common/Image';

export interface SocialMediaPostData {
  id: string;
  image: string;
  post: string;
  hashtags: string;
  isApproved: boolean;
}

interface PostModalProps {
  opened: boolean;
  data: SocialMediaPostData;
  setData: React.Dispatch<React.SetStateAction<SocialMediaPostData>>;
  onClose: () => void;
  onSave: () => void;
}

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

export const PostModal: React.FC<PostModalProps> = ({ opened, data, setData, onClose, onSave }: PostModalProps) => {
  const [imgUrl, setImgUrl] = useState<string>();
  const [selectedButtons, setSelectedButtons] = useState<{
    [key: string]: boolean;
  }>({
    facebook: false,
    twitter: false,
    linkedin: false,
    instagram: false,
  });

  const [isLoading, startLoading, finishLoading] = useLoadingState();
  const dispatch = useAppDispatch();
  const connectedAccounts = useAppSelector((state) => state.authentication.connectedAccounts);

  const onValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnSave = async () => {
    // setImgUrl(undefined);
    startLoading();
    const selectedPlatforms: SocialMedia[] = Object.keys(selectedButtons)
      .filter((key) => selectedButtons[key])
      .map((key) => {
        switch (key) {
          case 'facebook':
            return SocialMedia.FACEBOOK;
          case 'twitter':
            return SocialMedia.TWITTER;
          case 'linkedin':
            return SocialMedia.LINKEDIN;
          case 'instagram':
            return SocialMedia.INSTAGRAM;
          default:
            throw new Error(`Unsupported platform: ${key}`);
        }
      });

    if (selectedPlatforms?.length === 0) {
      toast.error('Please select at least one social media platform');
      finishLoading();
      return;
    }

    try {
      const formattedContent = limitText(data.post + ' ' + data.hashtags, 280);

      await socialMediaAgentAPI.sendAyrSocialMediaPost({
        post: formattedContent,
        platform: selectedPlatforms,
        fileName: data.image,
        fileCategory: FileCategory.IMAGE,
      });

      await dispatch(
        updateSocialMediaContent({
          isApproved: true,
          id: data.id,
          platform: selectedPlatforms,
          prompt: '',
          post: '',
          hashtags: '',
          image: '',
        }),
      );
      toast.success('Post submitted successfully to selected platforms');
      onSave();
    } catch (error) {
      toast.error('Failed to post to selected platforms');
    } finally {
      finishLoading();
    }
  };

  const handleOnClose = () => {
    setImgUrl(undefined);
    onClose();
  };

  const handleButtonClick = (key: string) => {
    setSelectedButtons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      if (!files || files?.length === 0) {
        alert('No image files selected!');
        return;
      }

      const validImageFiles = Array.from(files).filter((file) => file.type.match(imageTypeRegex));

      if (validImageFiles?.length === 0) {
        alert('Selected image is not of a valid type!');
        return;
      }

      const selectedFile = validImageFiles[0];
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const { result } = event.target as FileReader;
        if (result) {
          setImgUrl(result as string);
        }
      };
      fileReader.readAsDataURL(selectedFile);

      (async () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('fileCategory', FileCategory.IMAGE);

        try {
          const response = await fileHubAPI.uploadFile(FileCategory.IMAGE, formData);

          if (response?.result?.fileName) {
            setData((prev) => ({
              ...prev,
              image: response.result.fileName,
            }));
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      })();
    },
    [setImgUrl, setData],
  );

  return (
    <Modal.Root
      opened={opened}
      onClose={handleOnClose}
      centered
      classNames={{
        root: styles.modalRoot,
        overlay: styles.modalOverlay,
        content: styles.modalContent,
        header: styles.modalHeader,
        close: styles.modalClose,
        body: styles.modalBody,
      }}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Group
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'flex-start',
            }}>
            <Text className={styles.modalTitle}>Posts</Text>
            <Text className={styles.modalTitle1}>Post this on social media </Text>
          </Group>
        </Modal.Header>
        <Modal.Body>
          <Flex direction={'column'} gap={'md'}>
            <Flex mih={'300px'} justify={'center'} align={'center'} w={'35%'} miw={'400px'}>
              <GcpImage
                file={{
                  fileName: data?.image,
                }}
                src={imgUrl}
                alt={'Image'}
                height={'300px'}
                width={'450px'}
                className={styles.image}
                onClick={() => {
                  const fileInput = document.getElementById('post-image-upload') as HTMLInputElement | null;
                  if (fileInput) {
                    fileInput.click();
                  }
                }}
              />
              <label htmlFor="post-image-upload" style={{ display: 'none' }} />
              <input
                type="file"
                id="post-image-upload"
                onChange={changeHandler}
                accept="image/png, image/jpg, image/jpeg"
                style={{ display: 'none' }}
              />
            </Flex>
            <Group>
              <Flex direction={'row'} gap={'md'} justify={'space-between'}>
                <Text c={'#B1B1B1'} ff={'Roboto'} fz={'16px'} fw={600}>
                  Select social media{' '}
                </Text>
              </Flex>
            </Group>
            <Flex direction={'row'} gap={'md'}>
              {/* <Button
                variant={selectedButtons.facebook ? 'light' : 'outline'}
                h={'34px'}
                w={'121px'}
                radius={40}
                onClick={() => handleButtonClick('facebook')}
                leftSection={selectedButtons.facebook && <IconCircleCheckFilled />}>
                Facebook
              </Button> */}
              {connectedAccounts?.length > 0 ? (
                connectedAccounts
                  .filter((account) => account.icon !== IconType.google)
                  .map((account) => {
                    return (
                      <Button
                        variant={selectedButtons[account.icon] ? 'light' : 'outline'}
                        h={'34px'}
                        miw={'121px'}
                        radius={40}
                        key={randomId()}
                        onClick={() => handleButtonClick(account.icon)}
                        leftSection={selectedButtons[account.icon] && <IconCircleCheckFilled />}>
                        {account.label}
                      </Button>
                    );
                  })
              ) : (
                <></>
              )}
              {/* <Button
                variant={selectedButtons.twitter ? 'light' : 'outline'}
                h={'34px'}
                w={'121px'}
                radius={40}
                onClick={() => handleButtonClick('twitter')}
                leftSection={selectedButtons.twitter && <IconCircleCheckFilled />}>
                Twitter
              </Button> */}
            </Flex>
          </Flex>
          <Flex direction={'column'} gap={'md'} w={'50%'}>
            <Text className={styles.title}>Description</Text>
            <Textarea
              variant="filled"
              placeholder="Enter post content"
              name="post"
              value={data?.post.replace(/"/g, '')}
              onChange={onValueChange}
              autosize
              minRows={2}
              maxRows={4}
            />
            <Text className={styles.title}>Add hashtags</Text>
            <Textarea
              variant="filled"
              placeholder="Enter post content"
              name="hashtags"
              value={data?.hashtags}
              onChange={onValueChange}
              autosize
              minRows={2}
              maxRows={4}
            />
            <Flex gap={'md'} w={'100%'} justify={'flex-end'}>
              <Button className={styles.cancelButton} onClick={handleOnClose}>
                Cancel
              </Button>
              <Button
                variant="default"
                className={styles.postButton}
                onClick={handleOnSave}
                bg={'#007BFF'}
                loading={isLoading}>
                Post
              </Button>
            </Flex>
          </Flex>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
