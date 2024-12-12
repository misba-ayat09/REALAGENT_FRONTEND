import { Card, Flex, Text } from '@mantine/core';
import { Logo } from '../../../assets';
import SimpleButton from '../../../components/Button/SimpleButton';
import { BotSetupCard } from '../../../components/Card/BotsSetupCard/BotsSetupCard';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getallAiAgents } from '../../../store/features/aiAgents/aiAgentsSlice';
import { getUserData } from '../../../store/features/authentication';
import { userApi } from '../../../store/features/authentication/userApi';
import { AgentIcon, AgentIconType } from '../../../components/Icon/AgentIcon';
import { toast, Toaster } from 'sonner';
import { AgentType } from '../../../common/enum/agent.enum';
import { useNavigate } from 'react-router-dom';

const BotsSetup: React.FC = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.authentication.userData);
  const aiAgents = useAppSelector((state) => state.aiAgents.result || []);
  const [accessableAgents, setAccessableAgents] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getallAiAgents());
  }, [dispatch]);

  useEffect(() => {
    if (userData?.accessableAgents) {
      setAccessableAgents(Array.from(new Set(userData.accessableAgents)));
    }
  }, [userData]);

  const navigate = useNavigate();

  const handleSave = async () => {
    if (accessableAgents.length === 0) {
      toast.error('Please select at least one AI agent to continue.');
      return;
    }

    try {
      await userApi.updateProfile({ accessableAgents });
      dispatch(getUserData());
      navigate('/contentcalender/activity'); // Navigate to contentcalender on success
    } catch {
      toast.error('An error occurred while saving. Please try again.');
    }
  };

  const handleCheckboxChange = (agentId: string) => {
    setAccessableAgents((prev) => (prev.includes(agentId) ? prev.filter((id) => id !== agentId) : [...prev, agentId]));
  };

  // const availableAgents = aiAgents.filter((agent) => !userData?.accessableAgents?.includes(agent._id));

  return (
    <Flex direction="column" gap="16px">
      <Toaster position="top-right" />
      <Flex dir="row" justify="space-between" align="center">
        <Card p="14px 16px" bg="none" radius="15px" style={{ position: 'sticky', top: '60px', zIndex: 10 }}>
          <Flex dir="row">
            <Text ff="Roboto" c="#292929" fw={600} fz={24}>
              Welcome to
            </Text>
            <img src={Logo} alt="logo" style={{ width: 156, height: 50 }} />
          </Flex>
          <Text ff="LeagueSpartan" fw={400} fz={24} c="#292929">
            Choose all the AI agents you need to function at your full potential
          </Text>
        </Card>
        {accessableAgents.length > 0 && <SimpleButton text="Finish Setup" onClick={handleSave} />}
      </Flex>
      <Flex dir="row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {aiAgents.map((agent) => (
          <BotSetupCard
            key={agent._id}
            agentId={agent._id}
            title={agent.agentName}
            listItems={agent.description.replace(/,\s*/g, '\n').split('\n')}
            isChecked={accessableAgents.includes(agent._id)}
            onChange={handleCheckboxChange}
            icon={<AgentIcon icon={agent.type as AgentType} type={AgentIconType.Type4} size={24} />}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default BotsSetup;