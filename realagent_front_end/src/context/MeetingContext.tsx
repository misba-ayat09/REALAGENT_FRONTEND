import React, { createContext, useCallback, useContext, useState, useRef } from 'react';
import { MeetingService } from '../api/services';
export type TranscriptionStatus = 'pending' | 'completed' | 'failed';

export interface TranscriptionResult {
  status: TranscriptionStatus;
  error?: Error;
}

export interface MeetingContextValue {
  processTranscription: (meetingId: string) => void;
  cancelTranscription: () => void;
  transcriptionStatus: TranscriptionStatus;
  transcriptionError?: Error;
}

const MeetingContext = createContext<MeetingContextValue | undefined>(undefined);

export const useMeeting = (): MeetingContextValue => {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error('useMeeting must be used within a MeetingProvider');
  }
  return context;
};

export const MeetingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transcriptionStatus, setTranscriptionStatus] = useState<TranscriptionStatus>('pending');
  const [transcriptionError, setTranscriptionError] = useState<Error | undefined>(undefined);
  const timeoutRef = useRef<number | null>(null);

  const processTranscription = useCallback((meetingId: string, retries = 3): void => {
    setTranscriptionStatus('pending');
    timeoutRef.current = setTimeout(async () => {
      try {
        await MeetingService.processTranscription(meetingId);
        setTranscriptionStatus('completed');
      } catch (error) {
        if (retries > 0) {
          processTranscription(meetingId, retries - 1);
        } else {
          setTranscriptionStatus('failed');
          setTranscriptionError(error as Error);
        }
      }
    }, 5000);
  }, []);

  const cancelTranscription = useCallback((): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setTranscriptionStatus('failed');
      setTranscriptionError(new Error('Transcription cancelled'));
    }
  }, []);

  const value: MeetingContextValue = {
    processTranscription,
    cancelTranscription,
    transcriptionStatus,
    transcriptionError,
  };

  return <MeetingContext.Provider value={value}>{children}</MeetingContext.Provider>;
};
