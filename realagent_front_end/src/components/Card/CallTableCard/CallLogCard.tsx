import React, { useRef, useState } from 'react';
import { Accordion, Text, Modal, Button, Popover, Group, Flex } from '@mantine/core';
import { Icon } from '../../common/Icons/Icon';
import { FlexBox } from '../../common/FlexBox/FlexBox';
import classes from './callLogCard.module.css';
import { AgentIcon, AgentIconType } from '../../Icon/AgentIcon';
import { IconType } from '../../common/Icons';
import AddContactModal from '../../Modal/AddContactModal';
import { AgentType } from '../../../common/enum/agent.enum';
import ChatContainer from '../../ChatContainer';
import { timeSince } from '../../../utils';
import { Contact } from '../../../store/features/AddContact';

interface CallLogCardProps {
  id: string;
  phoneNumber: string;
  type: string;
  createdAt: string;
  duration: string;
  contact?: Contact;
  recordingUrl?: string;
  summary?: string;
}

const CallLogCard: React.FC<CallLogCardProps> = ({
  id,
  phoneNumber,
  type,
  createdAt,
  duration,
  recordingUrl,
  summary,
  contact,
}) => {
  const [open, setOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  console.log(deleteId);
  const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleDateString(undefined);
  };

  const formatDuration = (durationInSeconds: number) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

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

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  const openModal = () => setContactModalOpen(true);
  const closeModal = () => setContactModalOpen(false);

  const openDeleteModal = (id: string) => {
    setIsDeleteModal(true);
    setDeleteId(id);
  };

  const handleDelete = () => {
    setIsDeleteModal(false);
    setDeleteId(null);
    // Perform deletion logic here
  };

  const handleViewConversationClick = () => {
    setSelectedCallId(id);
    setShowChat(true);
  };

  const handleBackClick = () => {
    setShowChat(false);
    setSelectedCallId(null);
  };

  let headerText = '';
  if (type === 'inbound') {
    headerText = 'Phone Bot Received An Inbound Call';
  } else if (type === 'outbound-api') {
    headerText = 'Phone Bot Initiated An Outbound Call';
  }

  return (
    <Flex direction={'column'} bg={'#FFFFFF'} px={'16px'} py={'16px'} className={'border-radius-full'}>
      <Accordion variant="filled" bg={'#FFFFFF'} classNames={{ chevron: classes.chevron }}>
        <Accordion.Item
          key={id}
          value={id}
          bg={'#FFFFFF'}
          style={{
            backgroundColor: '#FFFFFF',
          }}>
          <Flex justify="space-between" direction="row">
            <Group style={{ display: 'flex', flexDirection: 'row' }}>
              <AgentIcon icon={AgentType.ColdCalling} type={AgentIconType.Type4} size={24} />
              <Text fs={'16'} fw={'600'} c={'#292929'}>
                {headerText}
              </Text>
            </Group>
            <Text fw={600} fz={14} ff="Roboto" c="#B1B1B1" pr={10}>
              {createdAt && timeSince(new Date(createdAt))}
            </Text>
          </Flex>

          <Accordion.Control pl={'0px'}>
            <Group className={classes.group} pl={'0px'}>
              <div className={classes.numbers}>
                <Icon icon={IconType.user} />
                <Text>{contact?.firstName || phoneNumber}</Text>
              </div>
              <div className={classes.numbers}>
                {type === 'inbound' ? (
                  <Icon icon={IconType.incoming} style={{ paddingTop: '5px' }} />
                ) : type === 'outbound-api' ? (
                  <Icon icon={IconType.outgoing} style={{ paddingTop: '5px' }} />
                ) : null}
                <Text style={{ color: type === 'inbound' ? '#0BD007' : '#007BFF' }}>
                  {type === 'outbound-api' ? 'Outbound' : 'Inbound'}
                </Text>
              </div>
              <Text>{formatDate(createdAt)}</Text>
              <div className={classes.numbers}>
                <Text>{recordingUrl ? formatDuration(Number(duration)) : 'No Recording'}</Text>
                {recordingUrl && (
                  <Icon
                    icon={isPlaying ? IconType.pause : IconType.audio}
                    onPress={togglePlayPause}
                    style={{ paddingTop: '5px' }}
                  />
                )}
              </div>
              <Popover opened={open} onClose={() => setOpen(false)} width={180} position="left">
                {' '}
                <Popover.Target>
                  <div onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
                    <Icon icon={IconType.more} />
                  </div>
                </Popover.Target>
                <Popover.Dropdown>
                  <div>
                    <Button variant="subtle" onClick={openModal} leftSection={<Icon icon={IconType.add} />}>
                      Add to Contact
                    </Button>
                    <Button
                      variant="subtle"
                      onClick={() => openDeleteModal(id)}
                      leftSection={<Icon icon={IconType.delete1} />}>
                      Delete
                    </Button>
                  </div>
                </Popover.Dropdown>
              </Popover>
            </Group>
          </Accordion.Control>
          <Accordion.Panel bg={'#FFFFFF'}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'white',
              }}>
              <div className={classes.summary}>
                <Text className={classes.text1}>Call Summary</Text>
                <Text className={classes.text2}>{summary}</Text>
              </div>
              <div style={{ alignSelf: 'flex-end' }}>
                <Button
                  onClick={handleViewConversationClick}
                  variant="subtle"
                  style={{ width: '162px', height: '44px' }}>
                  View Conversation
                </Button>
              </div>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      {showChat && selectedCallId ? <ChatContainer onBack={handleBackClick} id={selectedCallId} /> : null}
      {contactModalOpen && <AddContactModal open={contactModalOpen} onClose={closeModal} id={id} />}

      {recordingUrl && <audio ref={audioRef} onEnded={handleAudioEnd} src={recordingUrl} preload="metadata" hidden />}

      <Modal opened={isDeleteModal} onClose={() => setIsDeleteModal(false)}>
        <FlexBox
          borderRadius={10}
          width={'100%'}
          style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}
          alignContent="center">
          <Text style={{ fontWeight: '500', fontSize: '24px' }}>Are you sure you want to delete this Contact?</Text>
          <Text style={{ fontWeight: '400', fontSize: '16px', color: '#7A7A7A' }}>This action cannot be undone</Text>
          <FlexBox
            container
            alignContent="center"
            width={'100%'}
            justifyContent="center"
            style={{ gap: '40px', marginTop: '30px' }}>
            <Button onClick={() => setIsDeleteModal(false)} radius={40} w={'111px'} h={'40px'}>
              Cancel
            </Button>
            <Button onClick={handleDelete} radius={40} w={'111px'} h={'40px'}>
              Yes, Delete
            </Button>
          </FlexBox>
        </FlexBox>
      </Modal>
    </Flex>
  );
};

export default CallLogCard;
