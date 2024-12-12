import { useEffect, useRef, useState } from 'react';
import { Accordion, Text, Modal, Button, Popover, Table, Group, Flex } from '@mantine/core';
import { IconType } from '../../common/Icons';
import { Icon } from '../../common/Icons/Icon';
import ChatContainer from '../../ChatContainer';
import { useAppDispatch, useAppSelector } from '../../../store';
import AddContactModal from '../../Modal/AddContactModal';
import { FlexBox } from '../../common/FlexBox/FlexBox';
import { deleteContact, getallContact } from '../../../store/features/AddContact/contactSlice';
import { getAllCalls } from '../../../store/features/ReceptionistAgent';
import classes from './callLogCard.module.css';

export default function CallLogTable() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [contactId, setContactId] = useState<string | null>(null);
  const [remainingTimes, setRemainingTimes] = useState<{ [key: string]: number }>({});
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const handleMoreClick = (index: number) => {
    setActiveRow(index);
    setOpen(true);
  };

  const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleDateString(undefined);
  };
  // const formatDuration = (durationInSeconds: number) => {
  //   const hours = Math.floor(durationInSeconds / 3600);
  //   const minutes = Math.floor((durationInSeconds % 3600) / 60);
  //   const seconds = durationInSeconds % 60;
  //   const formattedHours = String(hours).padStart(2, '0');
  //   const formattedMinutes = String(minutes).padStart(2, '0');
  //   const formattedSeconds = String(seconds).padStart(2, '0');

  //   return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  // };

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const handleAudioClick = (audio: string, duration: number) => {
    setSelectedAudio(audio === selectedAudio ? null : audio);
    if (audio !== selectedAudio) {
      setRemainingTimes((prevTimes) => ({
        ...prevTimes,
        [audio]: duration,
      }));
    }
  };
  useEffect(() => {
    if (audioRef.current && selectedAudio && isPlaying) {
      const updateRemainingTime = () => {
        setRemainingTimes((prevTimes) => {
          const timeLeft = prevTimes[selectedAudio] - 1;
          return {
            ...prevTimes,
            [selectedAudio]: timeLeft > 0 ? timeLeft : 0,
          };
        });
      };
      const intervalId = setInterval(updateRemainingTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [selectedAudio, isPlaying]);
  useEffect(() => {
    if (!isPlaying) {
      setRemainingTimes((prevTimes) => {
        const timeLeft = prevTimes[selectedAudio!] || 0;
        return {
          ...prevTimes,
          [selectedAudio!]: timeLeft,
        };
      });
    }
  }, [isPlaying]);
  const openModal = (id: string) => {
    setContactModalOpen(true);
    setOpen(false);
    setContactId(id);
  };

  const closeModal = () => {
    setContactModalOpen(false);
    setOpen(false);
  };

  const handleViewConversationClick = (callId: string) => {
    setSelectedCallId(callId);
    setShowChat(true);
  };
  const handleBackClick = () => {
    setShowChat(false);
    setSelectedCallId(null);
  };
  useEffect(() => {
    dispatch(getAllCalls());
  }, [dispatch]);
  const calls = useAppSelector((state) => state.phoneAgent.calls?.items || []);
  const openDeleteModal = (id: string) => {
    setIsDeleteModal(true);
    setDeleteId(id);
    setOpen(false);
  };
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteContact(id));
    setIsDeleteModal(false);
    setDeleteId(null);
    dispatch(getallContact());
  };

  const items = calls.map((item, index) => (
    <Flex
      direction={'column'}
      px={'16px'}
      py={'16px'}
      bg={'#FFFFFF'}
      className={'border-radius-full'}
      style={{ marginBottom: '20px', justifyContent: 'space-evenly' }}>
      <Accordion variant="filled" bg={'#FFFFFF'} classNames={{ chevron: classes.chevron }}>
        <Accordion.Item
          key={item.id}
          value={item.id}
          bg={'#FFFFFF'}
          style={{
            backgroundColor: '#FFFFFF',
          }}>
          <Accordion.Control>
            <Group className={classes.group}>
              <div className={classes.numbers}>
                <Icon icon={IconType.user} />
                <Text>{item.contact?.firstName || item.phoneNumber}</Text>
              </div>
              <div className={classes.numbers}>
                {item.type === 'inbound' ? (
                  <Icon icon={IconType.incoming} style={{ paddingTop: '5px' }} />
                ) : item.type === 'outbound-api' ? (
                  <Icon icon={IconType.outgoing} style={{ paddingTop: '5px' }} />
                ) : null}
                <Text
                  style={{
                    color: item.type === 'inbound' ? '#0BD007' : item.type === 'outbound-api' ? '#007BFF' : 'black',
                  }}>
                  {item.type === 'outbound-api' ? 'Outbound' : 'Inbound'}
                </Text>
              </div>
              <Text style={{ flex: 1 }}>{formatDate(item.createdAt)}</Text>
              <div className={classes.note}>
                <Text className={classes.noteText}>New lead obtained</Text>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                  justifyContent:'flex-start',
                  alignItems: 'flex-start',
                  alignContent:'flex-start'
                }}>
                {item.recordingUrl ? (
                  <Text>
                    {formatTime(
                      remainingTimes[item?.recordingUrl] !== undefined
                        ? remainingTimes[item?.recordingUrl]
                        : Number(item.duration),
                    )}
                  </Text>
                ) : (
                  <Text>No Recording</Text>
                )}
                {selectedAudio === item.recordingUrl ? (
                  <div style={{ display: 'flex', alignItems: 'center'}}>
                    <audio ref={audioRef} src={selectedAudio} style={{ display: 'none' }} />
                    <Icon icon={isPlaying ? IconType.pause : IconType.audio} onPress={togglePlayPause} />
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      cursor: 'pointer',
                      flex:'1'
                    }}
                    onClick={() => item.recordingUrl && handleAudioClick(item.recordingUrl, Number(item.duration))}>
                    {item.recordingUrl ? <Icon icon={IconType.audio} /> : ''}
                  </div>
                )}
              </div>

              <Popover opened={open && activeRow === index} onClose={() => setOpen(false)} width={180} position="left">
                <Popover.Target>
                  <div onClick={() => handleMoreClick(index)} style={{ cursor: 'pointer' }}>
                    <Icon icon={IconType.more} />
                  </div>
                </Popover.Target>
                <Popover.Dropdown>
                  <div>
                    <div>
                      <Button
                        variant="subtle"
                        onClick={() => openModal(item.id)}
                        leftSection={<Icon icon={IconType.add} isAction={false} />}
                        style={{ color: 'black', backgroundColor: 'white' }}>
                        Add to Contact
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant="subtle"
                        onClick={() => openDeleteModal(item.id)}
                        leftSection={<Icon icon={IconType.delete1} isAction={false} />}
                        style={{ color: '#B24432', backgroundColor: 'white' }}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </Popover.Dropdown>
              </Popover>
            </Group>
          </Accordion.Control>
          <Accordion.Panel>
            <div className={classes.summary}>
              <Text className={classes.text1}>Call Summary</Text>
              <Text className={classes.text2}>{item.summary}</Text>
              <div style={{ alignSelf: 'flex-end' }}>
                <Button
                  onClick={() => handleViewConversationClick(item.id)}
                  variant="subtle"
                  style={{
                    width: '162px',
                    height: '44px',
                  }}>
                  View Conversation
                </Button>
              </div>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Flex>
  ));

  return (
    <>
      {showChat && selectedCallId ? (
        <ChatContainer onBack={handleBackClick} id={selectedCallId} />
      ) : (
        <Table>
          <Table.Thead>
            <Table.Tr className={classes.mainheader}>
              <Table.Th className={classes.title1}>Contact</Table.Th>
              <Table.Th className={classes.title2}>Type</Table.Th>
              <Table.Th className={classes.title3}>Date</Table.Th>
              <Table.Th className={classes.title4}>Note</Table.Th>
              <Table.Th className={classes.title4}>Duration</Table.Th>
              <Table.Th>{'   '}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          {items?.length > 0 ? (
            <Flex direction={'column'} py={'16px'} className={'border-radius-full'} w={'100%'}>
              <Accordion variant="filled">{items}</Accordion>
            </Flex>
          ) : (
            <Flex justify="center" align="center" h={'84vh'}>
              <Text>No call logs available</Text>
            </Flex>
          )}
        </Table>
      )}
      {contactId && <AddContactModal open={contactModalOpen} onClose={closeModal} id={contactId} />}{' '}
      <Modal bg="rgba(240, 245, 248, 1)" opened={isDeleteModal} onClose={() => setIsDeleteModal(false)}>
        <FlexBox
          borderRadius={10}
          width={'100%'}
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          alignContent="center">
          <Text style={{ fontWeight: '500', fontSize: '24px' }}>Are you sure you want to delete this Contact?</Text>
          <Text style={{ fontWeight: '400', fontSize: '16px', color: '#7A7A7A' }}>This action cannot be undone</Text>
          <FlexBox
            container
            alignContent="center"
            width={'100%'}
            justifyContent="center"
            style={{ gap: '40px', marginTop: '30px' }}>
            <Button
              bg={'rgba(230, 242, 255, 1)'}
              style={{ color: '#007BFF' }}
              onClick={() => setIsDeleteModal(false)}
              radius={40}
              w={'111px'}
              h={'40px'}>
              Cancel
            </Button>
            <Button bg={'#B24432'} onClick={() => handleDelete(deleteId!)} radius={40} w={'111px'} h={'40px'}>
              Yes, Delete
            </Button>
          </FlexBox>
        </FlexBox>
      </Modal>
    </>
  );
}
