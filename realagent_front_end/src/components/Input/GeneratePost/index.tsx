import { Card, Flex, Input, Text } from '@mantine/core';
import classes from './Input.module.css';
import { useAppDispatch } from '../../../store';
import { useState } from 'react';
import { AddSocialMediaContentFormData, socalMediaContentAPI, } from '../../../store/features/socialMediaAgent/social-media-content/socialMediaContentAPI';
import { useLoadingState } from '../../../hooks';
import { getAllSocialMediaContent } from '../../../store/features/socialMediaAgent/social-media-content/socialMediaContentSlice';
import SimpleButton from '../../Button/SimpleButton';

interface GeneratePostProps {
  onClick?: () => HashChangeEvent;
}

const GeneratePost: React.FC<GeneratePostProps> = () => {
  const dispatch = useAppDispatch();
  const [isLoading, startLoading, finishLoading] = useLoadingState();

  const [formData, setFormData] = useState<AddSocialMediaContentFormData>({
    prompt: '',
    wordCount: 30,
    contentCount: 3,
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validatePrompt = (prompt: string): boolean => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt || trimmedPrompt.length === 0) {
      setErrorMessage('Prompt cannot be empty.');
      return false;
    }

    if (trimmedPrompt.length < 5) {
      setErrorMessage('Prompt must be at least 5 characters long.');
      return false;
    }

    const words = trimmedPrompt.split(/\s+/);
    const uniqueWords = new Set(words);
    if (uniqueWords.size === 1 && words.length > 2) {
      setErrorMessage('Prompt contains excessive repetition of the same word.');
      return false;
    }

    if (/^[a-zA-Z0-9\s]*$/.test(trimmedPrompt)) {
      const alphanumericCount = (trimmedPrompt.match(/[a-zA-Z0-9]/g) || []).length;
      const totalLength = trimmedPrompt.length;
      const numericCount = (trimmedPrompt.match(/[0-9]/g) || []).length;
      if (alphanumericCount / totalLength > 0.6 || numericCount / totalLength > 0.5) {
        setErrorMessage('Prompt contains gibberish or random characters.');
        return false;
      }
    }

    const repeatedChars = /(.)\1{2,}/g;
    if (repeatedChars.test(trimmedPrompt)) {
      setErrorMessage('Prompt seems to be meaningless or repetitive.');
      return false;
    }

    const symbols = /[!@#$%^&*(),.?":{}|<>]/g;
    const symbolCount = (trimmedPrompt.match(symbols) || []).length;
    const punctuationCount = trimmedPrompt.replace(/[a-zA-Z0-9\s]/g, '').length;

    if (symbolCount > 0.5 * trimmedPrompt.length || punctuationCount > 0.5 * trimmedPrompt.length) {
      setErrorMessage('Prompt contains excessive punctuation or symbols.');
      return false;
    }

    const keywords = ['buy', 'now', 'discount', 'sale', 'offer', 'cheap', 'free'];
    if (keywords.some(keyword => trimmedPrompt.toLowerCase().includes(keyword))) {
      setErrorMessage('Prompt contains irrelevant promotional or sales-related keywords.');
      return false;
    }

    if (/^\d+$/.test(trimmedPrompt)) {
      setErrorMessage('Prompt cannot consist solely of numbers.');
      return false;
    }

    const meaningfulWordsPattern = /[a-zA-Z]{3,}/g;
    if (!meaningfulWordsPattern.test(trimmedPrompt)) {
      setErrorMessage('Prompt must contain at least some meaningful words.');
      return false;
    }

    const randomStringPattern = /([bcdfghjklmnpqrstvwxyz]{2,})([aeiou]{2,})/i;
    if (randomStringPattern.test(trimmedPrompt)) {
      setErrorMessage('Prompt appears to be a random sequence of letters.');
      return false;
    }

    const spamPatterns = ['http://', 'https://', 'www.', 'bit.ly', 'facebook.com', 'twitter.com'];
    if (spamPatterns.some(pattern => trimmedPrompt.toLowerCase().includes(pattern))) {
      setErrorMessage('Prompt contains URL or social media links.');
      return false;
    }

    if (/^[a-zA-Z0-9]*$/.test(trimmedPrompt) && trimmedPrompt === trimmedPrompt.toUpperCase()) {
      setErrorMessage('Prompt appears to be randomly mixed case or gibberish.');
      return false;
    }

    const excessiveNumbersPattern = /\d{6,}/g;
    if (excessiveNumbersPattern.test(trimmedPrompt)) {
      setErrorMessage('Prompt contains excessive numbers.');
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  const handleClick = async () => {
    if (!validatePrompt(formData.prompt)) {
      return;
    }

    try {
      startLoading();
      await socalMediaContentAPI.AddSocialMediaContent(formData);
    } catch (error: unknown) {
      //
    } finally {
      dispatch(
        getAllSocialMediaContent({
          page: 1,
          limit: 20,
          sortOrder: 'desc',
          isApproved: false,
        }),
      );
      finishLoading();
      setFormData({
        ...formData,
        prompt: '',
      });
    }
  };

  return (
    <Card p={'16px'} w={'100%'} bg={'#FFFFFF'} radius={'15px'}>
      <Flex justify={'space-between'} align={'center'} w={'100%'} gap={'16px'}>
        <div style={{ width: '100%' }}>
          <Input
            disabled={isLoading}
            classNames={classes}
            w={'100%'}
            placeholder="Enter Prompt to Generate Post"
            name="prompt"
            value={formData.prompt}
            onChange={(e) => setFormData((prev) => ({ ...prev, prompt: e.target.value }))}
          />
          {errorMessage && (
            <Text color="red" size="sm" mt="4px">
              {errorMessage}
            </Text>
          )}
        </div>
        <SimpleButton
          px={'22px'}
          text="Generate Post"
          loading={isLoading}
          onClick={handleClick}
          h={40}
        />
      </Flex>
    </Card>
  );
};

export default GeneratePost;
