/* eslint-disable react-hooks/exhaustive-deps */
import { Flex } from '@mantine/core';
import React from 'react';
import Home from '../../../components/Card/PhoneCard';

const PhoneHomeScreen: React.FC = () => {
  return (
    <Flex direction={'column'} gap={'5.5px'}>
      <Flex>
        <Home />
      </Flex>
    </Flex>
  );
};

export default PhoneHomeScreen;
