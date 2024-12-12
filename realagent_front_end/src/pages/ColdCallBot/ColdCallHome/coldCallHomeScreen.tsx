import { Flex, Text, Loader } from '@mantine/core';
import classes from './coldCallCard.module.css';
import { useState, useEffect } from 'react';
import SimpleButton from '../../../components/Button/SimpleButton';
import ColdCallLogTable from '../../../components/Card/ColdCallTableCard';
import { useAppDispatch } from '../../../store';
import { getAllCalls, getAvailableNumber } from '../../../store/features/ColdCallBot';
import ColdCallBuyNumberModal from '../../../components/Modal/ColdCallBuyNumberModal';

export default function ColdCallHomeScreen() {
  const [meetingModelOpen, setModalOpenMeeting] = useState(false);
  const [numberFetchFailed, setNumberFetchFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const openModal = () => {
    setModalOpenMeeting(true);
  };

  const closeModal = () => {
    setModalOpenMeeting(false);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getAllCalls());
    dispatch(getAvailableNumber())
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setNumberFetchFailed(true);
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <>
      <Flex w={'100%'} h={'100%'}>
        {loading ? (
          <Flex
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              width: '100%',
              minHeight: '700px',
            }}>
            <Loader size="lg" />
          </Flex>
        ) : numberFetchFailed ? (
          <>
            <Flex w={'100%'} h={'100%'}>
              <ColdCallLogTable />
            </Flex>
          </>
        ) : (
          <>
            <Flex
              w={'100%'}
              h={'100%'}
              mih={'50rem'}
              justify={'center'}
              align={'center'}
              direction="column"
              style={{ zIndex: 2 }}>
              <Text className={classes.title} mb={4}>
                To use Phone Agent, you need to purchase a phone number. This will enable you to access the full
                features and functionality of the service.
              </Text>
              <SimpleButton className={classes.button} text="Buy Phone Number" onClick={openModal} />
            </Flex>
          </>
        )}
      </Flex>
      <ColdCallBuyNumberModal open={meetingModelOpen} onClose={closeModal} />
    </>
  );
}
