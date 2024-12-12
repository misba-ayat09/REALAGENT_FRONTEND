import React, { useEffect, useState } from 'react';
import { Flex, Textarea, TextInput, Group } from '@mantine/core';
import { useAppDispatch } from '../../../store';
import { toast } from 'sonner';
import { ConversationFlowService } from '../../../api/services';
import { getallContact } from '../../../store/features/AddContact/contactSlice';
import { ConversationFlowFormData } from '../../../api/types';
import { ConversationFlow } from '../../../store/features/conversationFlow/types';
import SimpleButton from '../../../components/Button/SimpleButton';
import { GenerateAiScriptRequest } from '../../../store/features/ReceptionistAgent/ReceptionistAgentAPI';
import { generateScript } from '../../../store/features/ColdCallBot/coldCallBotSlice';

interface ScheduleAutomatedCallScreenProps {
  campaignId?: string;
}
const ScheduleAutomatedCallScreen: React.FC <ScheduleAutomatedCallScreenProps>= ({ campaignId}) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(isLoading, 'isLoading');

  const messageLabels: Record<keyof ConversationFlowFormData, string> = {
    introMessage: 'Intro Message',
    collectInfo: 'Collect Information Message',
    exitFlow: 'Exit Flow Message',
    goodbye: 'Goodbye Message',
    campaign: 'Campaign',
  };

  const messageDescriptions: Record<keyof ConversationFlowFormData, string> = {
    introMessage: 'Add into message for the cold calling',
    collectInfo: 'These is message you want to convey to the customer',
    exitFlow: 'Message wil be conveyed if the customer want to end the conversation',
    goodbye: 'Ending message you want to convey to the customer',
    campaign: 'Campaign name',
  };

  const [messages, setMessages] = useState<Partial<ConversationFlow>>({});

  const formData: Partial<ConversationFlow> = {
    introMessage: messages.introMessage,
    collectInfo: messages.collectInfo,
    exitFlow: messages.exitFlow,
    goodbye: messages.goodbye,
  };

  const [scriptformData, setScriptFormData] = useState<GenerateAiScriptRequest>({
    text: '',
  });

  const handleGenerateScript = async () => {
    try {
      const response = await dispatch(generateScript(scriptformData)).unwrap();
      if (response?.script) {
        setMessages((prev) => ({
          ...prev,
          introMessage: response.script.introMessagePrompt || prev.introMessage,
          collectInfo: response.script.collectInfoPrompt || prev.collectInfo,
          exitFlow: response.script.exitFlowPrompt || prev.exitFlow,
          goodbye: response.script.goodbyePrompt || prev.goodbye,
        }));
        toast.success('Script generated successfully!');
      } else {
        toast.error('Failed to generate script');
      }
    } catch (error) {
      console.error('Error generating script:', error);
      toast.error('An error occurred while generating the script');
    }
  };

  useEffect(() => {
    dispatch(getallContact());
    (async () => {
      try {
        const ConversationFlowData = await ConversationFlowService.find();
        if (ConversationFlowData?.result) {
          setMessages((pre) => ({ ...pre, ...ConversationFlowData.result }));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  const handleScheduleCall = async () => {
    setIsLoading(true);

    try {
      if (!messages.introMessage || !messages.collectInfo || !messages.exitFlow || !messages.goodbye) {
        toast.warning('Please fill out all fields');
        return;
      }
      console.log(handleScheduleCall, 'handleScheduleCall');
      try {
        const ConversationFlowData = await ConversationFlowService[messages._id ? 'update' : 'create']({
          introMessage: messages.introMessage,
          collectInfo: messages.collectInfo,
          exitFlow: messages.exitFlow,
          goodbye: messages.goodbye,
          campaign:campaignId,
        });
        if (ConversationFlowData?.result) {
          setMessages(ConversationFlowData.result);
        }
      } catch (error) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex direction="column">
      <Flex bg="#FFFFFF" px={16} gap={10} pt={32} pb={16} className="border-radius-top" direction={'column'}>
        <h1>Configure Cold call</h1>
        <Group dir="row" gap={30} align="center" px={16}>
          <TextInput
            label="Enter all the data for cold call"
            placeholder="Enter propt to create script"
            name="text"
            w={'290px'}
            styles={{ input: { backgroundColor: '#6A6A6A1A', borderRadius: '10px', border: 'none' } }}
            value={scriptformData.text}
            onChange={(e) => setScriptFormData({ ...scriptformData, text: e.target.value })}
          />
          <SimpleButton text="Generate" mt={16} onClick={handleGenerateScript} />
        </Group>

        <Flex px={16} bg="#FFFFFF" pb={32} mt={16}>
          <Flex w="45%" direction="column" bg="#FFFFFF">
            {Object.entries(formData).map(([key, value]) => (
              <Textarea
                key={key}
                label={messageLabels[key as keyof typeof messageLabels]}
                description={messageDescriptions[key as keyof typeof messageLabels]}
                mb={16}
                value={value}
                onChange={(e) => setMessages((prev) => ({ ...prev, [key]: e.target.value }))}
                autosize
                minRows={2}
                maxRows={4}
                styles={{
                  input: {
                    backgroundColor: '#6A6A6A1A',
                    borderRadius: '10px',
                    border: 'none',
                    height: '250px',
                    padding: '20px',
                  },
                }}
              />
            ))}
            <Group dir="row" gap={16}>
              <SimpleButton text="Cancel" mt={16} bg={'#F1F1F1'} c={'#6A6A6A'} />
              <SimpleButton text="Save" mt={16} onClick={handleScheduleCall} />
            </Group>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ScheduleAutomatedCallScreen;
