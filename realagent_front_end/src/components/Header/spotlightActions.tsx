import { SpotlightActionGroupData } from '@mantine/spotlight';
import { NavigateFunction } from 'react-router-dom';
import { NavigationData } from '../../layout/NavigationData';
import { NavigationIcon, NavigationIconType } from '../Navigation/NavigationIcon';
import { useAppDispatch, useAppSelector } from '../../store';
import { useEffect } from 'react';
import { getallAiAgents } from '../../store/features/aiAgents/aiAgentsSlice';
import { PATH_PAGES } from '../../router/route';

export const spotlightActions = (navigate: NavigateFunction): SpotlightActionGroupData[] => {
  const actions: SpotlightActionGroupData[] = [];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const accessibleAgents = useAppSelector((state) => state?.authentication?.userData?.accessableAgents || []);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const aiAgents = useAppSelector((state) => state?.aiAgents?.result);
  actions.push({
    group: 'Default',
    actions: [
      {
        id: 'DASHBOARD',
        label: 'Timeline',
        description: 'Go to Timeline Page',
        onClick: () => navigate(PATH_PAGES.dashboardHome),
        leftSection: (
          <NavigationIcon
            type={NavigationIconType.Home}
            color={'#7A7A7A'}
            strokeWidth={2}
          />
        ),
      },
      {
        id: 'DASHBOARD',
        label: 'Account',
        description: 'Go to Account Page',
        onClick: () => navigate(PATH_PAGES.account),
        leftSection: (
          <NavigationIcon
            type={NavigationIconType.Account}
            color={'#7A7A7A'}
            strokeWidth={2}
          />
        ),
      },
      {
        id: 'DASHBOARD',
        label: 'Home',
        description: 'Go to Home Page',
        onClick: () => navigate(PATH_PAGES.dashboardBots),
        leftSection: (
          <NavigationIcon
            type={NavigationIconType.Home}
            color={'#7A7A7A'}
            strokeWidth={2}
          />
        ),
      },
    ],
  });


  Object.entries(NavigationData).forEach(([agentType, navigationGroups]) => {
    const group: SpotlightActionGroupData = {
      group: `${agentType} Pages`,
      actions: [],
    };
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(getallAiAgents());
    }, [dispatch]);
  
    const matchingAgents = accessibleAgents.filter((agent) => {
      const aiAgent = aiAgents.find((aiAgent) => aiAgent._id === agent);
      return aiAgent && aiAgent.type === agentType;
    });

    if (matchingAgents.length > 0) {
      navigationGroups.forEach((navGroup) => {
        navGroup.links.forEach((link) => {
          group.actions.push({
            id: `${agentType}-${link.label.toLowerCase()}`,
            label: link.label,
            description: `Go to ${link.label} Page`,
            onClick: () => navigate(link.link),
            leftSection: (
              <NavigationIcon
                type={link.icon}
                color={'#7A7A7A'}
                strokeWidth={link.strokeWidth}
              />
            ),
          });
        });
      });

      actions.push(group);
    }
  });
  return actions;
};
