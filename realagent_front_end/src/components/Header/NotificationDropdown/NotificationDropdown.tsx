import React, { useEffect, useState } from 'react';
import { Text, Popover, ThemeIcon, Indicator, Flex } from '@mantine/core';
import classes from './NotificationDropdown.module.css';
import cx from 'clsx';
import { Icon } from '../../common/Icons/Icon';
import { IconType } from '../../common/Icons';
import { scalar } from '../../../helper';
import { AgentIcon, AgentIconType } from '../../Icon/AgentIcon';
import { AgentType } from '../../../common/enum/agent.enum';
import { useAppDispatch, useAppSelector } from '../../../store';
import { PATH_DASHBOARD } from '../../../router/route';
import { useNavigate } from 'react-router-dom';
import { getAllNotifications, getNotificationCounts } from '../../../store/features/notification/notificationSlice';
import { notificationAPI } from '../../../store/features/notification';

// interface NotificationDropdownProps {}

export const NotificationDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [notificationDropdownOpened, setNotificationDropdownOpened] = useState(false);
  const notifications = useAppSelector((state) => state.notification.result.list);

  const count = useAppSelector((state) => state.notification.result.unread);

  const [unReadNotifications, setUnReadNotifications] = useState<number>(0);
  const [notificationCount, setNotificationCount] = useState<string | number>(0);

  // useEffect(() => {
  //   setUnReadNotifications(count - notifications.filter((notification) => notification.read)?.length);
  // }, [count]);
  useEffect(() => {
    setUnReadNotifications(count);
  }, [count]);

  useEffect(() => {
    void dispatch(
      getAllNotifications({
        page: 1,
        limit: 10,
        read: false,
      }),
    );
    void dispatch(getNotificationCounts());
  }, [dispatch]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
  };

  // const notoficationIcon = (type: NotificationType) => {
  //   let icon: IconType;
  //   switch (type) {
  //     case NotificationType.MEETING_AGENT_ADD:
  //       icon = IconType.WebR;
  //       break;

  //     default:
  //       icon = IconType.Notification;
  //       break;
  //   }
  //   return icon;
  // };

  // const notoficationAction = (id: string, type: NotificationType) => {
  //   setNotificationDropdownOpened(false);
  //   // void notificationAPI.markNotificationAsRead(id);
  //   // void dispatch(markNotificationAsRead(id));
  //   switch (type) {
  //     case NotificationType.MEETING_AGENT_ADD:
  //       // case NotificationType.NEW_CLASS_MEETING_UPDATED:
  //       navigate(PATH_WEBSITE.websiteActivities);
  //       break;
  //     // case NotificationType.NEW_MEETING_CREATED:
  //     // case NotificationType.NEW_MEETING_UPDATED:
  //     //   navigate(Path.HOME);
  //     //   break;
  //     // case NotificationType.NOTES_CREATED:
  //     // case NotificationType.NOTES_UPDATED:
  //     //   navigate(Path.Notes);
  //     //   break;
  //     // case NotificationType.NEW_ANNOUNCEMENT:
  //     //   break;

  //     default:
  //       break;
  //   }
  // };

  useEffect(() => {
    if (unReadNotifications > 9) {
      setNotificationCount(()=>'9+');
    } else {
      setNotificationCount(()=>unReadNotifications);
    }
  }, [unReadNotifications]);

  const NotificationCount = () => (
    <Text
      span
      classNames={{
        root: classes.notificationCount,
      }}>
      {notificationCount}
    </Text>
  );
  const handleNotificationClick = async() => {
    setNotificationDropdownOpened((prev) => !prev)
    await notificationAPI.MarkAllNotificationAsRead();
    void dispatch(getNotificationCounts());

  };

  return (
    <Popover
      width={scalar(491)}
      trapFocus
      position="bottom-end"
      withArrow
      shadow="md"
      opened={notificationDropdownOpened}
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setNotificationDropdownOpened(false)}
      onOpen={() => {
        setNotificationDropdownOpened(true);
      }}
      withinPortal>
      <Popover.Target>
        <Indicator
          inline
          disabled={!notificationCount}
          size={scalar(18)}
          label={<NotificationCount />}
          offset={3}
          position="bottom-end"
          color="#B24432"
          withBorder
          classNames={{
            indicator: classes.notificationIndicator,
          }}
          onClick={handleNotificationClick}>
          <ThemeIcon
            radius="xl"
            variant="filled"
            className={cx(classes.iconContainer, {
              [classes.iconActive]: notificationDropdownOpened,
            })}>
            <Icon
              icon={IconType.Notification}
              style={{ width: scalar(24), height: scalar(24) }}
              containerClassName={classes.icon}
            />
          </ThemeIcon>
        </Indicator>
      </Popover.Target>
      <Popover.Dropdown classNames={{ dropdown: classes.dropdownContainer }}>
        <div className={classes.notificationContainer}>
          {notifications?.slice(0, 5).map(
            (
              notification, // Limit to 5 notifications
            ) => (
              <Flex
                key={notification?._id}
                className={cx(classes.notificationGroup)}
                onClick={() => {
                  // navigate(PATH_WEBSITE.meet);
                }}>
                <AgentIcon
                  icon={AgentType.Website}
                  type={AgentIconType.Type3}
                  radius={'8px'}
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
                  <Text className={classes.notificationDate}> {formatDate(notification.updatedAt)}</Text>
                </Flex>
              </Flex>
            ),
          )}
        </div>
        <Text className={classes.notificationViewMore} onClick={() => navigate(PATH_DASHBOARD.notifications)}>
          View More
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
};
