import { Box, Divider, Flex, Group, Paper, ScrollArea, StyleProp, Text } from '@mantine/core';
import classes from './Navigation.module.css';
import { LinksGroup } from './Links/Links';
import { useNavigate } from 'react-router-dom';
import { NavigationIconType } from './NavigationIcon';
import { IconType } from '../common/Icons';
import { Icon } from '../common/Icons/Icon';
import { WorkspaceStatus } from '../Header/WorkspaceStatus';
import { PATH_PAGES } from '../../router/route';

export interface NavigationDataType {
  title: string;
  links: {
    label: string;
    icon: NavigationIconType;
    link: string;
    secondaryLink?: string;
    strokeWidth?: number;
  }[];
}

interface NavigationProps {
  data: NavigationDataType[];
  w?: StyleProp<React.CSSProperties['width'] | undefined>;
  isTextVisible?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ data, w = '250px', isTextVisible = true }) => {
  const navigate = useNavigate();

  const handleClickSettings = () => navigate('dashboard/settings');
  const handleOnClickGelp = () => navigate('dashboard/help');
  const handleOnClickBots = () => navigate(PATH_PAGES.dashboardBots);

  const links = data.map((m) => (
    <Box pl={0} mb="md" key={m.title}>
      <Text
        tt="uppercase"
        size="xs"
        pl={isTextVisible ? 'md' : 0}
        fw={700}
        mb="sm"
        ta={isTextVisible ? 'left' : 'center'}
        className={classes.linkHeader}>
        {m.title}
      </Text>
      {m.links.map((item) => (
        <LinksGroup strokeWidth={item.strokeWidth ?? 1.5} isTextVisible={isTextVisible} key={item.label} {...item} />
      ))}
    </Box>
  ));

  return (
    <nav className={classes.navbar} style={{ width: w as string | number }}>
      <Flex direction={'column'} gap={'10px'}>
        <WorkspaceStatus />
        <Paper w={'100%'}>
          <Divider c={'#DCE5EA'} size={'2px'} w={'100%'} />
        </Paper>
      </Flex>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
      <Group>
        <Flex
          direction={'column'}
          justify={'center'}
          align={isTextVisible ? 'flex-start' : 'center'}
          className={classes.footer}>
          <Flex justify={'center'} align={'center'} gap={'15px'} onClick={handleOnClickBots}>
            <Icon icon={IconType.Dashboard} style={{ marginTop: '6px', cursor: 'pointer' }} />
            <Text c={'#7A7A7A'} style={{ cursor: 'pointer' }}>
              {isTextVisible ? 'Bots' : ''}
            </Text>
          </Flex>
          <Flex justify={'center'} align={'center'} gap={'15px'} onClick={handleOnClickGelp}>
            <Icon icon={IconType.help} style={{ marginTop: '6px', cursor: 'pointer' }} />
            <Text c={'#7A7A7A'} style={{ cursor: 'pointer' }}>
              {isTextVisible ? 'Help' : ''}
            </Text>
          </Flex>
          <Flex justify={'center'} align={'center'} gap={'15px'} onClick={handleClickSettings}>
            <Icon icon={IconType.setting} style={{ marginTop: '6px', cursor: 'pointer' }} />
            <Text c={'#7A7A7A'} style={{ cursor: 'pointer' }}>
              {isTextVisible ? 'Settings' : ''}
            </Text>
          </Flex>
        </Flex>
      </Group>
    </nav>
  );
};

export default Navigation;
