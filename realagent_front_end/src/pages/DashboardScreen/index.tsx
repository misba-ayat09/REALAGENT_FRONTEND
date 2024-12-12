import React, { useState } from 'react';
import { ConditionalRenderer } from '../../components';
import { Card, Flex, Tabs as MantineTab } from '@mantine/core';
import { OverviewSection, ResearchSection, SocialMediaSection, WebsiteSection, PhoneSection } from './Sections';
import classes from './index.module.css';
import { cx } from '../../helper';

export enum Tabs {
  Overview = 'Overview',
  Website = 'Website',
  SocialMedia = 'Social Media',
  Research = 'Research',
  Phone = 'Phone',
}

const DashboardScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState(Tabs.Overview);

  return (
    <Flex direction={'column'} gap={'16px'}>
      <Card
        bg={'#FFFFFF'}
        p={'14px 16px'}
        radius={'15px'}
        style={{
          position: 'sticky',
          top: '60px',
          zIndex: 10,
        }}>
        <Flex justify="space-between" align="center">
          <MantineTab
            value={activeTab}
            onChange={(val) => setActiveTab(val as Tabs)}
            color="#007BFF"
            variant="pills"
            radius={27}
            classNames={{
              tab: cx(classes.tab),
            }}>
            <MantineTab.List>
              <MantineTab.Tab value={Tabs.Overview}>Timeline</MantineTab.Tab>
            </MantineTab.List>
          </MantineTab>

          <MantineTab
            value={activeTab}
            onChange={(val) => setActiveTab(val as Tabs)}
            variant="pills"
            radius={27}
            classNames={{
              tab: cx(classes.tab),
            }}>
            <MantineTab.List>
              <MantineTab.Tab value={Tabs.Website}>Website</MantineTab.Tab>
              <MantineTab.Tab value={Tabs.SocialMedia}>Social Media</MantineTab.Tab>
              <MantineTab.Tab value={Tabs.Research}>Research</MantineTab.Tab>
              <MantineTab.Tab value={Tabs.Phone}>Phone</MantineTab.Tab>
            </MantineTab.List>
          </MantineTab>
        </Flex>
      </Card>

      <Flex pt={'0px'}>
        <ConditionalRenderer param1={activeTab} param2={Tabs.Overview}>
          <OverviewSection />
        </ConditionalRenderer>
        <ConditionalRenderer param1={activeTab} param2={Tabs.Website}>
          <WebsiteSection />
        </ConditionalRenderer>
        <ConditionalRenderer param1={activeTab} param2={Tabs.SocialMedia}>
          <SocialMediaSection />
        </ConditionalRenderer>
        <ConditionalRenderer param1={activeTab} param2={Tabs.Research}>
          <ResearchSection />
        </ConditionalRenderer>
        <ConditionalRenderer param1={activeTab} param2={Tabs.Phone}>
          <PhoneSection />
        </ConditionalRenderer>
      </Flex>
    </Flex>
  );
};

export default DashboardScreen;
