import { Text, Button, Flex, Group, useMantineTheme } from '@mantine/core';
import classes from './socialMediaCard.module.css';
import { useState } from 'react';
import { useLoadingState } from '../../../hooks';
import { useAppDispatch, useAppSelector } from '../../../store';
import {
  deleteSocialMediaContent,
  getAllSocialMediaContent,
  reGenerateSocialMediaContent,
} from '../../../store/features/socialMediaAgent/social-media-content/socialMediaContentSlice';
import { toast } from 'sonner';
import { IconPencil, IconPlayerPlayFilled, IconRefresh } from '@tabler/icons-react';
import { AgentType } from '../../../common/enum/agent.enum';
import { AgentIcon, AgentIconType } from '../../Icon/AgentIcon';
import TrashButton from '../../Button/TrashButton';
import ConsentModal from '../../Modal/ConsentModal';
import WithModal from '../../Modal/WithModal';
import { timeSince } from '../../../utils';
import { useDisclosure } from '@mantine/hooks';
import { EditPostModal, SocialMediaPostData } from '../../Modal';
import { PostModal } from '../../Modal/PostModal';
import { socalMediaContentAPI } from '../../../store/features/socialMediaAgent/social-media-content';
import { GcpImage } from '../../common/Image';
import { SocialMedia } from '../../../common/enum';
import { IconType } from '../../common/Icons';
import { Icon } from '../../common/Icons/Icon';

interface SocialMediaCardProps {
  id?: string;
  image?: string;
  content: string;
  hashtags?: string;
  createdAt?: string;
  showHeader?: boolean;
  showApproveButton?: boolean;
  showEditIcon?: boolean;
  showCheckboxes?: boolean;
  onPressEdit?: (id: string) => void;
  onPressPost?: (id: string) => void;
  showRefresh?: boolean;
  showImage?: boolean;
  showDelete?: boolean;
  showDate?: boolean;
  showHeader2?: boolean;
  showResearchpostHeader?: boolean;
  showHeaderSocial?: boolean;
  platforms?: string[];
  showHeaderSocialPost?: boolean;
}

const SocialMediaCard: React.FC<SocialMediaCardProps> = ({
  id,
  image,
  content,
  hashtags,
  createdAt,
  showHeader,
  showEditIcon,
  showApproveButton,
  // onPressEdit,
  showRefresh,
  showImage,
  showDelete,
  showDate,
  showHeader2,
  showResearchpostHeader,
  platforms = ['twitter'],
  showHeaderSocial,
  showHeaderSocialPost,
}) => {
  const [isLoading, startLoading, finishLoading] = useLoadingState();
  const [isPostModalOpen, { open: openPostModal, close: closePostModal }] = useDisclosure(false);
  const dispatch = useAppDispatch();

  const theme = useMantineTheme();

  const handleEdit = () => {
    if (id && onPressEdit) {
      onPressEdit(id);
    }
  };

  const socialmediaContent = useAppSelector((state) => state.socialMediaContent.result);

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
  const onPressEdit = (id: string) => {
    socialmediaContent?.find((item) => {
      if (item._id === id) {
        setEditData({
          id: item._id,
          image: item.image,
          post: item?.post ? item.post.replace(/"/g, '') : item.prompt,
          hashtags: item.hashtags,
          isApproved: item.isApproved,
        });
      }
    });
    openEditPostModal();
  };
  const onPressCloseModal = () => {
    closeEditPostModal();
    closePostModal();
  };

  const handlePost = (id: string) => {
    socialmediaContent?.find((item) => {
      if (item._id === id) {
        setPostData({
          id: item._id,
          image: item.image,
          post: item?.post ? item.post : item.prompt,
          hashtags: item.hashtags,
          isApproved: item.isApproved,
        });
      }
    });
    openPostModal();
  };
  const handleDelete = async () => {
    if (!id) {
      toast.error('Content ID is missing');
      return;
    }
    try {
      await dispatch(deleteSocialMediaContent({ id })).unwrap();
      toast.success('Social media content deleted successfully');
      dispatch(getAllSocialMediaContent({ page: 1, limit: 20, sortOrder: 'desc', isApproved: false }));
    } catch (error) {
      toast.error('Failed to delete social media content');
    }
  };

  const handleRefresh = async () => {
    if (!id) {
      toast.error('Failed to regenerate social media content, id is missing');
      return;
    }

    startLoading();

    try {
      await dispatch(reGenerateSocialMediaContent({ id, wordCount: 20 }));
      // dispatch(
      //   getAllSocialMediaContent({
      //     page: 1,
      //     limit: 20,
      //     sortOrder: 'desc',
      //     isApproved: false,
      //   }),
      // );
      toast.success('Social media content regenerated successfully');
      dispatch(
        getAllSocialMediaContent({
          page: 1,
          limit: 20,
          sortOrder: 'desc',
          isApproved: false,
        }),
      );
    } catch (error) {
      toast.error('Failed to regenerate social media content');
    } finally {
      finishLoading();
    }
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
    <>
      <Flex className={classes.Card} mih={showHeader || showResearchpostHeader ? '225px' : '212px'} direction="column">
        {showHeader2 ? (
          <>
            <Flex className={classes.headerSection} justify="space-between">
              <Group style={{ display: 'flex', flexDirection: 'row' }}>
                <AgentIcon icon={AgentType.Research} type={AgentIconType.Type4} size={24} />
                <Text fw={500}>Research Bot</Text>
                <IconPlayerPlayFilled color="#007BFF" size={24} />
                <AgentIcon icon={AgentType.SocialMedia} type={AgentIconType.Type4} size={24} />
                <Text fw={500} c={'#292929'}>
                  Social Media Bot
                </Text>
              </Group>
              <Text fw={600} fz={14} ff="Roboto" c="#B1B1B1" pr={10}>
                {createdAt && timeSince(new Date(createdAt))}
              </Text>
            </Flex>
          </>
        ) : null}
        {showResearchpostHeader ? (
          <Flex className={classes.headerSection} justify="space-between">
            <Group style={{ display: 'flex', flexDirection: 'row' }}>
              <Text fw={500} c={'#292929'}>
                Posted from Research Article
              </Text>
            </Group>
          </Flex>
        ) : null}

        {showHeader ? (
          <Flex className={classes.headerSection} justify="space-between">
            <Group style={{ display: 'flex', flexDirection: 'row' }}>
              <AgentIcon icon={AgentType.SocialMedia} type={AgentIconType.Type4} size={34} />
              <Text fw={500} c={'#292929'}>
                Social Media Bot
              </Text>
            </Group>
            <Text fw={600} fz={14} ff="Roboto" c="#B1B1B1" pr={10}>
              {createdAt && timeSince(new Date(createdAt))}
            </Text>
          </Flex>
        ) : null}
        {showHeaderSocial ? (
          <Flex className={classes.headerSection} justify="space-between">
            <Group style={{ display: 'flex', flexDirection: 'row' }}>
              <AgentIcon icon={AgentType.SocialMedia} type={AgentIconType.Type4} size={24} />
              <Text fw={500} c={'#292929'}>
                Social Media Bot
              </Text>
            </Group>
            <Text fw={600} fz={14} ff="Roboto" c="#B1B1B1" pr={10}>
              {createdAt && timeSince(new Date(createdAt))}
            </Text>
          </Flex>
        ) : null}
        {showHeaderSocialPost ? (
          <Flex className={classes.headerSection} justify="space-between">
            <Group style={{ display: 'flex', flexDirection: 'row' }}>
              <Text fw={500} c={'#292929'}>
                Posted this on social media{' '}
              </Text>
            </Group>
          </Flex>
        ) : null}

        <Flex h={'100%'} className={classes.mainContent} gap={20}>
          <GcpImage
            file={{
              fileName: image,
            }}
            alt={'Image'}
            height={'180px'}
            width={'240px'}
          />
          <Flex direction={'column'} h={'100%'} className={classes.contentSection}>
            <Flex w={'100%'} h={'100%'} justify={'space-between'}>
              <Flex direction={'column'} h={'100%'} style={{ flexGrow: 1, overflowY: 'auto' }}>
                {showDate && <Text className={classes.time}>{createdAt && timeSince(new Date(createdAt))}</Text>}
                <Text fz={{ lg: 14 }} pr={40} lineClamp={3} className={classes.contentText} c={'#292929'}>
                  {content}
                </Text>
                <Text fz={{ lg: 14 }} pr={40} lineClamp={3} className={classes.contentText} c={'#292929'} mt={10}>
                  {hashtags}
                </Text>
              </Flex>
            </Flex>

            <Flex justify={'space-between'} align={'center'}>
              <Flex style={{ gap: '10px' }}>
                {showApproveButton && (
                  <Button
                    variant="filled"
                    className={classes.button1}
                    onClick={() => handlePost(id!)}
                    loading={isLoading}>
                    Approve
                  </Button>
                )}
                {showRefresh && (
                  <Flex className={classes.icon}>
                    <IconRefresh size={20} className={classes.editBtn} onClick={handleRefresh} />
                  </Flex>
                )}
                {showEditIcon && (
                  <Flex className={classes.icon}>
                    <IconPencil size={20} className={classes.editBtn} onClick={handleEdit} />
                  </Flex>
                )}
                {showDelete && (
                  <WithModal
                    onAccept={() => handleDelete()}
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
                )}
              </Flex>

              <Flex gap="10px" align="center">
                {platforms?.length > 0 && showImage && (
                  <span style={{ color: '#B1B1B1', fontSize: '16px', fontWeight: 600 }}>Posted on:</span>
                )}

                {platforms?.map(
                  (platform, index) =>
                    showImage &&
                    platform && (
                      <Flex key={index}>
                        {platform === SocialMedia.FACEBOOK && (
                          <div
                            style={{
                              borderRadius: '50%',
                              background: '#E6F2FF',
                              width: '34px',
                              height: '34px',
                              alignContent: 'center',
                              justifyContent: 'center',
                              justifyItems: 'center',
                              display: 'flex',
                            }}>
                            <Icon
                              icon={IconType.facebook}
                              style={{ width: '15px', height: '15px', marginTop: '7px' }}
                            />
                          </div>
                        )}
                        {platform === SocialMedia.TWITTER && (
                          <div
                            style={{
                              borderRadius: '50%',
                              background: '#E6F2FF',
                              width: '34px',
                              height: '34px',
                              alignContent: 'center',
                              justifyContent: 'center',
                              display: 'flex',
                            }}>
                            <Icon icon={IconType.twitter} style={{ width: '15px', height: '15px', marginTop: '7px' }} />
                          </div>
                        )}
                        {platform === SocialMedia.INSTAGRAM && (
                          <div
                            style={{
                              borderRadius: '50%',
                              background: '#E6F2FF',
                              width: '34px',
                              height: '34px',
                              alignContent: 'center',
                              justifyContent: 'center',
                              display: 'flex',
                            }}>
                            <Icon
                              icon={IconType.instagram}
                              style={{ width: '15px', height: '15px', marginTop: '7px' }}
                            />
                          </div>
                        )}
                      </Flex>
                    ),
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <PostModal
        opened={isPostModalOpen}
        data={postData}
        setData={setPostData}
        onClose={onPressCloseModal}
        onSave={onPressSave}
      />
      <EditPostModal
        opened={isEditPostModalOpen}
        data={editData}
        setData={setEditData}
        onClose={onPressCloseModal}
        onSave={onPressSave}
      />
    </>
  );
};

export default SocialMediaCard;
