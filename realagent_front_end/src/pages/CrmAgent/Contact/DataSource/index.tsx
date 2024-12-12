import React, { useState } from "react";
import classes from "./index.module.css";
import { SourceTabs } from "../../../../utils/enums";
import { Divider, Flex, Space, Tabs, Text } from "@mantine/core";
import { ConditionalRenderer } from "../../../../components";
import FilesDataSource from "./Files";
import QnADataSource from "./QnA";
import TextDataSource from "./Text";
import WebsiteDataSource from "./Website";
import { cx } from "../../../../helper";

const DataSourceScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SourceTabs>(SourceTabs.File);

  const handleTabChange = (value: string | null) => {
    if (value && Object.values(SourceTabs).includes(value as SourceTabs)) {
      setActiveTab(value as SourceTabs);
    }
  };

  return (
    <Flex direction={'column'}>
      <Flex bg={'#FFFFFF'} px={16} pt={32} pb={16} className={'border-radius-top'}>
        <Tabs
          defaultValue={SourceTabs.File}
          onChange={handleTabChange}
          color="#007BFF"
          w={'100%'}
          // p={10}
          variant="pills"
          radius={27}
          classNames={{
            tab: cx(classes.tab),
          }}>
          <Tabs.List>
            <Tabs.Tab value={SourceTabs.File}>Files</Tabs.Tab>
            <Tabs.Tab value={SourceTabs.Text}>Text</Tabs.Tab>
            <Tabs.Tab value={SourceTabs.Website}>Website</Tabs.Tab>
            <Tabs.Tab value={SourceTabs.QnA}>Q&A</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Flex>
      <Flex px={16} bg={'#FFFFFF'} pb={32} direction={'column'}>
        <Divider pb={16} c={'#DCE5EA'} size={'2px'} />
        <Text className={classes.title}>Add your data to train your AI chat Bot</Text>
        <Text className={classes.subTitle}>We will collect these data to create a perfect Chat bot for you</Text>
        <Space h={24} />
        <ConditionalRenderer param1={activeTab} param2={SourceTabs.File}>
          <FilesDataSource />
        </ConditionalRenderer>
        <ConditionalRenderer param1={activeTab} param2={SourceTabs.Text}>
          <TextDataSource />
        </ConditionalRenderer>
        <ConditionalRenderer param1={activeTab} param2={SourceTabs.Website}>
          <WebsiteDataSource />
        </ConditionalRenderer>
        <ConditionalRenderer param1={activeTab} param2={SourceTabs.QnA}>
          <QnADataSource />
        </ConditionalRenderer>
      </Flex>
    </Flex>
  );
};

export default DataSourceScreen;
