import { Button, Divider, Flex, Group, Modal, Popover, Table, Text } from '@mantine/core';
import React, { SetStateAction, useEffect, useState } from 'react';
import classes from './campaign.module.css';
import SimpleButton from '../../../components/Button/SimpleButton/index.tsx';
import AddCampaignModal from '../../../components/Modal/AddCampaignModal/index.tsx';
import { Icon } from '../../../components/common/Icons/Icon.tsx';
import { IconType } from '../../../components/common/Icons/index.ts';
import CampaignDetailsCard from '../../../components/PhoneContactCard/campaignDetailsCard.tsx';
import ScheduleAutomatedCallScreen from '../../PhoneAgent/ScheduleCall/index.tsx';
import { useAppDispatch, useAppSelector } from '../../../store/index.ts';
import { deleteCampaign, getallCampaign } from '../../../store/features/AddCampaign/campaignSlice.ts';
import { UpdateCampaignFormdata } from '../../../store/features/AddCampaign/campaignAPI.ts';
import { FlexBox } from '../../../components/common/FlexBox/FlexBox.tsx';
import EditCampaignModal from '../../../components/Modal/EditCampaignModal/index.tsx';

const CampaignScreen: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedCampaign, setSelectedCampaign] = useState<any | null>(null);
  const [showScheduleCallScreen, setShowScheduleCallScreen] = useState(false);
  const campaign = useAppSelector((state) => state.campaign.result) || [];
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [meetingToBeEdited, setMeetingToBeEdited] = useState<UpdateCampaignFormdata>();

  const dispatch = useAppDispatch();
  const handleMoreClick = (index: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents the event from bubbling and triggering navigation
    event.preventDefault(); // Stops default behavior if needed
    if (activeRow === index) {
      setOpened(!opened);
    } else {
      setActiveRow(index);
      setOpened(true);
    }
  };
  useEffect(() => {
    dispatch(getallCampaign());
  }, [dispatch]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRowClick = (item: any) => {
    setSelectedCampaign(item);
    if (item.status === 'Configuration Pending') {
      setShowScheduleCallScreen(true);
    }
  };

  const [openImportModal, setOpenImportModal] = useState(false);

  const handleOpenImportModal = () => {
    setOpenImportModal(true);
  };

  const handleCloseImportModal = () => {
    setOpenImportModal(false);
  };
  const openEditModal = (contact: SetStateAction<UpdateCampaignFormdata | undefined>, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents the event from bubbling and triggering navigation
    event.preventDefault(); // Stops default behavior if needed
    setIsEditModal(true);
    setMeetingToBeEdited(contact);
    setOpened(false);
  };

  const openDeleteModal = (id: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents the event from bubbling and triggering navigation
    event.preventDefault(); // Stops default behavior if needed
    setIsDeleteModal(true);
    setDeleteId(id);
    setOpened(false);
  };
  const handleCampaignEditedClose = () => {
    setIsEditModal(false);
    setMeetingToBeEdited(undefined);
  };

  const handleDelete = async (id: string, event: React.MouseEvent) => {
    await dispatch(deleteCampaign(id));
    event.stopPropagation(); // Prevents the event from bubbling and triggering navigation
    event.preventDefault(); // Stops default behavior if needed
    setIsDeleteModal(false);
    setDeleteId(null);
    dispatch(getallCampaign());
  };
  useEffect(() => {
    dispatch(getallCampaign());
  }, [dispatch]);
  return (
    <Flex direction={'column'} p={'0'}>
      {showScheduleCallScreen ? (
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
              onClick={() => setShowScheduleCallScreen(false)}
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
              <Text ff={'Roboto'} fw={400} fz={16} c={'#7A7A7A'}>
                Jan 2 2024
              </Text>
              <Text ff={'Roboto'} fw={600} fz={24} c={'#292929'}>
                Marketing Dallas
              </Text>
              <Text ff={'Roboto'} fw={400} fz={16} c={'#292929'}>
                To introduce a new product to the market and generate initial buzz and sales.
              </Text>
            </Flex>

            <Flex dir="row" justify="space-between">
              <Text ff={'Roboto'} fw={400} fz={16} c={'#292929'}>
                {''}
              </Text>
            </Flex>
          </Flex>
          <ScheduleAutomatedCallScreen campaignId={''} />
        </>
      ) : selectedCampaign ? (
        <CampaignDetailsCard campaignId={selectedCampaign._id} />
      ) : (
        <>
          <Flex
            w={'100%'}
            h={'100%'}
            bg={'#FFFFFF'}
            justify={'space-between'}
            align={'center'}
            p={'16px 12px'}
            gap={'20px'}
            style={{
              borderRadius: '15px',
            }}>
            <Flex w={'100%'} h={'100%'} justify={'space-between'} align={'center'} gap={'10px'}>
              <Flex direction={'column'} justify={'center'} align={'flex-start'} gap={'4px'}>
                <Text className={classes.title}>Add Campaign</Text>
                <Text className={classes.subTitle}>Engage with your desired audience</Text>
              </Flex>
              <AddCampaignModal open={openImportModal} onClose={handleCloseImportModal} id="" />
              <SimpleButton text={'Add Campaign'} onClick={handleOpenImportModal} />
            </Flex>
          </Flex>
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
                  <td style={{ flex: 1, color: '#7A7A7A', fontWeight: '600', textAlign: 'left' }}>Campaign</td>
                  <td style={{ flex: 1, color: '#7A7A7A', fontWeight: '600', textAlign: 'left' }}>Purpose</td>
                  <td style={{ flex: 0.6, color: '#7A7A7A', fontWeight: '600', textAlign: 'left' }}>Status</td>
                  <td style={{ flex: 0.4, color: '#7A7A7A', fontWeight: '600' }}>People</td>
                </tr>
              </thead>
              <tbody style={{ display: 'flex', flexDirection: 'column' }}>
                {Array.isArray(campaign) &&
                  campaign?.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(item)}
                      style={{
                        backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FFFFFF',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        borderRadius: '10px',
                        marginBottom: '10px',
                        cursor: 'pointer',
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
                          {item.campaignTitle}
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
                        <Text>{item.purpose}</Text>
                      </td>
                      <td
                        style={{
                          flex: 0.6,
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px',
                          textAlign: 'left',
                        }}>
                        <Button radius={'xl'} justify="center" variant="subtle"></Button>
                      </td>
                      <td
                        style={{
                          flex: 0.4,
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px',
                          textAlign: 'left',
                        }}></td>
                      <td style={{ flex: 0.1 }}>
                        <Popover
                          opened={opened && activeRow === index}
                          onClose={() => setOpened(false)}
                          width={140}
                          position="left">
                          <Popover.Target>
                            <div
                              onClick={(e) => handleMoreClick(index, e)}
                              style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '10px',
                              }}>
                              <Icon icon={IconType.more} />
                            </div>
                          </Popover.Target>
                          <Popover.Dropdown>
                            <div>
                              <Button
                                variant="subtle"
                                onClick={(e) => openEditModal(item, e)}
                                style={{ color: 'black', backgroundColor: 'white' }}
                                leftSection={<Icon icon={IconType.edit} />}>
                                Edit
                              </Button>
                              <Divider />
                              <Button
                                variant="subtle"
                                onClick={(e) => openDeleteModal(item._id, e)}
                                style={{ color: '#B24432', backgroundColor: 'white' }}
                                leftSection={<Icon icon={IconType.delete1} />}>
                                Delete
                              </Button>
                            </div>
                          </Popover.Dropdown>
                        </Popover>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <Modal.Root
                opened={isDeleteModal}
                onClose={() => setIsDeleteModal(false)}
                centered
                classNames={{
                  root: classes.modalRoot,
                }}>
                <Modal.Overlay
                  classNames={{
                    overlay: classes.modalOverlay,
                  }}
                />
                <Modal.Content
                  classNames={{
                    content: classes.modalContent,
                  }}>
                  <Modal.Header>
                    <Group style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-start' }}>
                      <Text className={classes.modalTitle}>Are you sure you want to delete this campaign?</Text>
                      <Text className={classes.modalTitle1}>This action cannot be undone</Text>
                    </Group>
                  </Modal.Header>
                  <Modal.Body
                    classNames={{
                      body: classes.modalBody,
                    }}>
                    <FlexBox
                      borderRadius={10}
                      width={'100%'}
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                      alignContent="center">
                      <FlexBox
                        container
                        alignContent="center"
                        width={'100%'}
                        justifyContent="flex-end"
                        style={{ gap: '10px' }}>
                        <Button
                          bg={'rgba(230, 242, 255, 1)'}
                          style={{ color: '#007BFF' }}
                          onClick={() => setIsDeleteModal(false)}
                          radius={40}
                          w={'111px'}
                          h={'40px'}>
                          Cancel
                        </Button>
                        <Button
                          bg={'#B24432'}
                          onClick={(e) => handleDelete(deleteId!, e)}
                          radius={40}
                          w={'111px'}
                          h={'40px'}>
                          Yes, Delete
                        </Button>
                      </FlexBox>
                    </FlexBox>
                  </Modal.Body>
                </Modal.Content>
              </Modal.Root>
              {isEditModal && meetingToBeEdited && (
                <EditCampaignModal
                  open={isEditModal}
                  onClose={handleCampaignEditedClose}
                  campaignDetailsToBeEdited={meetingToBeEdited}
                />
              )}
            </Table>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default CampaignScreen;
