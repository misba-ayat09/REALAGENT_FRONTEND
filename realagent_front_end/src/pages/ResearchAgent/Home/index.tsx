import { Flex, Loader, Text } from '@mantine/core';
import React, { useCallback, useEffect } from 'react';
import { ArticleCard } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getResearchAgentArticles } from '../../../store/features/researchAgent';
import { ApiCallStatus } from '../../../services';
import { useScrollNearBottom } from '../../../hooks';

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.researchAgent.articles.list || []);
  const totalPages = useAppSelector((state) => state.researchAgent.articles.totalPages);
  const currentPage = useAppSelector((state) => state.researchAgent.articles.currentPage);
  const status = useAppSelector((state) => state.researchAgent.status);

  const hasMore = currentPage < totalPages;

  const fetchActivitiesData = useCallback(
    (nextPage = 1) => {
      if (status === ApiCallStatus.Loading || !hasMore || nextPage <= currentPage) {
        return;
      }

      dispatch(getResearchAgentArticles({ page: nextPage, limit: 10, sortOrder: 'desc' }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status, hasMore, currentPage],
  );

  useEffect(() => {
    if (articles.length === 0) {
      fetchActivitiesData();
    }
  }, [fetchActivitiesData, articles.length]);

  useScrollNearBottom(200, () => {
    fetchActivitiesData(currentPage + 1);
  });

  return (
    <Flex direction={'column'} px={'16px'}>
      {status === ApiCallStatus.Loading && articles?.length === 0 ? (
        <Flex justify="center" align="center" mih="calc(100vh - 220px)" bg={'#FFFFFF'} w="100%">
          <Loader type="bars" size="lg" />
        </Flex>
      ) : articles?.length > 0 ? (
        articles.map((item, index) => (
          <ArticleCard
            showDivider={index !== 0}
            id={item?._id}
            key={item?._id}
            image={item.image}
            title={item.title}
            content={item.content}
            bussinessInsights={item.bussinessInsights}
            keypoints={item.keypoints}
            createdAt={item.updatedAt}
            showCreatedAt={true}
          />
        ))
      ) : (
        <Flex justify="center" align="center" mih="400px" w="100%">
          <Text style={{ textAlign: 'center' }}>No activities to show.</Text>
        </Flex>
      )}
      {status === ApiCallStatus.Loading && articles?.length > 0 && (
        <Flex justify="center" align="center" mt="20px">
          <Loader type="bars" size="sm" />
        </Flex>
      )}
    </Flex>
  );
};
export default HomeScreen;
