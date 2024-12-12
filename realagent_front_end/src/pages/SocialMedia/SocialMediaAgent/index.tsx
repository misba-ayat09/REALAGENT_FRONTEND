/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Loader, Text } from '@mantine/core';
import GeneratePost from '../../../components/Input/GeneratePost';
// import classes from './socialmedia.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getAllSocialMediaContent } from '../../../store/features/socialMediaAgent/social-media-content/socialMediaContentSlice';
import { useDisclosure } from '@mantine/hooks';
import { socalMediaContentAPI } from '../../../store/features/socialMediaAgent/social-media-content';
import { EditPostModal, SocialMediaCard, SocialMediaPostData } from '../../../components';
import { PostModal } from '../../../components/Modal/PostModal';
import { ApiCallStatus } from '../../../services';
import { useScrollNearBottom } from '../../../hooks';

const SocialMediaAgent = () => {
  const dispatch = useAppDispatch();
  const [editData, setEditData] = useState<SocialMediaPostData>({
    id: '',
    image: '',
    post: '',
    hashtags: '',
    isApproved: false,
  });
  const [postData, setPostData] = useState<SocialMediaPostData>({
    id: '',
    image: '',
    post: '',
    hashtags: '',
    isApproved: false,
  });

  const socialmediaContent = useAppSelector((state) => state.socialMediaContent.result || []);
  const totalPages = useAppSelector((state) => state.socialMediaContent.totalPages);
  const currentPage = useAppSelector((state) => state.socialMediaContent.currentPage);
  const status = useAppSelector((state) => state.socialMediaContent.status);

  const hasMore = currentPage < totalPages;

  const fetchSocialMediaData = useCallback(
    (nextPage = 1) => {
      if (status === ApiCallStatus.Loading || !hasMore || nextPage <= currentPage) {
        return;
      }

      dispatch(getAllSocialMediaContent({ page: nextPage, limit: 10, sortOrder: 'desc', isApproved: false }));
    },
    [status, hasMore, currentPage],
  );

  useEffect(() => {
    if (socialmediaContent.length === 0) {
      fetchSocialMediaData();
    }
  }, [fetchSocialMediaData, socialmediaContent.length]);

  useScrollNearBottom(200, () => {
    fetchSocialMediaData(currentPage + 1);
  });

  const [isEditPostModalOpen, { open: openEditPostModal, close: closeEditPostModal }] = useDisclosure(false);
  const [isPostModalOpen, { open: openPostModal, close: closePostModal }] = useDisclosure(false);

  const onPressEdit = (id: string) => {
    socialmediaContent?.find((item) => {
      if (item._id === id) {
        setEditData({
          id: item._id,
          image: item.image,
          post: item.post.replace(/"/g, ''),
          hashtags: item.hashtags,
          isApproved: item.isApproved,
        });
      }
    });
    openEditPostModal();
  };

  const onPressClose = () => {
    closeEditPostModal();
    setEditData({
      id: '',
      image: '',
      post: '',
      hashtags: '',
      isApproved: true,
    });
  };

  const onPressPost = (id: string) => {
    socialmediaContent?.find((item) => {
      if (item._id === id) {
        setPostData({
          id: item._id,
          image: item.image,
          post: item.post,
          hashtags: item.hashtags,
          isApproved: item.isApproved,
        });
      }
    });
    openPostModal();
  };

  const onPressCloseModal = () => {
    closePostModal();
    setPostData({
      id: '',
      image: '',
      post: '',
      hashtags: '',
      isApproved: true,
    });
  };

  const onPressSave = async () => {
    closePostModal();
    closeEditPostModal();
    await socalMediaContentAPI.updateSocialMediaContent(editData);
    await dispatch(
      getAllSocialMediaContent({
        page: 1,
        limit: 20,
        sortOrder: 'desc',
        isApproved: false,
      }),
    );
    setEditData({
      id: '',
      image: '',
      post: '',
      hashtags: '',
      isApproved: true,
    });
  };

  return (
    <Flex direction="column" mih={'100vh'} w={'100%'} gap={'10px'}>
      <GeneratePost />
      <Flex>
        {status === ApiCallStatus.Loading && socialmediaContent?.length === 0 ? (
          <Flex justify="center" align="center" mih="calc(100vh - 220px)" bg={'#FFFFFF'} w="100%">
            <Loader type="bars" size="lg" />
          </Flex>
        ) : (
          <Flex direction="column" gap={'16px'} w={'100%'}>
            <EditPostModal
              opened={isEditPostModalOpen}
              data={editData}
              setData={setEditData}
              onClose={onPressClose}
              onSave={onPressSave}
            />
            <PostModal
              opened={isPostModalOpen}
              data={postData}
              setData={setPostData}
              onClose={onPressCloseModal}
              onSave={onPressSave}
            />

            {socialmediaContent?.length > 0 ? (
              socialmediaContent
                .slice()
                .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                .map((item) => (
                  <SocialMediaCard
                    key={item._id}
                    id={item._id}
                    image={item.image}
                    content={item?.post ? item.post.replace(/"/g, '') : item.prompt}
                    createdAt={item.updatedAt}
                    hashtags={item.hashtags}
                    onPressEdit={onPressEdit}
                    onPressPost={onPressPost}
                    showApproveButton={false}
                    showEditIcon={true}
                    showRefresh={!!item.prompt}
                    showDelete={true}
                    showDate={true}
                  />
                ))
            ) : (
              <Flex justify="center" align="center" mih="400px" bg={'#FFFFFF'} w="100%">
                <Text>No generated activities to show.</Text>
              </Flex>
            )}
            {status === ApiCallStatus.Loading && socialmediaContent?.length > 0 && (
              <Flex justify="center" align="center" mt="20px">
                <Loader type="bars" size="sm" />
              </Flex>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default SocialMediaAgent;
