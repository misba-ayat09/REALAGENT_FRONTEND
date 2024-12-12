import React, { useEffect, useState } from 'react';
import { EditPostModal, SocialMediaCard, SocialMediaPostData } from '../../../../components';
import classes from './SocialMediaSection.module.css';
import { getAllSocialMediaContent } from '../../../../store/features/socialMediaAgent/social-media-content/socialMediaContentSlice';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { useDisclosure } from '@mantine/hooks';
import { PostModal } from '../../../../components/Modal/PostModal';
import { socalMediaContentAPI } from '../../../../store/features/socialMediaAgent/social-media-content';
import { Flex, Text } from '@mantine/core';

const SocialMediaSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isPostModalOpen, { open: openPostModal, close: closePostModal }] = useDisclosure(false);
  const [postData, setPostData] = useState<SocialMediaPostData>({
    id: '',
    image: '',
    post: '',
    hashtags: '',
    isApproved: false,
  });
  const [editData, setEditData] = useState<SocialMediaPostData>({
    id: '',
    image: '',
    post: '',
    hashtags: '',
    isApproved: false,
  });

  const [isEditPostModalOpen, { open: openEditPostModal, close: closeEditPostModal }] = useDisclosure(false);
  useEffect(() => {
    dispatch(
      getAllSocialMediaContent({
        page: 1,
        limit: 40,
        sortOrder: 'desc',
        isApproved: false,
      }),
    );
  }, [dispatch]);

  const socialmediaContent = useAppSelector((state) => state.socialMediaContent.result || []);

  const onPressPost = (id: string) => {
    const post = socialmediaContent.find((item) => item._id === id);
    if (post) {
      setPostData({
        id: post._id,
        image: post.image,
        post: post.post ?? post.prompt,
        hashtags: post.hashtags,
        isApproved: post.isApproved,
      });
    }
    openPostModal();
  };
  const onPressEdit = (id: string) => {
    socialmediaContent?.find((item) => {
      if (item._id === id) {
        setEditData({
          id: item._id,
          image: item.image,
          post: item.post.replace(/"/g, '') ?? item.prompt,
          hashtags: item.hashtags,
          isApproved: item.isApproved,
        });
      }
    });
    openEditPostModal();
  };

  const onPressSave = async () => {
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
  return (
    <div className={classes.root}>
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
              hashtags={item.hashtags}
              showApproveButton={true}
              showEditIcon={true}
              onPressEdit={onPressEdit}
              showCheckboxes={true}
              showRefresh={!!item.prompt}
              showDelete={true}
              showImage={false}
              onPressPost={onPressPost}
              showDate={true}
              createdAt={item.updatedAt}
            />
          ))
      ) : (
        <Flex justify="center" align="center" bg={'#FFFFFF'} mih="calc(100vh - 220px)" w="100%">
          <Text>No activities to show.</Text>
        </Flex>
      )}
    </div>
  );
};

export default SocialMediaSection;
