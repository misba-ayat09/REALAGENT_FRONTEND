import { Flex, Group, Tabs as MantineTab, Text } from '@mantine/core';
import React, { useState } from 'react';
import ProfileCard from '../../../components/ProfileCard';
import { ConditionalRenderer } from '../../../components';
import { cx } from '../../../helper';
import classes from './index.module.css';
import Qualifyquestions from '../../../components/Qualify/QualifyingQuestions';

// eslint-disable-next-line react-refresh/only-export-components
export enum Tabs {
  General = 'General',
  QualifyingQuestions = 'Qualifying questions',
}

const ProfileScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.General);

  return (
    <Flex direction={'column'} gap={'2.5px'}>
      <Flex bg={'#FFFFFF'} className={'border-radius-top'} direction={'column'}>
        <Group className={classes.group}>
          <Text className={classes.text1}>Settings</Text>
          <Text className={classes.text2}>User account settings</Text>
        </Group>
        <Flex bg={'#FFFFFF'} px={16}  className={'border-radius-top'}>
          <MantineTab
            defaultValue={Tabs.General}
            onChange={(val) => setActiveTab(val as Tabs)}
            color="#007BFF"
            w={'100%'}
            variant="pills"
            radius={27}
            classNames={{
              tab: cx(classes.tab),
            }}>
            <MantineTab.List>
              <MantineTab.Tab value={Tabs.General}>General</MantineTab.Tab>
              <MantineTab.Tab value={Tabs.QualifyingQuestions}>Qualifying Questions</MantineTab.Tab>
            </MantineTab.List>
          </MantineTab>
        </Flex>
        <Flex px={16} bg={'#FFFFFF'} pb={32} direction={'column'}>
          <ConditionalRenderer param1={activeTab} param2={Tabs.General}>
            <ProfileCard />
          </ConditionalRenderer>
          <ConditionalRenderer param1={activeTab} param2={Tabs.QualifyingQuestions}>
            <Qualifyquestions />
          </ConditionalRenderer>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProfileScreen;
