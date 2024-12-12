import React, { useCallback, useState } from 'react';
import { Card, Text, Group, List, Stack, Flex, useMantineTheme, Modal, Button } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { deleteResearchAgentArticle } from '../../../store/features/researchAgent';
import { Config } from '../../../config';
import classes from './ArticleCard.module.css';
import { AudioPlayButton, CopyToClipboardButton } from '../../Button';
import TrashButton from '../../Button/TrashButton';
import { FlexBox } from '../../common/FlexBox/FlexBox';
import { useMediaQuery } from '@mantine/hooks';
import { getallDashboardAgent } from '../../../store/features/dashboardAgent/dashboardAgentSlice';
import { getDayLabel, timeSince } from '../../../utils';
import { AgentIcon, AgentIconType } from '../../Icon/AgentIcon';
import { AgentType } from '../../../common/enum/agent.enum';
import { IconType } from '../../common/Icons';
import { Icon } from '../../common/Icons/Icon';
import { socalMediaContentAPI } from '../../../store/features/socialMediaAgent/social-media-content';
import { toast } from 'sonner';
import { GcpImage } from '../../common/Image';

interface ArticleCardProps {
  id: string;
  image?: string;
  title: string;
  content: string;
  keypoints?: string[];
  createdAt?: string;
  showHeader?: boolean;
  bussinessInsights?: string;
  showDivider?: boolean;
  showCreatedAt?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  image,
  title,
  content,
  keypoints,
  createdAt,
  showHeader,
  showCreatedAt,
  bussinessInsights,
}) => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1200px)');
  const totalPages = useAppSelector((state) => state.dashboardAgent.totalPages);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchDashboardData = useCallback(
    (page = 1) => {
      if (page > totalPages) {
        return;
      }
      dispatch(getallDashboardAgent({ page, limit: 20, sortOrder: 'desc' }));
    },
    [dispatch, totalPages],
  );

  const toggleExpanded = () => setExpanded(!expanded);

  const onPressPost = async (articleId: string) => {
    const toastId = toast.loading('Generating post from article...');

    try {
      const response = await socalMediaContentAPI.AddConvertArticleToPost({ researchId: articleId });

      if (response && response?.result.post) {
        toast.success('Post generated and added to Social Media Bot', {
          id: toastId,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message || 'Error generating post from article', {
        id: toastId,
      });
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    // Ensure id is valid
    if (!id) {
      console.error('Article id is missing or invalid.');
      return;
    }
    setIsDeleting(true); // Set delete in progress
    try {
      await dispatch(deleteResearchAgentArticle(id));
      fetchDashboardData(1);
      dispatch(getallDashboardAgent({ page: 1, limit: 20, sortOrder: 'desc' }));
    } catch (error) {
      console.error('Failed to delete the article:', error);
    } finally {
      setIsDeleting(false); // Reset deletion state
      setIsDeleteModal(false); // Close the modal
    }
  };

  const handlePost = () => {
    onPressPost(id);
  };

  const fetchAudioFile = async (): Promise<string | null> => {
    try {
      const response = await fetch(Config.TEXT_TO_SPEECH_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: title + ' ' + content }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error fetching the audio file:', error);
      return null;
    }
  };

  return (
    <Flex className={classes.Card} direction="column" gap={'2px'}>
      <Modal bg="rgba(240, 245, 248, 1)" opened={isDeleteModal} onClose={() => setIsDeleteModal(false)}>
        <FlexBox
          borderRadius={10}
          padding={10}
          margin={0}
          height={isDesktop ? 177 : 'auto'}
          width={'100%'}
          style={{ flexDirection: 'column', alignItems: 'center' }}
          alignContent="center"
          justifyContent="space-between"
          container>
          <Text className={classes.header} c={'#292929'}>
            Are you sure you want to delete this Article?
          </Text>
          <FlexBox container alignContent="center" width={'100%'} justifyContent="center" style={{ gap: '40px' }}>
            <Button
              bg={theme.colors.azureBlue[2]}
              onClick={() => setIsDeleteModal(false)}
              styles={(theme) => ({
                root: {
                  color: theme.colors.azureBlue[7],
                },
              })}>
              Cancel
            </Button>
            <Button bg={theme.colors.azureBlue[7]} onClick={(e) => handleDelete(e, id)} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </FlexBox>
        </FlexBox>
      </Modal>
      <Card className={classes.card}>
        {showHeader && (
          <Flex justify="space-between" gap={'8px'} style={{ marginBottom: '10px' }}>
            <Group style={{ display: 'flex', flexDirection: 'row' }}>
              <AgentIcon icon={AgentType.Research} type={AgentIconType.Type4} size={34} />
              <Text className={classes.header}>Research Bot Created this Article</Text>
            </Group>
            <Text fw={600} fz={14} ff="Roboto" c="#B1B1B1" pr={10}>
              {createdAt && timeSince(new Date(createdAt))}
            </Text>
          </Flex>
        )}
        <Flex justify={'flex-start'} align={'flex-start'} gap={20}>
          <GcpImage
            file={{
              fileName: image,
            }}
            alt={'Image'}
            height={'180px'}
            width={'240px'}
          />
          <Flex gap="xs" direction={'column'}>
            {showCreatedAt && (
              <Text fw={600} fz={14} ff="Roboto" c="#B1B1B1" pr={10}>
                {getDayLabel(createdAt)}
              </Text>
            )}
            <Text className={classes.title} c={'#292929'} lineClamp={2}>
              {title}
            </Text>
            <Group gap={10} mr={0}>
              <AudioPlayButton
                iconSize={16.17}
                defaultColor={theme.colors.azureBlue[7]}
                playingColor={theme.colors.azureBlue[7]}
                fetchAudio={fetchAudioFile}
              />
              {title ? (
                <CopyToClipboardButton
                  iconSize={16.17}
                  defaultColor={theme.colors.azureBlue[1]}
                  iconColor={theme.colors.azureBlue[7]}
                  copiedColor={theme.colors.azureBlue[2]}
                  value={title}
                />
              ) : null}
              <TrashButton
                iconSize={16.17}
                defaultColor={theme.colors.azureBlue[1]}
                iconColor={theme.colors.azureBlue[7]}
                onClick={() => setIsDeleteModal(true)}
              />
              <Button
                onClick={handlePost}
                leftSection={<Icon isAction={false} icon={IconType.Share} style={{ width: 18, height: 20 }} />}
                className={classes.button}>
                Convert to social media post
              </Button>
            </Group>
          </Flex>
        </Flex>

        <Stack gap="xs" pt={'xs'}>
          <Text className={classes.subTitle} c={'#292929'}>
            Description
          </Text>
          <Text className={classes.content} c={'#595959'} lineClamp={5}>
            {content}
          </Text>
          {bussinessInsights && bussinessInsights?.trim()?.toLowerCase() !== 'nil' ? (
            <>
              <Text className={classes.subTitle}>Business Insights</Text>
              <Text className={classes.content} lineClamp={5}>
                {bussinessInsights}
              </Text>
            </>
          ) : (
            <></>
          )}

          {keypoints && keypoints?.length > 0 && (
            <>
              <Group onClick={toggleExpanded} style={{ cursor: 'pointer' }} gap="xs">
                <Text className={classes.subTitle}>Key Points</Text>
                <IconChevronDown
                  size={16}
                  style={{
                    transform: expanded ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </Group>

              {expanded && (
                <List size="sm">
                  {keypoints.map((point, index) => (
                    <List.Item key={index} className={classes.content}>
                      {point}
                    </List.Item>
                  ))}
                </List>
              )}
            </>
          )}
        </Stack>
      </Card>
    </Flex>
  );
};

export default ArticleCard;
