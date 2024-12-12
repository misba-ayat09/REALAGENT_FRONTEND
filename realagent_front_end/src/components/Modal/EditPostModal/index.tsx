import React, { useCallback, useState } from 'react';
import { Modal, Text, Button, Flex, Textarea, Group } from '@mantine/core';
import styles from './EditPostModal.module.css';
import { fileHubAPI } from '../../../store/features/fileHub/fileHubAPI';
import { FileCategory } from '../../../common/enum';
import { GcpImage } from '../../common/Image';

export interface SocialMediaPostData {
  id: string;
  image: string;
  post: string;
  hashtags: string;
  isApproved: boolean;
}

interface EditPostModalProps {
  opened: boolean;
  data: SocialMediaPostData;
  setData: React.Dispatch<React.SetStateAction<SocialMediaPostData>>;
  onClose: () => void;
  onSave: () => void;
}

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

export const EditPostModal: React.FC<EditPostModalProps> = ({
  opened,
  data,
  setData,
  onClose,
  onSave,
}: EditPostModalProps) => {
  const [imgUrl, setImgUrl] = useState<string>();

  const onValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnSave = () => {
    setImgUrl(undefined);
    onSave();
  };

  const handleOnClose = () => {
    setImgUrl(undefined);
    onClose();
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
          <Group style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <Text className={styles.modalTitle}>Edit Post</Text>
            <Text className={styles.modalTitle1}>Edit this post</Text>
          </Group>
        </Modal.Header>
        <Modal.Body>
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
          <Flex direction={'column'} gap={'md'} w={'50%'}>
            <Text className={styles.title}>Description</Text>
            <Textarea
              variant="filled"
              placeholder="Enter post content"
              name="post"
              value={data?.post}
              onChange={onValueChange}
              className={styles.descriptionInput}
              autosize
              minRows={2}
              maxRows={4}
            />
            <Text className={styles.title}>Add hashtags</Text>
            <Textarea
              variant="filled"
              placeholder="Enter hashtags"
              name="hashtags"
              value={data?.hashtags}
              onChange={onValueChange}
              className={styles.descriptionInput}
              autosize
              minRows={2}
              maxRows={4}
            />
            <Flex mt="xl" gap={'md'} w={'100%'} justify={'flex-end'} className={styles.buttonWrapper}>
              <Button className={styles.cancelButton} onClick={handleOnClose}>
                Cancel
              </Button>
              <Button variant="default" className={styles.saveButton} onClick={handleOnSave}>
                Save
              </Button>
            </Flex>
          </Flex>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
