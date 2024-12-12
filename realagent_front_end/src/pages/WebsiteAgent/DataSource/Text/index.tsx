import React, { useEffect, useState } from 'react';
import SimpleButton from '../../../../components/Button/SimpleButton';
import { Divider, Flex, Textarea, useMantineTheme } from '@mantine/core';
import styles from './texts.module.css';
import TrashButton from '../../../../components/Button/TrashButton';
import EditButton from '../../../../components/Button/EditButton';
import WithModal from '../../../../components/Modal/WithModal';
import ConsentModal from '../../../../components/Modal/ConsentModal';
import { paragraphAPI } from '../../../../store/features/DataSources/DataSourceAPI/textAPI';
import { ApiResponseStatus } from '../../../../services';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { fetchDatasource, getAllParagraphs } from '../../../../store/features/DataSources';
import { toast } from 'sonner';
import { useLoadingState } from '../../../../hooks';
import { cx } from '../../../../helper';

const TextDataSource: React.FC = () => {
  const theme = useMantineTheme();
  const [isLoading, startLoading, finishLoading] = useLoadingState();
  const [isEditingLoading, startEditingLoading, finishEditingLoading] = useLoadingState();
  const [content, setContent] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>('');
  const userId = useAppSelector((state) => state.authentication.userData.userId);

  const dispatch = useAppDispatch();
  const allParagraphs = useAppSelector((state) => state.dataSources.allParagraphs);

  useEffect(() => {
    dispatch(getAllParagraphs());
  }, [dispatch]);

  const onParagraphDelete = async (id: string) => {
    try {
      const result = await paragraphAPI.deleteParagraph(id);
      if (result?.status === ApiResponseStatus.SUCCESS) {
        dispatch(getAllParagraphs());
        dispatch(fetchDatasource(userId ?? ''));
        toast.success('Paragraph deleted successfully');
      } else {
        toast.error('Failed to delete paragraph');
      }
    } catch (error) {
      console.error('Error deleting paragraph:', error);
      toast.error('An error occurred while deleting the paragraph');
    }
  };

  const createParagraph = async () => {
    if (!content) {
      toast.warning('Please add content');
      return;
    }

    // Basic validation to ensure the content contains meaningful text
    const isMeaningfulText = /^[a-zA-Z0-9,.!?;:'"\-\s]+$/.test(content) && /\w{3,}/.test(content);
    if (!isMeaningfulText) {
      toast.warning('Please enter meaningful content with proper words or sentences.');
      return;
    }

    startLoading();
    try {
      const result = await paragraphAPI.createParagraph({ content });

      if (result?.status === ApiResponseStatus.SUCCESS) {
        dispatch(getAllParagraphs());
        dispatch(fetchDatasource(userId ?? ''));
        setContent('');
        toast.success('Paragraph created successfully');
      } else {
        toast.error('Failed to create paragraph');
      }
    } catch (error) {
      console.error('Error creating paragraph:', error);
      toast.error('An error occurred while creating the paragraph');
    } finally {
      finishLoading();
    }
  };
  const onParagraphEdit = (paragraphId: string, currentContent: string) => {
    setEditingId(paragraphId);
    setEditContent(currentContent);
  };

  const onSaveEdit = async (paragraphId: string) => {
    startEditingLoading();
    try {
      const result = await paragraphAPI.updateParagraph(paragraphId, {
        content: editContent,
      });
      if (result?.status === ApiResponseStatus.SUCCESS) {
        dispatch(getAllParagraphs());
        dispatch(fetchDatasource(userId ?? ''));
        setEditingId(null);
        toast.success('Paragraph updated successfully');
      } else {
        toast.error('Failed to update paragraph');
      }
    } catch (error) {
      console.error('Error updating paragraph:', error);
      toast.error('An error occurred while updating the paragraph');
    } finally {
      finishEditingLoading();
    }
  };

  return (
    <div>
      <Flex>
        <Flex w={'45%'} direction={'column'}>
          <Textarea
            variant="filled"
            placeholder="Add Text data to train your Assistant"
            classNames={{ input: styles.textareaInputLarge }}
            value={content}
            onChange={(e) => setContent(e.currentTarget.value)}
          />
          <div>
            <SimpleButton text="Upload" loading={isLoading} disabled={!content} mt={34} onClick={createParagraph} />
          </div>
        </Flex>
        <Flex px={'20px'} justify={'center'}>
          <Divider orientation="vertical" />
        </Flex>
        <Flex w={'65%'} direction={'column'} gap={'24px'}>
          {allParagraphs.map((paragraph) => (
            <Flex key={paragraph._id} w={'100%'} justify={'space-between'} align={'center'} gap={'8px'}>
              <Textarea
                w={'100%'}
                variant="filled"
                classNames={{
                  input: cx(styles.textareaInputSmall, {
                    [styles.inputDisplay]: editingId !== paragraph._id,
                  }),
                }}
                value={editingId === paragraph._id ? editContent : paragraph.content}
                onChange={(e) => setEditContent(e.currentTarget.value)}
                readOnly={editingId !== paragraph._id}
              />
              {editingId === paragraph._id ? (
                <SimpleButton
                  text="Save"
                  w={'80px'}
                  loading={isEditingLoading}
                  onClick={() => onSaveEdit(paragraph._id)}
                />
              ) : (
                <>
                  <EditButton
                    iconSize={16.17}
                    defaultColor={theme.colors.azureBlue[1]}
                    iconColor={theme.colors.azureBlue[6]}
                    onClick={() => onParagraphEdit(paragraph._id, paragraph.content)}
                  />
                  <WithModal
                    onAccept={() => onParagraphDelete(paragraph._id)}
                    ModalComponent={(e) => (
                      <ConsentModal
                        text={'Are you sure you want to delete this?'}
                        subText={'This action cannot be undone'}
                        {...e}
                      />
                    )}>
                    <TrashButton
                      iconSize={16.17}
                      defaultColor={theme.colors.azureBlue[1]}
                      iconColor={theme.colors.azureBlue[6]}
                    />
                  </WithModal>
                </>
              )}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </div>
  );
};

export default TextDataSource;
