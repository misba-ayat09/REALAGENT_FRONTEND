import React, { useEffect, useState } from 'react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import classes from './UserMenu.module.css';
import cx from 'clsx';
import { Group, Menu, UnstyledButton, Avatar, Text, Flex } from '@mantine/core';
import { IconType } from '../Icons';
import MenuItem from '../../SideMenu/MenuItem';
import { useNavigate, useLocation } from 'react-router-dom';
import { PATH_PAGES } from '../../../router/route';
import { FileCategory } from '../../../common/enum';
import { scalar } from '../../../helper';
import { FileService } from '../../../api/services';
import { AgentType } from '../../../common/enum/agent.enum';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getallAiAgents } from '../../../store/features/aiAgents/aiAgentsSlice';

const agentConfig: Record<AgentType, { key: string; icon: IconType; label: string; path: string }> = {
  [AgentType.Website]: {
    key: 'website',
    icon: IconType.WebR,
    label: 'Website Bot',
    path: PATH_PAGES.websiteActivities,
  },
  [AgentType.SocialMedia]: {
    key: 'socialMedia',
    icon: IconType.SocialR,
    label: 'Social Media Bot',
    path: PATH_PAGES.publish,
  },
  [AgentType.Research]: {
    key: 'research',
    icon: IconType.ResearchR,
    label: 'Research Bot',
    path: PATH_PAGES.researchHome,
  },
  [AgentType.ColdCalling]: {
    key: 'coldCalling',
    icon: IconType.PhoneR,
    label: 'Cold Calling Bot',
    path: PATH_PAGES.campaign,
  },
  [AgentType.Receptionist]: {
    key: 'receptionist',
    icon: IconType.PhoneR,
    label: 'Receptionist Bot',
    path: PATH_PAGES.receptionistHome,
  },
  [AgentType.Dashboard]: {
    key: '',
    icon: IconType.EmailR,
    label: '',
    path: '',
  },
  [AgentType.Email]: {
    key: '',
    icon: IconType.EmailR,
    label: '',
    path: '',
  },
  [AgentType.Crm]: {
    key: '',
    icon: IconType.EmailR,
    label: '',
    path: '',
  },
};

interface UserMenuProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    image: string;
  };
  isTextVisible?: boolean;
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user, isTextVisible = true, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [imgURL, setImgURL] = useState<string>('');
  const accessableAgents = useAppSelector((state) => state?.authentication?.userData?.accessableAgents || []);
  const aiAgents = useAppSelector((state) => state?.aiAgents?.result);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getallAiAgents());
  }, [dispatch]);
  useEffect(() => {
    const constructImageUrl = async () => {
      const imageId = user?.image;
      if (imageId) {
        const url = FileService.getStreamUrl(FileCategory.PROFILE_IMAGE, imageId);
        if (url) {
          setImgURL(url);
        }
      }
    };

    constructImageUrl();
  }, [user]);

  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const initials = `${user.firstName ?? ''} ${user.lastName ?? ''}`
    ?.split(' ')
    ?.map((word) => word[0]?.toUpperCase())
    ?.join('');

  return (
    <Menu
      width={scalar(280)}
      position="top-start"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal>
      <Menu.Target>
        <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
          <Group className={classes.contents} gap={7} maw={scalar(265)}>
            <Avatar
              src={imgURL}
              alt={`${user.firstName ?? ''} ${user.lastName ?? ''}`}
              radius="xl"
              size={scalar(40)}
              style={{ height: scalar(40), width: scalar(40) }}
              color="black"
              bg="white">
              {initials}
            </Avatar>
            {isTextVisible ? (
              <Flex direction={'column'} maw={scalar(120)}>
                <Text className={classes.name} fw={600} size="14px" lh={1} mr={3} truncate="end">
                  {`${user.firstName ?? ''} ${user.lastName ?? ''}`}
                </Text>
                <Text className={classes.name} fw={400} size="12px" lh={1} mr={3} c="dimmed" truncate="end">
                  {user.email}
                </Text>
              </Flex>
            ) : null}
            {!userMenuOpened ? (
              <IconChevronDown
                style={{
                  width: scalar(14),
                  height: scalar(12),
                  color: 'black',
                }}
                stroke={1.5}
              />
            ) : (
              <IconChevronUp
                style={{
                  width: scalar(14),
                  height: scalar(12),
                  color: 'black',
                }}
                stroke={1.5}
              />
            )}
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown className={classes.drop}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Avatar src={imgURL} radius="xl" size={scalar(44)} color="black" bg="white"></Avatar>
          <div>
            <Menu.Label>
              <Text className={classes.name} fw={600} size="14px" lh={1} mr={3} truncate="end">
                {`${user.firstName ?? ''} ${user.lastName ?? ''}`}
              </Text>
            </Menu.Label>
            <Menu.Label maw={isTextVisible ? '210px' : '160px'}>
              <Text className={classes.name} fw={400} size="12px" lh={1} c="dimmed" truncate="end">
                {user.email}
              </Text>
            </Menu.Label>
          </div>
        </div>
        <Menu.Divider />
        <Menu.Item>
          <MenuItem
            icon={IconType.DashboardR}
            label={`${user.firstName ?? ''}'s Workspace`}
            selected={location.pathname === PATH_PAGES.dashboardHome}
            onClick={() => {
              navigate(PATH_PAGES.dashboardHome);
            }}
          />
        </Menu.Item>
        {accessableAgents.map((accessibleAgent) => {
          const aiAgent = aiAgents.find((agent) => agent._id === accessibleAgent);
          if (!aiAgent || !agentConfig[aiAgent.type as AgentType]) return null;

          const { key, icon, label, path } = agentConfig[aiAgent.type as AgentType];

          return (
            <Menu.Item key={key}>
              <MenuItem
                icon={icon}
                label={label}
                selected={location.pathname === path}
                onClick={() => navigate(path)}
              />
            </Menu.Item>
          );
        })}
        <Menu.Divider />
        <Menu.Item>
          <MenuItem icon={IconType.logout} label={'Logout'} selected={false} onClick={onLogout} />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
