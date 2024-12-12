import React, { useState, useEffect, useRef } from 'react';
import styles from './Chatbot.module.css';
import { Flex, Loader, Popover, Text, Textarea } from '@mantine/core';
import { Icon } from '../../../../components/common/Icons/Icon';
import { IconType } from '../../../../components/common/Icons';
import { cx, scalar } from '../../../../helper';
import { useLoadingState } from '../../../../hooks';
import { formatDate, isHtmlString } from '../../../../utils';
import TypingEffect from '../../../../components/TypingEffect';
import Setup from '../../../../components/Setup';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { ChatBotUsers } from '../../../../common/enum';
import { UserChatBotService } from '../../../../api/services';
import UserChatbotThunks from '../../../../store/features/userChatBot/thunks';
import { UserChatBotSelectors } from '../../../../store/features/userChatBot';
import { useElementSize, useFullscreen, useMediaQuery } from '@mantine/hooks';
import SimpleButton from '../../../../components/Button/SimpleButton';
import { ApiCallStatus } from '../../../../services';
import UpcomingMeetingCard from '../UpcomingMeetingNotificationCard';
import { IconChevronDown, IconChevronLeft, IconChevronRight, IconMaximize, IconMinimize } from '@tabler/icons-react';

interface ChatbotProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Chatbot: React.FC<ChatbotProps> = ({ isExpanded, setIsExpanded }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.userChatBot.status);
  const conversations = useAppSelector((state) => state.userChatBot.conversations || []);
  const questionAnswers = useAppSelector((state) => state.userChatBot.questionAnswers || []);
  const isQACompleted = useAppSelector((state) => state.userChatBot.isQACompleted);
  const [input, setInput] = useState('');
  const messageAreaRef = useRef<HTMLDivElement>(null);
  const userData = useAppSelector((state) => state.authentication.userData);
  const [isLoading, startLoading, finishLoading] = useLoadingState();

  const [isChatBotIconVisible, setIsChatBotIconVisible] = useState<boolean>(false);
  const [isSetupVisible, setIsSetupVisible] = useState<boolean>(false);

  const isSmallScreen = useMediaQuery('(max-width: 1100px)');
  const [isPopOverOpened, setIsPopOverOpened] = useState(false);

  const upcomingMeetings = useAppSelector((state) => state.meeting.upcomingMeetings.list || []);

  const hasShownSetup = useRef<boolean>(false);

  const { ref: fullScreenRef, toggle, fullscreen } = useFullscreen();

  const { ref: flexRef, width } = useElementSize();
  const greetingText = `👋Hello, ${userData.userName}`;
  useEffect(() => {
    if (!isQACompleted && !hasShownSetup.current) {
      setIsSetupVisible(true);
      hasShownSetup.current = true;
    } else if (isQACompleted) {
      setIsSetupVisible(false);
      hasShownSetup.current = false;
    }
  }, [isQACompleted]);

  useEffect(() => {
    if (questionAnswers.length === 10) {
      dispatch(UserChatBotSelectors.setIsQACompleted(questionAnswers.length === 10));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionAnswers.length]);

  useEffect(() => {
    setIsChatBotIconVisible(!!isSmallScreen);
  }, [isSmallScreen]);

  const [QNumber, setQNumber] = useState(0);

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [conversations]);

  const handleSend = async () => {
    if (!input.trim() || !userData.userId || !userData.userName) {
      return;
    }
    startLoading();
    try {
      let botResponse = '';

      if (isQACompleted) {
        const response = await UserChatBotService.chatWithAIBot(userData.userId, input.trim());
        if (response?.response) {
          botResponse = response?.response;
        }
      } else {
        const response = await UserChatBotService.answerQuestions(userData.userId, userData.userName, input.trim());
        if (response?.ai_response) {
          botResponse = response?.ai_response;
        }
        if (response?.question_number) {
          if (response?.status === 'pending') {
            setQNumber(response?.question_number - 1);
            dispatch(UserChatBotSelectors.setIsQACompleted(false));
          } else if (response?.status === 'success') {
            setQNumber(10);
            dispatch(UserChatBotSelectors.setIsQACompleted(true));
          }
        }
      }

      await dispatch(
        UserChatbotThunks.addToUserChatBotHistory({
          messages: [
            {
              text: input.trim(),
              user: ChatBotUsers.USER,
              isSetupConversation: !isQACompleted,
            },
            {
              text: botResponse,
              user: ChatBotUsers.BOT,
              isSetupConversation: !isQACompleted,
            },
          ],
        }),
      );
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      finishLoading();
      setInput('');
      if (!isQACompleted) {
        setTimeout(() => {
          if (userData?.userId) {
            dispatch(UserChatbotThunks.getAllQuestionAnswers(userData?.userId));
          }
        }, 15000);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const isLastMessage = (index: number) => index === conversations.length - 1;

  const handleToggleChatbot = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleStartSetup = async () => {
    if (!userData.userId || !userData.userName) {
      return;
    }
    const response = await UserChatBotService.answerQuestions(userData.userId, userData.userName, 'Hello');
    if (response?.ai_response) {
      dispatch(
        UserChatbotThunks.addToUserChatBotHistory({
          messages: [
            {
              text: response?.ai_response,
              user: ChatBotUsers.BOT,
              isSetupConversation: !isQACompleted,
            },
          ],
        }),
      );
    }
    setIsSetupVisible(false);
  };

  const handleClickMeetNotificationIcon = () => {
    if (upcomingMeetings.length > 0) {
      setIsPopOverOpened((prev) => !prev);
    }
  };

  return (
    <>
      <Flex
        ref={fullScreenRef}
        className={cx('border-radius-full', styles.chatbotContainer, {
          [styles.expanded]: isExpanded,
          [styles.collapsed]: !isExpanded,
          [styles.closed]: isChatBotIconVisible,
          [styles.hidden]: isChatBotIconVisible,
        })}>
        <Flex ref={flexRef} w={isExpanded ? '75%' : '100%'} className={styles.chatbot}>
          <Flex
            pos={'relative'}
            className={styles.header}
            w={'100%'}
            justify={'space-between'}
            align={'center'}
            gap={'8px'}>
            <Flex px={'16px'} justify={'space-between'} align={'center'} gap={'8px'}>
              <button onClick={handleToggleChatbot} className={styles.toggleButton}>
                {isExpanded ? <IconChevronRight size={24} /> : <IconChevronLeft size={24} />}
              </button>
              <Popover
                opened={isPopOverOpened}
                onChange={setIsPopOverOpened}
                arrowPosition="center"
                position="bottom-start"
                withArrow
                shadow="md"
                offset={10}>
                <Popover.Target>
                  <div
                    style={{ position: 'relative', width: '54px', height: '54px' }}
                    onClick={handleClickMeetNotificationIcon}>
                    <Icon icon={IconType.ChatIcon} style={{ width: '54px', height: '54px' }} />
                  </div>
                </Popover.Target>
                <Popover.Dropdown h={scalar(331)} w={scalar(300)} bg={'azureBlue'}>
                  {upcomingMeetings[0] && <UpcomingMeetingCard upcomingMeeting={upcomingMeetings[0]} />}
                </Popover.Dropdown>
              </Popover>
              {width > 222 ? (
                <Text className={styles.title} truncate="end">
                  RealtorBot
                </Text>
              ) : null}
            </Flex>
            <Flex px={'16px'} justify={'space-between'} align={'center'} gap={'8px'}>
              <button onClick={toggle} className={styles.toggleButton}>
                {fullscreen ? <IconMinimize size={24} /> : <IconMaximize size={24} />}
              </button>
              {isSmallScreen ? (
                <button onClick={() => setIsChatBotIconVisible(true)} className={styles.toggleButton}>
                  <IconChevronDown size={24} />
                </button>
              ) : null}
            </Flex>
          </Flex>
          {!isSetupVisible ? (
            <>
              <div className={styles.messageArea} ref={messageAreaRef}>
                <div className={styles.messageContainer}>
                  {conversations?.map((conversation, index) => (
                    <Flex
                      key={conversation.timestamp}
                      direction={'column'}
                      w={'100%'}
                      className={`${styles.message} ${
                        conversation.user === ChatBotUsers.USER ? styles.userMessage : styles.botMessage
                      }`}>
                      <div className={styles.messageHeader}>
                        <span className={styles.sender}>
                          {conversation.user === ChatBotUsers.USER ? 'You' : 'Realtor Assistant'}
                        </span>
                        <span className={styles.timestamp}>{` • ${formatDate(conversation.timestamp)}`}</span>
                      </div>
                      <Flex
                        className={`${styles.messageContent} ${
                          conversation.user === ChatBotUsers.USER ? styles.userMessageContent : styles.botMessageContent
                        }`}>
                        {conversation.user === ChatBotUsers.BOT && isLastMessage(index) ? (
                          <TypingEffect text={conversation.text} speed={10} />
                        ) : (
                          <Text
                            size="sm"
                            style={{
                              fontSize: '16px',
                              fontWeight: conversation.user === ChatBotUsers.USER ? 400 : 500,
                            }}>
                            {isHtmlString(conversation.text) ? (
                              <span dangerouslySetInnerHTML={{ __html: conversation.text }} />
                            ) : (
                              conversation.text
                            )}
                          </Text>
                        )}
                      </Flex>
                    </Flex>
                  ))}
                </div>
              </div>
              <div className={styles.inputArea}>
                <Textarea
                  value={input}
                  w={'100%'}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Message Assistant"
                  classNames={{ input: styles.chatInput }}
                  autosize
                  minRows={1}
                  maxRows={4}
                  rightSection={
                    !isLoading || status !== ApiCallStatus.Loading ? (
                      <Icon
                        icon={IconType.Send}
                        style={{
                          marginTop: scalar(5),
                        }}
                        onPress={handleSend}
                      />
                    ) : (
                      <Loader color="azureBlue" size="sm" type="bars" />
                    )
                  }
                />
              </div>
            </>
          ) : (
            <Flex direction={'column'} h={'100%'} w={'100%'} justify={'center'} align={'center'}>
              {/* <img style={{ width: scalar(146.42), height: scalar(46.09) }} src={Logo} alt="logo" /> */}
              <Text ff={'Roboto'} fw={400} fs={'24px'} c={'#606060'}>
                {greetingText}
              </Text>
              <SimpleButton
                loading={isLoading || status === ApiCallStatus.Loading}
                style={{ minWidth: scalar(112), height: scalar(39) }}
                text={questionAnswers.length > 0 ? 'Chat Now' : 'Start Talking'}
                onClick={() => handleStartSetup()}
              />
            </Flex>
          )}
        </Flex>
        {isExpanded ? (
          <Flex w={'25%'} p={'16px'}>
            <Setup qNumber={QNumber} />
          </Flex>
        ) : null}
      </Flex>
      {isChatBotIconVisible ? (
        <div className={`${styles.chatbotIcon} ${!isExpanded ? styles.showIcon : styles.hideIcon}`}>
          <Icon
            icon={IconType.ChatIcon}
            style={{ width: '44px', height: '44px' }}
            onPress={() => setIsChatBotIconVisible(false)}
          />
        </div>
      ) : null}
    </>
  );
};

export default Chatbot;
