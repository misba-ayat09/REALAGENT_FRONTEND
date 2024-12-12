import React, { useCallback, useEffect } from 'react';
import ActivitiesCard from '../../../components/Card/ActivitiesCard2';
import { useAppDispatch, useAppSelector } from '../../../store';
import { Flex, Loader, Text } from '@mantine/core';
import ActivityThunks from '../../../store/features/activities/thunks';
import { ApiCallStatus } from '../../../services';
import { useScrollNearBottom } from '../../../hooks';

const ActivityScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const activities = useAppSelector((state) => state.activity.activities.list);
  const totalPages = useAppSelector((state) => state.activity.activities.totalPages);
  const currentPage = useAppSelector((state) => state.activity.activities.currentPage);
  const status = useAppSelector((state) => state.activity.status);

  const hasMore = currentPage < totalPages;

  const fetchActivitiesData = useCallback(
    (nextPage = 1) => {
      if (status === ApiCallStatus.Loading || !hasMore || nextPage <= currentPage) {
        return;
      }

      dispatch(ActivityThunks.findActivities({ page: nextPage, limit: 10, sortOrder: 'desc' }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status, hasMore, currentPage],
  );

  useEffect(() => {
    if (activities.length === 0) {
      fetchActivitiesData();
    }
  }, [fetchActivitiesData, activities.length]);

  useScrollNearBottom(200, () => {
    fetchActivitiesData(currentPage + 1);
  });

  return (
    <Flex direction={'column'} gap={'16px'} className={'border-radius-full'}>
      {/* <Flex pt={'24px'}>
        <ScheduleMeetingCard
          title="Schedule Meeting"
          description="Schedule your meeting"
          fetchMeetings={fetchActivitiesData}
        />
      </Flex> */}
      {status === ApiCallStatus.Loading && activities?.length === 0 ? (
        <Flex justify="center" align="center" mih="calc(100vh - 220px)" bg={'#FFFFFF'} w="100%">
          <Loader type="bars" size="lg" />
        </Flex>
      ) : activities?.length ? (
        activities.map((activity) => <ActivitiesCard key={activity._id} activity={activity} />)
      ) : (
        <Flex justify="center" align="center" bg={'#FFFFFF'} mih="calc(100vh - 260px)" w="100%">
          <Text>No activities to show.</Text>
        </Flex>
      )}
      {status === ApiCallStatus.Loading && activities?.length > 0 && (
        <Flex justify="center" align="center" mt="20px">
          <Loader type="bars" size="sm" />
        </Flex>
      )}
    </Flex>
  );
};

export default ActivityScreen;
