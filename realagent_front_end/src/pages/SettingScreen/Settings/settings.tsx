import React from 'react';
import { Flex, Text } from '@mantine/core';
import GeneralSection from '../../../components/Settings/General/GenralCard';

const SettingScreen: React.FC = () => {
  return (
    <Flex direction={'column'} gap={'2.5px'} bg={'#FFFFFF'} px="xs">
      <Text size="xl" fw={700}>
        General Settings
      </Text>
      <Text c="dimmed">{'User account settings'}</Text>
      <Flex px="xs" bg={'#FFFFFF'}>
        <GeneralSection />
      </Flex>
    </Flex>
  );
};

export default SettingScreen;
