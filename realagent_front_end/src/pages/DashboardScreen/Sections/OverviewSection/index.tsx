import React, { useEffect, useCallback } from 'react';
import classes from './OverviewSection.module.css';
import { ArticleCard, SocialMediaCard, ScheduledMeetingCard } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../store';
import {
  DashboardDataType,
  EmailMessagesDataType,
  MeetingScheduleDataType,
  PhoneCallsDataType,
  ResearchArticleDataType,
  SocialMediaContentDataType,
} from '../../../../store/features/dashboardAgent';
import { getallDashboardAgent } from '../../../../store/features/dashboardAgent/dashboardAgentSlice';
import { useScrollNearBottom } from '../../../../hooks';
import { Flex, Text, Loader } from '@mantine/core'; // Import Mantine Loader for loading indicator
import PhoneLogCard from '../../../../components/Card/CallTableCard/CallLogCard';
import InboxEmailCard from '../../../../components/InboxEmail';
import { ApiCallStatus } from '../../../../services';
import { getAllSocialMediaContent } from '../../../../store/features/socialMediaAgent/social-media-content/socialMediaContentSlice';

const OverviewSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const dashboardData = useAppSelector((state) => state.dashboardAgent.result || []);
  const totalPages = useAppSelector((state) => state.dashboardAgent.totalPages);
  const currentPage = useAppSelector((state) => state.dashboardAgent.currentPage);
  const status = useAppSelector((state) => state.dashboardAgent.status);

  const hasMore = currentPage < totalPages;

  const fetchDashboardData = useCallback(
    (nextPage = 1) => {
      if (status === ApiCallStatus.Loading || !hasMore || nextPage <= currentPage) {
        return;
      }

      dispatch(getallDashboardAgent({ page: nextPage, limit: 10, sortOrder: 'desc' }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status, hasMore, currentPage],
  );
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

  useEffect(() => {
    if (dashboardData.length === 0) {
      fetchDashboardData();
    }
  }, [fetchDashboardData, dashboardData.length]);

  useScrollNearBottom(200, () => {
    fetchDashboardData(currentPage + 1);
  });

  const renderDashboardItem = useCallback((item: DashboardDataType, index: number) => {
    switch (item.type) {
      case 'socialMediaContent': {
        const socialMediaContent = item.data as SocialMediaContentDataType;
        const isApproved = socialMediaContent.isApproved;
        return (
          <>
            {!isApproved ? (
              <SocialMediaCard
                key={item._id}
                id={socialMediaContent._id}
                content={
                  socialMediaContent?.post ? socialMediaContent.post.replace(/"/g, '') : socialMediaContent.prompt
                }
                hashtags={socialMediaContent.hashtags}
                image={socialMediaContent.image}
                createdAt={socialMediaContent.createdAt}
                showApproveButton={true}
                showEditIcon={true}
                showCheckboxes={true}
                showRefresh={!!socialMediaContent.prompt}
                showImage={false}
                showDelete={true}
                platforms={['twitter']}
                // onPressEdit={onPressEdit}
                showHeaderSocial={!socialMediaContent?.researchId ? true : false}
                showHeader2={socialMediaContent?.researchId ? true : false}
              />
            ) : (
              <SocialMediaCard
                key={item._id}
                id={socialMediaContent._id}
                content={
                  socialMediaContent?.post ? socialMediaContent.post.replace(/"/g, '') : socialMediaContent.prompt
                }
                hashtags={socialMediaContent.hashtags}
                image={socialMediaContent.image}
                createdAt={socialMediaContent.createdAt}
                showApproveButton={false}
                showEditIcon={false}
                showCheckboxes={true}
                showRefresh={false}
                platforms={socialMediaContent.platform}
                showImage={true}
                showHeader2={socialMediaContent?.researchId ? true : false}
                showResearchpostHeader={socialMediaContent?.researchId ? true : false}
                showHeaderSocialPost={!socialMediaContent?.researchId ? true : false}
                showHeader={!socialMediaContent?.researchId ? true : false}
                showDelete={false}
              />
            )}
          </>
        );
      }
      case 'researchArticle': {
        const researchArticle = item.data as ResearchArticleDataType;
        return (
          <ArticleCard
            showDivider={index !== 0}
            id={item._id}
            key={item?._id}
            image={researchArticle.image}
            title={researchArticle.title}
            content={researchArticle.content}
            bussinessInsights={researchArticle.bussinessInsights}
            keypoints={researchArticle.keypoints}
            createdAt={researchArticle.createdAt}
            showHeader={true}
            showCreatedAt={false}
          />
        );
      }
      case 'meetingSchedule': {
        const meetingSchedule = item.data as MeetingScheduleDataType;
        return <ScheduledMeetingCard key={item._id} showHeader={true} meeting={meetingSchedule} />;
      }
      case 'phoneCalls': {
        const phoneCallData = item.data as PhoneCallsDataType;
        if (!phoneCallData || !phoneCallData._id) {
          console.error('Invalid phone call data:', phoneCallData);
          return null;
        }

        return (
          <PhoneLogCard
            id={phoneCallData._id}
            phoneNumber={phoneCallData.phoneNumber}
            type={phoneCallData.type}
            createdAt={phoneCallData.createdAt}
            duration={phoneCallData.duration}
            recordingUrl={phoneCallData.recordingUrl}
            summary={phoneCallData.summary}
          />
        );
      }
      case 'emailMessages': {
        const emailMessages = item.data as EmailMessagesDataType;
        return (
          <InboxEmailCard
            key={emailMessages._id}
            subject={emailMessages.subject}
            preview={emailMessages.preview}
            createdAt={emailMessages.internalDate}
          />
        );
      }
      default:
        return null;
    }
  }, []);

  return (
    <div className={classes.root}>
      {status === ApiCallStatus.Loading && dashboardData.length === 0 ? (
        <Flex justify="center" align="center" mih="calc(100vh - 220px)" bg={'#FFFFFF'} w="100%">
          <Loader type="bars" size="lg" />
        </Flex>
      ) : (
        <>
          {dashboardData?.length > 0 ? (
            dashboardData.map(renderDashboardItem)
          ) : (
            <Flex justify="center" align="center" bg={'#FFFFFF'} mih="calc(100vh - 220px)" w="100%" gap={'16px'}>
              <Text style={{ textAlign: 'center' }}>No activities to show.</Text>
            </Flex>
          )}
          {status === ApiCallStatus.Loading && dashboardData.length > 0 && (
            <Flex justify="center" align="center" mt="20px">
              <Loader type="bars" size="sm" />
            </Flex>
          )}
        </>
      )}
    </div>
  );
};

export default OverviewSection;
