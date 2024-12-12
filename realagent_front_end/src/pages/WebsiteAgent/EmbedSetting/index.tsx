/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react';
import { Flex, Tabs as MantineTab, Space, Text } from '@mantine/core';
import { ConditionalRenderer } from '../../../components';
import ChatAgentSection from './ChatAgentSection';
import DocumentationSection from './DocumentationSection';
import classes from './index.module.css';
import { cx } from '../../../helper';
import { useAppDispatch, useAppSelector } from '../../../store';
import SimpleButton from '../../../components/Button/SimpleButton';
import ChatbotThunks from '../../../store/features/chatBot/thunks';
import { useLoadingState } from '../../../hooks';
import { ChatBotService } from '../../../api/services';
import { isTruthy } from '../../../utils';

export enum Tabs {
  ChatAgent = 'Chat Agent',
  Documentation = 'Documentation',
}

const EmbedSettingsScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.ChatAgent);

  const [chatBot] = useAppSelector((state) => state.chatBot.chatbots);
  const [isAddChatbotLoading, startAddChatbotLoading, finishAddChatbotLoading] = useLoadingState();

  const handleAddChatbot = async () => {
    startAddChatbotLoading();
    ChatBotService.create()
      .then(() => {
        dispatch(ChatbotThunks.findOne());
      })
      .finally(() => {
        finishAddChatbotLoading();
      });
  };

  useEffect(() => {
    dispatch(ChatbotThunks.findApiKey());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      direction={'column'}
      pos="relative"
      bg={'#FFFFFF'}
      style={{ borderRadius: 'calc(15px * var(--scale-factor))' }}>
      {isTruthy(chatBot) ? (
        <>
          <Flex bg={'#FFFFFF'} px={16} pt={32} pb={16} className={'border-radius-top'}>
            <MantineTab
              defaultValue={Tabs.ChatAgent}
              onChange={(val) => setActiveTab(val as Tabs)}
              color="#007BFF"
              w={'100%'}
              variant="pills"
              radius={27}
              classNames={{
                tab: cx(classes.tab),
              }}>
              <MantineTab.List>
                <MantineTab.Tab value={Tabs.ChatAgent}>ChatAgent</MantineTab.Tab>
                <MantineTab.Tab value={Tabs.Documentation}>Documentation</MantineTab.Tab>
              </MantineTab.List>
            </MantineTab>
          </Flex>
          <Flex px={16} bg={'#FFFFFF'} pb={32} direction={'column'}>
            <Text className={classes.title}>Customize</Text>
            <Text className={classes.subTitle}>Customize your chat bot as per requirment</Text>
            <Space h={24} />
            <ConditionalRenderer param1={activeTab} param2={Tabs.ChatAgent}>
              <ChatAgentSection />
            </ConditionalRenderer>
            <ConditionalRenderer param1={activeTab} param2={Tabs.Documentation}>
              <DocumentationSection />
            </ConditionalRenderer>
          </Flex>
        </>
      ) : (
        <Flex
          bg={'#FFFFFF'}
          w={'100%'}
          h={'100%'}
          mih={'50rem'}
          justify={'center'}
          align={'center'}
          direction="column"
          style={{ zIndex: 2 }}>
          <Text className={classes.title} mb={4}>
            No chatbots available. Please add a new one to get started.
          </Text>
          <SimpleButton
            className={classes.button}
            text="Add Chatbot"
            loading={isAddChatbotLoading}
            onClick={handleAddChatbot}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default EmbedSettingsScreen;
