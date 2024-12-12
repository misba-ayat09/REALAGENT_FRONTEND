import React, { useEffect } from 'react';
import { Button, Flex, Text } from '@mantine/core';
import { AgentType } from '../../common/enum/agent.enum';
import { AgentIcon, AgentIconType } from '../../components/Icon/AgentIcon';
import { cx } from '../../helper';
import { useAppSelector, useAppDispatch } from '../../store';
import { getAllNotifications } from '../../store/features/notification/notificationSlice';
import classes from '../../components/Header/NotificationDropdown/NotificationDropdown.module.css';
import { Icon } from '../../components/common/Icons/Icon';
import { IconType } from '../../components/common/Icons';

const NotificationScreen: React.FC = () => {
  const notifications = useAppSelector((state) => state.notification.result.list);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(
      getAllNotifications({
        page: 1,
        limit: 10,
        read: false,
      }),
    );
  }, [dispatch]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
  };

  const onBack = () => {
    window.history.back();
  };

  return (
    <Flex direction="column" gap="2.5px" bg="#FFFFFF" px="xs" h="100vh" w="100%" p="lg" style={{ overflow: 'hidden' }}>
      <Flex align="center" h="auto" w="100%" direction="row" gap="10.5px">
        <Button
          className="button"
          style={{ borderRadius: '8px' }}
          onClick={onBack}
          leftSection={<Icon icon={IconType.leftArrow} style={{ width: '11px', height: '20px' }} />}>
          Back
        </Button>
        <Text fz="lg" fw={500}>
          Notifications
        </Text>
      </Flex>
      <Flex px="lg" bg="#FFFFFF" w="100%" h="100vh" p="lg" style={{ overflow: 'hidden' }}>
        <div>
          {notifications?.map((notification) => (
            <Flex
              key={notification?._id}
              mb="md" // Adds margin-bottom to create gap between notifications
              className={cx(classes.notificationGroup)}>
              <AgentIcon
                icon={AgentType.Website}
                type={AgentIconType.Type3}
                radius="8px"
                size={71}
                className={classes.agentIcon}
              />
              <Flex className={classes.notificationTextsGroup}>
                <Text
                  className={cx(classes.notificationTitle, {
                    [classes.notificationUnReadTitle]: !notification.read,
                  })}>
                  {notification.message}
                </Text>
                <Text className={classes.notificationDate}>{formatDate(notification.updatedAt)}</Text>
              </Flex>
            </Flex>
          ))}
        </div>
      </Flex>
    </Flex>
  );
};

export default NotificationScreen;
