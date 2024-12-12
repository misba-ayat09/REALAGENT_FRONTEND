import React, { useState, useRef, useEffect } from 'react';
import { Button, Flex, Text } from '@mantine/core';
import styles from './voiceFileCard.module.css';
import cx from 'classnames';
import { IconType } from '../../common/Icons';
import { Icon } from '../../common/Icons/Icon';
import {  useAppDispatch } from '../../../store';
import { getVoices } from '../../../store/features/ReceptionistAgent';

interface VoiceFileCardProps {
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  url?: string;
  voiceId: string;
  isSelected: boolean;
  onSelectVoice: (voiceId: string) => void;
}

const VoiceFileCard: React.FC<VoiceFileCardProps> = ({
  className,
  style,
  name,
  url,
  voiceId,
  isSelected,
  onSelectVoice,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVoices());
  }, [dispatch]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleButtonClick = () => {
    onSelectVoice(voiceId);
    if (!isPlaying) {
      togglePlayPause();
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  return (
    <Flex className={cx(styles.card, className)} align="center" justify="space-between" style={style} gap={'10px'}>
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={togglePlayPause}>
        <Icon icon={isPlaying ? IconType.Pause1 : IconType.Play} style={{ width: '32px', height: '32px' }} />
      </div>

      {url && (
        <audio ref={audioRef} src={url} onEnded={() => setIsPlaying(false)} />
      )}

      <Flex className={styles.group}>
        <Text className={styles.fileName} truncate>
          {name}
        </Text>
      </Flex>

      {isSelected ? (
        <Text style={{ cursor: 'pointer', color: '#007BFF', fontSize: '16px', fontWeight: '500' }}>
          Currently Using
        </Text>
      ) : (
        <Button
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '60px',
            height: '27px',
            borderRadius: '42px',
          }}
          onClick={handleButtonClick}>
          Use
        </Button>
      )}
    </Flex>
  );
};

export default VoiceFileCard;
