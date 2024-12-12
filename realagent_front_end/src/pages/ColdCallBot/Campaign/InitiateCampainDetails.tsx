import { Flex, Button, Group, Divider, Text } from '@mantine/core';
import React, { useState } from 'react';
import { IconType } from '../../../components/common/Icons';
import { Icon } from '../../../components/common/Icons/Icon';
import ColdCallHomeScreen from '../ColdCallHome/coldCallHomeScreen';
import { useAppSelector } from '../../../store';
interface InitiateCampainDetailsProps {
  campaignId: string;
}

const InitiateCampainDetails = ({ campaignId }: InitiateCampainDetailsProps) => {
  const [isCampaignEnded, setIsCampaignEnded] = useState(false);
  const [isSetupClicked, setIsSetupClicked] = useState(false);
  const [isContainerClicked, setIsContainerClicked] = useState(false);
  const campaignDtl = useAppSelector((state) => state.campaign.result || []);
  console.log(setIsSetupClicked, 'isContainerClicked');
  console.log(isContainerClicked, 'isContainerClicked');

  const onBackClick = () => {
    setIsContainerClicked(false);
  };

  const handleEndCampaign = () => {
    setIsCampaignEnded(true);
  };
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
                }}
              />
            }
            style={{ width: '100px' }}>
            Back
          </Button>

          <Flex w={'100%'} h={'100%'} direction={'column'} gap={'5px'} style={{ borderRadius: '15px' }}>
            {Array.isArray(campaignDtl) &&
              campaignDtl
                .filter((camp) => camp._id === campaignId)
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
            {isCampaignEnded ? (
              <Text ff={'Roboto'} fw={600} fz={16} c={'#D63B2C'}>
                Campaign ended
              </Text>
            ) : isSetupClicked ? (
              <Button radius={'xl'} bg={'#D63B2C'} onClick={handleEndCampaign}>
                End
              </Button>
            ) : (
              <Group>
                <Text ff={'Roboto'} fw={500} fz={16} c={'#D90D0D'}>
                  Ended: 0 Rejected
                </Text>
                <Divider
                  orientation="vertical"
                  style={{
                    height: '18px',
                    width: '1px',
                    backgroundColor: '#292929',
                    margin: '0 10px',
                    borderRadius: '1px',
                  }}
                />
                <Text ff={'Roboto'} fw={500} fz={16} c={'#007934'}>
                  0 Accepted
                </Text>
              </Group>
            )}
          </Flex>
        </Flex>
        <ColdCallHomeScreen />
      </>
    </div>
  );
};

export default InitiateCampainDetails;
