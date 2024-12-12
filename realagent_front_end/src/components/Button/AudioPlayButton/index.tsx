import React, { useEffect, useState, useCallback, useRef } from "react";
import { ActionIcon, Tooltip, rem, Loader } from "@mantine/core";
import {
  IconVolume,
  IconPlayerStop,
  IconAlertCircle,
} from "@tabler/icons-react";
import { useLoadingState } from "../../../hooks";

interface AudioPlayButtonProps {
  initialPlaying?: boolean;
  tooltipPosition?: "top" | "right" | "bottom" | "left";
  iconSize?: number;
  playingColor?: string;
  defaultColor?: string;
  fetchAudio: () => Promise<string | null>;
}

const AudioPlayButton: React.FC<AudioPlayButtonProps> = ({
  initialPlaying = false,
  tooltipPosition = "bottom",
  iconSize = 16,
  playingColor = "black",
  defaultColor = "black",
  fetchAudio,
}) => {
  const [playing, setPlaying] = useState(initialPlaying);
  const [isLoading, startLoading, finishLoading] = useLoadingState();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = useCallback(async () => {
    if (!audioUrl) {
      startLoading();
      try {
        const url = await fetchAudio();
        if (url) {
          setAudioUrl(url);
          setError(null); // Clear any previous errors
        } else {
          throw new Error("Audio URL is null");
        }
      } catch (error) {
        console.error("Failed to load audio:", error);
        setError("Failed to load audio");
      } finally {
        finishLoading();
      }
    }
    setPlaying((prev) => !prev);
  }, [audioUrl, fetchAudio, startLoading, finishLoading]);

  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      const handleAudioEnd = () => setPlaying(false);
      audio.addEventListener("ended", handleAudioEnd);

      return () => {
        audio.pause();
        audio.removeEventListener("ended", handleAudioEnd);
        audioRef.current = null;
      };
    }
  }, [audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      playing ? audio.play() : audio.pause();
    }
  }, [playing]);

  const renderIcon = () => {
    if (isLoading) {
      return <Loader size={rem(iconSize)} />;
    }
    if (error) {
      return <IconAlertCircle style={{ width: rem(iconSize), color: "red" }} />;
    }
    return playing ? (
      <IconPlayerStop style={{ width: rem(iconSize), color: "#FFFFFF" }} />
    ) : (
      <IconVolume style={{ width: rem(iconSize), color: "#FFFFFF" }} />
    );
  };

  return (
    <Tooltip
      label={error || (playing ? "Stop" : isLoading ? "Loading..." : "Play")}
      withArrow
      position={tooltipPosition}
    >
      <ActionIcon
        variant="subtle"
        onClick={togglePlay}
        disabled={isLoading}
        size={rem(34)}
        bg={playing && !error ? playingColor : defaultColor}
        radius={"xl"}
      >
        {renderIcon()}
      </ActionIcon>
    </Tooltip>
  );
};

export default AudioPlayButton;
