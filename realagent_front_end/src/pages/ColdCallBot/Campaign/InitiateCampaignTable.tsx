import { Flex, Table, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getAllCampaignEvents } from '../../../store/features/CampaignEvent/campaignEventSlice.ts';
interface InitiateCampainProps {
  campaignId: string;
}

const InitiateCampaignTable = ({ campaignId }: InitiateCampainProps) => {
  const campaignData = useAppSelector((state) => state.campaignEvents.result.list || []);
  const campaign = campaignId;
  const [showOngoing, setShowOngoing] = useState(false);
  const [isContainerClicked, setIsContainerClicked] = useState(false);
  console.log(campaign, showOngoing, isContainerClicked, 'campaign');
  const dispatch = useAppDispatch();

  const handleContainerClick = (status: string) => {
    if (status === 'Ongoing') {
      setShowOngoing(true);
    } else {
      setIsContainerClicked(true);
    }
  };
  useEffect(() => {
    dispatch(
      getAllCampaignEvents({
        page: 1,
        limit: 20,
        sortOrder: 'desc',
        isApproved: false,
      }),
    );
  }, [dispatch]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      year: 'numeric',
      hour12: true,
    }).format(date);
  };

  return (
    <div>
      <Flex
        w={'100%'}
        h={'100%'}
        bg={'#FFFFFF'}
        p={'16px 12px'}
        gap={'20px'}
        direction={'column'}
        style={{ borderRadius: '15px' }}>
        <Flex>
          <Table style={{ tableLayout: 'fixed', width: '100%' }}>
            <thead
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '10px 20px',
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                marginBottom: '10px',
                marginTop: '10px',
              }}>
              <tr style={{ display: 'flex', width: '100%' }}>
                <td
                  style={{
                    flex: 1,
                    color: '#7A7A7A',
                    fontWeight: '600',
                    textAlign: 'left',
                  }}>
                  Scheduled_Launch
                </td>
                <td
                  style={{
                    flex: 1,
                    color: '#7A7A7A',
                    fontWeight: '600',
                    textAlign: 'left',
                  }}>
                  People
                </td>
                <td
                  style={{
                    flex: 0.6,
                    color: '#7A7A7A',
                    fontWeight: '600',
                    textAlign: 'left',
                  }}>
                  Status
                </td>
              </tr>
            </thead>
            <tbody style={{ display: 'flex', flexDirection: 'column' }}>
              {Array.isArray(campaignData) && campaignData?.length > 0 ? (
                campaignData?.map((item, index) => (
                  <tr
                    onClick={() => (item?._id ? handleContainerClick(item._id) : console.warn('Invalid item ID'))}
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9',
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      borderRadius: '10px',
                      marginBottom: '10px',
                      cursor: item?._id ? 'pointer' : 'not-allowed',
                    }}>
                    <td
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        textAlign: 'left',
                      }}>
                      <Text fw={500} c={'#292929'}>
                        {formatDate(item?.scheduledDate)}
                      </Text>
                    </td>
                    <td
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        textAlign: 'left',
                      }}>
                      <Text>
                        {Array.isArray(item?.group?.contacts) && item.group.contacts.length > 0
                          ? item.group.contacts
                              .map((contact) => `${contact?.firstName || ''} ${contact?.lastName || ''}`.trim())
                              .join(', ')
                          : ''}
                      </Text>
                    </td>
                    <td
                      style={{
                        flex: 0.6,
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        textAlign: 'left',
                      }}>
                      <Text>
                        <Text span w={700} color="black">
                          Ended:
                        </Text>{' '}
                        <Text span color="red">
                          accepted: {item?.status?.accepted || 0}
                        </Text>{' '}
                        <Text span color="red">
                          rejected: {item?.status?.rejected || 0}
                        </Text>
                      </Text>
                    </td>
                  </tr>
                ))
              ) : (
                <tr
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    width: '100%',
                    backgroundColor: '#FFFFFF',
                  }}>
                  <td>
                    <Text>No data available</Text>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Flex>
      </Flex>
    </div>
  );
};

export default InitiateCampaignTable;
