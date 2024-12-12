import { Flex, Button, Text } from '@mantine/core';
import React, { useState } from 'react';
import { Table } from 'tabler-icons-react';
import { IconType } from '../../../components/common/Icons';
import { Icon } from '../../../components/common/Icons/Icon';
import { useAppSelector } from '../../../store';

interface OngoingProps {
  campaignId: string;
}

const OngoingCampaign = ({ campaignId }: OngoingProps) => {
  const campaignDtl = useAppSelector((state) => state.campaign.result || []);
  const [isContainerClicked, setIsContainerClicked] = useState(false);

  const onBackClick = () => {
    setIsContainerClicked(false);
  };

  console.log(isContainerClicked, 'isContainerClicked');
  return (
    <div>
      {' '}
      <>
        <Flex
          w={'100%'}
          h={'100%'}
          bg={'#FFFFFF'}
          p={'16px 12px'}
          gap={'20px'}
          direction={'column'}
          style={{
            borderRadius: '15px',
          }}>
          <Button
            className="button"
            radius={'xl'}
            c={'#ffffff'}
            onClick={onBackClick}
            leftSection={
              <Icon
                icon={IconType.leftArrow}
                color="#292929"
                style={{
                  position: 'relative',
                  width: 'auto',
                  height: '12px',
                  top: '1px',
                  color: '#292929',
                }}
              />
            }
            style={{ width: '100px' }}>
            Back
          </Button>

          <Flex w={'100%'} h={'100%'} direction={'column'} gap={'5px'} style={{ borderRadius: '15px' }}>
            {Array.isArray(campaignDtl) &&
              campaignDtl
                .filter((camp) => camp._id === campaignId) // Filter the campaigns by ID
                .map((camp) => (
                  <React.Fragment key={camp._id}>
                    <Text ff={'Roboto'} fw={400} fz={16} c={'#7A7A7A'}>
                      {camp.createdAt}{' '}
                    </Text>
                    <Text ff={'Roboto'} fw={600} fz={24} c={'#292929'}>
                      {camp.campaignTitle}
                    </Text>
                    <Text ff={'Roboto'} fw={400} fz={16} c={'#292929'}>
                      {camp.purpose}
                    </Text>
                  </React.Fragment>
                ))}
          </Flex>

          <Flex dir="row" justify="space-between">
            <Text ff={'Roboto'} fw={400} fz={16} c={'#292929'}>
              {''}
            </Text>
            <Button ff={'Roboto'} fw={600} fz={16} c={'#FFFFFF'} bg={'#D63B2C'} radius={40}>
              End Campaign
            </Button>
          </Flex>
        </Flex>
      </>
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
              <td style={{ flex: 1, color: '#7A7A7A', fontWeight: '600', textAlign: 'left' }}>Contact</td>
              <td style={{ flex: 1, color: '#7A7A7A', fontWeight: '600', textAlign: 'left' }}>Type</td>
              <td style={{ flex: 0.6, color: '#7A7A7A', fontWeight: '600', textAlign: 'left' }}>Date</td>
              <td style={{ flex: 0.4, color: '#7A7A7A', fontWeight: '600' }}>Duration</td>
            </tr>
          </thead>
          <tbody style={{ display: 'flex', flexDirection: 'column' }}>
            <Flex
              direction={'row'}
              gap={'10px'}
              fw={500}
              bg={'#FFFFFF'}
              p={'10px 20px'}
              align={'center'}
              style={{ borderRadius: '10px' }}>
              Scheduled Launch : Tomorrow, 12:30AM{' '}
            </Flex>
          </tbody>
        </Table>
      </Flex>
    </div>
  );
};

export default OngoingCampaign;
