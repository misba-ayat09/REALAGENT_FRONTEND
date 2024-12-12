import { Card, Flex, Loader, Text } from '@mantine/core';
import { SocialMediaActivityCard } from '../../../components/Card';
import classes from './index.module.css';
import Facebook from './facebook.svg';
import Instagram from './instagram.svg';
import Twitter from './twitter.svg';
import { SocialMedia } from '../../../common/enum';
import { useAppDispatch, useAppSelector } from '../../../store';
import SocialMediaThunk from '../../../store/features/socialMediaAgent/thunks';
import { useEffect } from 'react';
import { PostStatistics } from '../../../store/features/socialMediaAgent';
import { ApiCallStatus } from '../../../services';

const SocialMediaActivitiesScreen = () => {
  const dispatch = useAppDispatch();
  const activitiesdata = useAppSelector((state) => state.socialMediaAgent.activities);
  const status = useAppSelector((state) => state.socialMediaAgent.status);

  useEffect(() => {
    dispatch(SocialMediaThunk.getActivities());
  }, []);

  return (
    <Flex direction="column" mih={'100vh'} w={'100%'} gap={'10px'}>
      <Card p={'16px'} w={'100%'} bg={'#FFFFFF'} radius={'15px'}>
        <Text className={classes.title}>Social Media Activities</Text>
      </Card>
      <Flex>
        {status === ApiCallStatus.Loading && !activitiesdata?.length ? (
          <Flex justify="center" align="center" mih="calc(100vh - 220px)" bg={'#FFFFFF'} w="100%">
            <Loader type="bars" size="lg" />
          </Flex>
        ) : (
          <Flex direction="column" gap={'16px'} w={'100%'}>
            {activitiesdata?.length ? (
              activitiesdata?.map((activity) => {
                const postStatisticsData: Partial<Record<SocialMedia, PostStatistics>> = {
                  [SocialMedia.FACEBOOK]: {
                    likes: activity?.platformMetrics?.[SocialMedia.FACEBOOK]?.likeCount ?? 0,
                    comments: activity?.platformMetrics?.[SocialMedia.FACEBOOK]?.commentsCount ?? 0,
                  },
                  [SocialMedia.INSTAGRAM]: {
                    likes: activity?.platformMetrics?.[SocialMedia.INSTAGRAM]?.likeCount ?? 0,
                    comments: activity?.platformMetrics?.[SocialMedia.INSTAGRAM]?.commentsCount ?? 0,
                  },
                  [SocialMedia.TWITTER]: {
                    likes: activity?.platformMetrics?.[SocialMedia.TWITTER]?.likeCount ?? 0,
                    comments: activity?.platformMetrics?.[SocialMedia.TWITTER]?.commentsCount ?? 0,
                  },
                };
                return (
                  <SocialMediaActivityCard
                    key={activity.ayrSharePostId}
                    description={activity.post}
                    mediaURL={activity.mediaUrls?.[0]}
                    postDetails={postStatisticsData}
                    socialMediaIcons={{
                      [SocialMedia.FACEBOOK]: Facebook,
                      [SocialMedia.INSTAGRAM]: Instagram,
                      [SocialMedia.TWITTER]: Twitter,
                    }}
                    createdAt={activity.createdAt}
                  />
                );
              })
            ) : (
              <Flex justify="center" align="center" mih="400px" bg={'#FFFFFF'} w="100%">
                <Text>No activities to show.</Text>
              </Flex>
            )}
            {status === ApiCallStatus.Loading && activitiesdata?.length && (
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

export default SocialMediaActivitiesScreen;
