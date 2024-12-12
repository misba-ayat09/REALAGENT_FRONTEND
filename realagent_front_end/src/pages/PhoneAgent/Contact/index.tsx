import { Flex, Text } from '@mantine/core';
import React, { useState } from 'react';
import classes from './contact.module.css';
import PhoneContactCard from '../../../components/PhoneContactCard';
import AddToContactModal from '../../../components/Modal/addToContactModal.tsx';
import SimpleButton from '../../../components/Button/SimpleButton/index.tsx';

const ContactScreen: React.FC = () => {
  const [meetingModelOpen, setModalOpenMeeting] = useState(false);

  const openModal = () => {
    setModalOpenMeeting(true);
  };

  const closeModal = () => {
    setModalOpenMeeting(false);
  };

  // const [openImportModal, setOpenImportModal] = useState(false);

  // const handleOpenImportModal = () => {
  //   setOpenImportModal(true);
  // };

  // const handleCloseImportModal = () => {
  //   setOpenImportModal(false);
  // };

  return (
    <Flex direction={'column'}>
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
            <Text className={classes.title}>Add Contacts</Text>
            <Text className={classes.subTitle}>Add people to your contact list</Text>
          </Flex>
          <AddToContactModal open={meetingModelOpen} onClose={closeModal} />
          <SimpleButton text="Add Contact" onClick={openModal} />
        </Flex>
        {/* <Divider size={'1px'} color={'#292929'} orientation="vertical" />
        <Flex w={'100%'} h={'100%'} justify={'space-between'} align={'center'} gap={'10px'}>
          <Flex direction={'column'} justify={'center'} align={'flex-start'} gap={'4px'}>
            <Text className={classes.title}>Import Contacts</Text>
            <Text className={classes.subTitle}>Add multiple people to your contact list</Text>
          </Flex>
          <ImportContactsModal open={openImportModal} onClose={handleCloseImportModal} />
          <SimpleButton text={'Import Contact'} onClick={handleOpenImportModal} />
        </Flex> */}
      </Flex>
      <Flex>
        <PhoneContactCard />
      </Flex>
    </Flex>
  );
};

export default ContactScreen;
