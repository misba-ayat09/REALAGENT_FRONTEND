/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { HeaderNav, TopicCard } from '../../../components';
import { Flex, Input, Text, Button, Notification, Divider, Paper, Checkbox } from '@mantine/core';
import classes from './Favourite.module.css';
import {
  getResearchAgentTopics,
  removeResearchAgentLink,
  researchAgentAPI,
} from '../../../store/features/researchAgent';
import { useAppDispatch, useAppSelector } from '../../../store';
import { useLoadingState } from '../../../hooks';
import { ResearchService } from '../../../api/services';

const SettingsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, startLoading, finishLoading] = useLoadingState();
  const [input, setInput] = useState<string>('');
  const topics = useAppSelector((state) => state.researchAgent.topics);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getResearchAgentTopics());
  }, []);
  const handleAddLink = async () => {
    try {
      startLoading();
      if (selectedTopics.length === 0) {
        setError('Please select at least one topic.');
        return;
      }
      if (topics.length + selectedTopics.length > 5) {
        setError('You can only add up to 5 topics.');
        setInput('');
        return;
      }
      for (const topic of selectedTopics) {
        if (topics.some((t) => t.topic === topic)) {
          setError(`"${topic}" is already added.`);
          continue;
        }
        const isRealEstate_Related = await ResearchService.checkRealEstate(topic);
        if (!isRealEstate_Related) {
          setError(`"${topic}" is not real estate related.`);
          continue;
        }
        await researchAgentAPI.addResearchAgentLink({ topic });
      }
      await dispatch(getResearchAgentTopics());
      setSelectedTopics([]);
      setInput('');
      setError(null);
    } catch (error) {
      console.error(error);
      setError('An error occurred while adding topics.');
    } finally {
      finishLoading();
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      handleAddLink();
    }
  };

  const handleRemoveLink = async (linkId: string) => {
    try {
      await dispatch(removeResearchAgentLink(linkId));
      await dispatch(getResearchAgentTopics());
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = (label: string) => {
    setSelectedTopics((prevSelectedTopics) => {
      let updatedTopics;
      if (prevSelectedTopics.includes(label)) {
        updatedTopics = prevSelectedTopics.filter((topic) => topic !== label);
      } else {
        updatedTopics = [...prevSelectedTopics, label];
      }
      setInput(updatedTopics.join(', '));
      return updatedTopics;
    });
  };

  const allTopics = [
    'Local housing market trends',
    'Neighborhood comparisons',
    'Economic indicators affecting real estate',
    'Seasonal market fluctuations',
    'Commercial real estate trends',
    'Off-market opportunities',
    'Investment property analysis',
    "First-time homebuyer's guide",
    'Landlord-tenant laws',
    'Financing options (mortgages, pre-approval)',
    'Property taxes and assessments',
    'Quality of life factors',
    'Zoning regulations and restrictions',
    'Homeowners association (HOA) rules and regulations',
    'Tax deductions for homeowners',
    'Inheritance and probate issues',
    'Legal implications of home sales',
    'Avoiding common real estate scams',
    'Demographic shifts and their impact on the real estate market',
    'Impact of natural disasters on the real estate market',
    'Government policies affecting the real estate market',
    'Tips for buying a vacation home',
    'Impact of climate change on the real estate market',
    'Tips for buying a second home',
    'Tips for buying a first home',
    'Tips for buying a condo',
    'Tips for buying a townhouse',
    'Tips for buying a new construction home',
    'Tips for buying a fixer-upper',
    'Home maintenance checklist',
    'Tips for selling your home in a competitive market',
  ];
  const popularTopics = [
    'Local housing market trends',
    'Neighborhood comparisons',
    'Economic indicators affecting real estate',
    'Seasonal market fluctuations',
    'Commercial real estate trends',
    'Off-market opportunities',
    'Investment property analysis',
    "First-time homebuyer's guide",
    'Landlord-tenant laws',
    'Financing options (mortgages, pre-approval)',
  ];

  return (
    <Flex direction={'column'} bg={'#FFFFFF'} mih={'100vh'}>
      <HeaderNav
        title="Research Agent"
        discription="Get ahead of the curve by following the latest industry news and trends."
        height={90}
      />
      <Flex w={'100%'}>
        <Flex px="lg" className={classes['settings-section']} gap={'15px'}>
          <Text size="14px" fw={400}>
            Please list the Research areas our AI research agent should focus on.
          </Text>
          <Flex direction={'column'} gap={'15px'}>
            <Flex direction={'row'} gap={'5px'}>
              <Input
                type="text"
                placeholder="#topics"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                w={'100%'}
                classNames={{ input: classes.input }}
              />
              <Button loading={isLoading} className={classes.button} onClick={handleAddLink}>
                Add
              </Button>
            </Flex>
            {error && (
              <Notification color="red" onClose={() => setError(null)}>
                {error}
              </Notification>
            )}

            <Text size="16px" fw={400}>
              List the research areas our AI research agent should focus on
            </Text>
            {topics?.map((topic) => (
              <TopicCard key={topic._id} topic={topic.topic} onRemove={() => handleRemoveLink(topic._id)} />
            ))}
          </Flex>
        </Flex>
        <Paper>
          <Divider pb={16} c={'#DCE5EA'} size={'2px'} orientation="vertical" style={{ minHeight: '2100px' }} />
        </Paper>
        <Flex
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          gap={'15px'}
          px="md">
          <Flex
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
            gap={'15px'}
            px="md">
            <Text style={{ fontSize: '16px', fontWeight: 600 }}>Popular Topics</Text>
            {popularTopics.map((label, index) => (
              <Flex style={{ display: 'flex', gap: '10px' }} key={index}>
                <Checkbox
                  styles={{
                    input: {
                      borderColor: '#007BFF',
                    },
                    root: {
                      marginTop: '5px',
                    },
                  }}
                  checked={selectedTopics.includes(label)}
                  onChange={() => handleCheckboxChange(label)}
                />
                <Text>{label}</Text>
              </Flex>
            ))}
          </Flex>
          <Flex
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
            gap={'15px'}
            px="md">
            <Text style={{ fontSize: '16px', fontWeight: 600 }}>All Topics</Text>
            {allTopics.map((label, index) => (
              <Flex style={{ display: 'flex', gap: '5px' }} key={index}>
                <Checkbox
                  styles={{
                    input: {
                      borderColor: '#007BFF',
                    },
                    root: {
                      marginTop: '5px',
                    },
                  }}
                  checked={selectedTopics.includes(label)}
                  onChange={() => handleCheckboxChange(label)}
                />
                <Text style={{ fontSize: '16px', fontWeight: 400 }}>{label}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SettingsScreen;
