import React, { useEffect } from 'react';
import classes from './ResearchSection.module.css';
import { ArticleCard } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { getResearchAgentTopics } from '../../../../store/features/researchAgent';
import { LoadingSkeletonCard } from '../../../../components/LoadingSkeleton';
import { ApiCallStatus } from '../../../../services';
import { Flex, Text } from '@mantine/core';

const ResearchSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const researchAgentStatus = useAppSelector((state) => state.researchAgent.status);
  const articles = useAppSelector((state) => state.researchAgent.articles.list || []);

  useEffect(() => {
    dispatch(getResearchAgentTopics());
  }, []);

  return (
    <div className={classes.root}>
      {researchAgentStatus === ApiCallStatus.Loading ? (
        Array.from({ length: 4 }).map((_, index) => <LoadingSkeletonCard key={index} />)
      ) : articles?.length > 0 ? (
        articles.map((item, index) => (
          <ArticleCard
            showDivider={index !== 0}
            id={item?._id}
            key={item?._id}
            image={item.image}
            bussinessInsights={item.bussinessInsights}
            title={item.title}
            content={item.content}
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
    </div>
  );
};

export default ResearchSection;
