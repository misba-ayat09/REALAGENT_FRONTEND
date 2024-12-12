import React, { useEffect, useState } from 'react';
import { Divider, Flex, Text, TextInput, useMantineTheme } from '@mantine/core';
import styles from './websites.module.css';
import SimpleButton from '../../../../components/Button/SimpleButton';
import TrashButton from '../../../../components/Button/TrashButton';
import EditButton from '../../../../components/Button/EditButton';
import WithModal from '../../../../components/Modal/WithModal';
import ConsentModal from '../../../../components/Modal/ConsentModal';
import { useLoadingState } from '../../../../hooks';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { websiteAPI } from '../../../../store/features/DataSources/DataSourceAPI/websiteAPI';
import { fetchDatasource, getAllWebsiteUrls } from '../../../../store/features/DataSources';
import { ApiResponseStatus } from '../../../../services';
import { toast } from 'sonner';
import { isValidBasicUrl } from '../../../../utils';
import { cx } from '../../../../helper';

const WebsiteDataSource: React.FC = () => {
  const theme = useMantineTheme();

  const [url, setUrl] = useState<string>('');
  const [editUrl, setEditUrl] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, startLoading, finishLoading] = useLoadingState();
  const [isEditingLoading, startEditingLoading, finishEditingLoading] = useLoadingState();
  const dispatch = useAppDispatch();
  const allWebsites = useAppSelector((state) => state.dataSources.allWebsiteUrls);
  const userId = useAppSelector((state) => state.authentication.userData.userId);
  useEffect(() => {
    dispatch(getAllWebsiteUrls());
  }, [dispatch]);

  const createWebsite = async () => {
    if (!url || !isValidBasicUrl(url)) {
      toast.warning('Please provide a valid URL');
      return;
    }
    startLoading();
    try {
      const result = await websiteAPI.createWebsiteUrl({ url });
      if (result?.status === ApiResponseStatus.SUCCESS) {
        dispatch(getAllWebsiteUrls());
        dispatch(fetchDatasource(userId ?? ''));
        setUrl('');
        toast.success('Website added successfully');
      } else {
        toast.error('Failed to add website');
      }
    } catch (error) {
      console.error('Error creating website:', error);
      toast.error('An error occurred while adding the website');
    } finally {
      finishLoading();
    }
  };

  const onWebsiteEdit = (id: string, url: string) => {
    setEditingId(id);
    setEditUrl(url);
  };

  const onSaveEdit = async (id: string) => {
    if (!editUrl) {
      toast.warning('Please provide a URL');
      return;
    }
    startEditingLoading();
    try {
      const result = await websiteAPI.updateWebsiteUrl(id, { url: editUrl });
      if (result?.status === ApiResponseStatus.SUCCESS) {
        dispatch(getAllWebsiteUrls());
        dispatch(fetchDatasource(userId ?? ''));
        setEditingId(null);
        toast.success('Website updated successfully');
      } else {
        toast.error('Failed to update website');
      }
    } catch (error) {
      console.error('Error updating website:', error);
      toast.error('An error occurred while updating the website');
    } finally {
      finishEditingLoading();
    }
  };

  const onDelete = async (id: string) => {
    startLoading();
    try {
      const result = await websiteAPI.deleteWebsiteUrl(id);
      if (result?.status === ApiResponseStatus.SUCCESS) {
        dispatch(getAllWebsiteUrls());
        dispatch(fetchDatasource(userId ?? ''));
        toast.success('Website deleted successfully');
      } else {
        toast.error('Failed to delete website');
      }
    } catch (error) {
      console.error('Error deleting website:', error);
      toast.error('An error occurred while deleting the website');
    }
    finishLoading();
  };

  return (
    <div>
      <Flex>
        <Flex w={'45%'} direction={'column'} gap={'24px'}>
          <TextInput
            variant="filled"
            label="Crawl"
            classNames={{ input: styles.textInputSmall }}
            placeholder="http://www.example.com"
            value={url}
            onChange={(e) => setUrl(e.currentTarget.value)}
          />
          <Text className={styles.text}>
            This will crawl all the links starting with the URL (not including files on the website).
          </Text>
          <div>
            <SimpleButton text="Add Website" disabled={!url} mt={24} onClick={createWebsite} loading={isLoading} />
          </div>
        </Flex>
        <Flex px={'20px'} justify={'center'}>
          <Divider orientation="vertical" />
        </Flex>
        <Flex w={'65%'} direction={'column'} gap={'24px'}>
          {allWebsites.map((website) => (
            <Flex
              key={website._id}
              w={'100%'}
              justify={'space-between'}
              align={'center'}
              gap={'16px'}
              direction={'column'}
              maw={'482px'}>
              <Flex w={'100%'} justify={'space-between'} align={'center'} gap={'8px'}>
                <TextInput
                  w={'100%'}
                  variant="filled"
                  classNames={{
                    input: cx(styles.textInputSmall, {
                      [styles.inputDisplay]: editingId !== website._id,
                    }),
                  }}
                  value={editingId === website._id ? editUrl : website.url}
                  onChange={(e) => setEditUrl(e.currentTarget.value)}
                  readOnly={editingId !== website._id}
                />
                {editingId === website._id ? (
                  <SimpleButton
                    text="Save"
                    w={'80px'}
                    onClick={() => onSaveEdit(website._id)}
                    loading={isEditingLoading}
                  />
                ) : (
                  <>
                    <EditButton
                      iconSize={16.17}
                      defaultColor={theme.colors.azureBlue[1]}
                      iconColor={theme.colors.azureBlue[6]}
                      onClick={() => onWebsiteEdit(website._id, website.url)}
                    />
                    <WithModal
                      onAccept={() => onDelete(website._id)}
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
            </Flex>
          ))}
        </Flex>
      </Flex>
    </div>
  );
};

export default WebsiteDataSource;
