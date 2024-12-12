import React from 'react';
import { Text, Flex, Indicator } from '@mantine/core';
import { useNetwork } from '@mantine/hooks';
import { useLocation } from 'react-router-dom';
import { determineAgent } from '../../../router/route';
import classes from './WorkspaceStatus.module.css';
import { useAppSelector } from '../../../store';
import { AgentType } from '../../../common/enum/agent.enum';
import { AgentIcon, AgentIconType } from '../../Icon/AgentIcon';

export const WorkspaceStatus: React.FC = () => {
  const networkStatus = useNetwork();
  const userName = useAppSelector((state) => state.authentication.userData.firstName);

  const path = useLocation();

  const agent = determineAgent(path.pathname) || AgentType.Dashboard;

  let agentName: string = '';

  switch (agent) {
    case AgentType.Website:
      agentName = 'Website Bot';
      break;
    case AgentType.SocialMedia:
      agentName = 'Social Media Bot';
      break;
    case AgentType.Research:
      agentName = 'ResearchBot';
      break;
    case AgentType.Dashboard:
      agentName = userName ?? 'Dashboard';
      break;
    case AgentType.Email:
      agentName = 'Email Bot';
      break;
    case AgentType.Receptionist:
      agentName = 'Receptionist Bot';
      break;
    case AgentType.ColdCalling:
      agentName = 'Cold Calling Bot';
      break;
    case AgentType.Crm:
      agentName = 'CRM Bot';
      break;
    default:
      agentName = 'Dashboard';
      break;
  }

  return (
    <Flex
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '10px',
      }}>
      <AgentIcon icon={agent} type={AgentIconType.Type2} size={40} />
      <Text className={classes.workspace}>{`${agentName} Workspace`}</Text>
      <Indicator position="middle-start" withBorder processing pl={10} color={networkStatus.online ? 'green' : 'red'}>
        <Text className={classes.status}>{networkStatus.online ? 'Online' : 'Offline'}</Text>
      </Indicator>
    </Flex>
  );
};
