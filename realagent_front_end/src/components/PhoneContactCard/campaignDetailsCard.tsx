import React, { useEffect, useState } from 'react';
import { Button, Flex, Group, Text } from '@mantine/core';
import { Icon } from '../common/Icons/Icon';
import { IconType } from '../common/Icons';
import ScheduleAutomatedCallScreen from '../../pages/PhoneAgent/ScheduleCall';
import InitiateCampaignModal from '../Modal/InitiateCampaignModal';
import { useAppDispatch, useAppSelector } from '../../store';
import { getAllCampaignEvents } from '../../store/features/CampaignEvent/campaignEventSlice.ts';
import { useNavigate } from 'react-router-dom';
import InitiateCampainDetails from '../../pages/ColdCallBot/Campaign/InitiateCampainDetails.tsx';
import InitiateCampaignTable from '../../pages/ColdCallBot/Campaign/InitiateCampaignTable.tsx';
import OngoingCampaign from '../../pages/ColdCallBot/Campaign/onGoingCampaign.tsx';

interface CampaignDetailsCardProps {
  campaignId: string;
}
const CampaignDetailsCard: React.FC<CampaignDetailsCardProps> = ({ campaignId }) => {
  const [isCampaignEnded, setIsCampaignEnded] = useState(false);
  const [isSetupClicked, setIsSetupClicked] = useState(false);
  const [isContainerClicked, setIsContainerClicked] = useState(false);
  const [showOngoing, setShowOngoing] = useState(false);
  const campaignData = useAppSelector((state) => state.campaignEvents.result.list || []);
  const campaign = campaignId;
  const campaignDtl = useAppSelector((state) => state.campaign.result || []);

  console.log(setIsContainerClicked, 'setIsContainerClicked');
  console.log(setShowOngoing, 'showOngoing');

  useEffect(() => {
    console.log('==================================== campaignData');
    console.log('campaignData: ', campaignData);
    console.log('==================================== campaignData');
  }, [campaignData]);

  const dispatch = useAppDispatch();
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
  const navigation = useNavigate();
  const onBack = () => {
    navigation(-1);
  };

  const handleEndCampaign = () => {
    setIsCampaignEnded(true);
  };

  const handleSetup = () => {
    setIsSetupClicked(true);
  };

  const [openImportModal, setOpenImportModal] = useState(false);
  const handleOpenImportModal = () => {
    setOpenImportModal(true);
  };

  const handleCloseImportModal = () => {
    setOpenImportModal(false);
  };
  return (
    <Flex direction={'column'} gap={'10px'} pt={'0px'}>
      {!isContainerClicked && !showOngoing && (
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
            onClick={onBack}
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
                <Button radius={'xl'} bg={'#F3F6F8'} c={'#292929'} onClick={handleSetup}>
                  Configure Script
                </Button>
                <InitiateCampaignModal open={openImportModal} onClose={handleCloseImportModal} campaignid={campaign} />
                <Button radius={'xl'} bg={'#007BFF'} onClick={handleOpenImportModal}>
                  Initiate Campaign
                </Button>
              </Group>
            )}
          </Flex>
        </Flex>
      )}
      {isSetupClicked && !isCampaignEnded ? (
        <ScheduleAutomatedCallScreen campaignId={campaign} />
      ) : showOngoing ? (
        <>
          <OngoingCampaign campaignId={campaign} />
        </>
      ) : isContainerClicked ? (
        <>
          <InitiateCampainDetails campaignId={campaign} />
        </>
      ) : (
        <>
          <InitiateCampaignTable campaignId={campaign} />
        </>
      )}
    </Flex>
  );
};

export default CampaignDetailsCard;
