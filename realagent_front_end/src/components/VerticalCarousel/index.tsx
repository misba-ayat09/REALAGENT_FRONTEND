import React, { useState, useEffect, useCallback, ReactNode } from "react";
import styles from "./VerticalCarousel.module.css";
import { cx } from "../../helper";
import { randomId } from "@mantine/hooks";

interface SlideType {
  key?: string | number;
  content: ReactNode;
}

interface SlideProps {
  content: ReactNode;
  position: number;
  isActive: boolean;
}

const Slide: React.FC<SlideProps> = ({ content, position, isActive }) => {
  const slideClass = cx(styles.slide, {
    [styles.slideActive]: isActive,
    [styles.slideInactive]: !isActive,
  });

  const style: React.CSSProperties = {
    top: `${30 + position * 10}%`,
    zIndex: 3 - Math.abs(position),
  };

  return (
    <div className={slideClass} style={style}>
      {typeof content === "string" ? <div>{content}</div> : content}
    </div>
  );
};

interface VerticalCarouselProps {
  slides: SlideType[];
  autoPlay?: boolean;
  autoPlayDelay?: number;
}

export const VerticalCarousel: React.FC<VerticalCarouselProps> = ({
  slides,
  autoPlay = false,
  autoPlayDelay = 2000,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const moveSlide = useCallback(
    (direction: number) => {
      setActiveIndex(
        (prevIndex) => (prevIndex + direction + slides?.length) % slides?.length
      );
    },
    [slides?.length]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") moveSlide(-1);
      if (event.key === "ArrowDown") moveSlide(1);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [moveSlide]);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      moveSlide(1);
    }, autoPlayDelay);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayDelay, moveSlide]);

  const getVisibleSlides = (): (SlideType & {
    position: number;
    isActive: boolean;
  })[] => {
    const visibleSlides = [];
    for (let i = 0; i <= 1; i++) {
      // Only show the active slide and the one below it
      const index = (activeIndex + i + slides?.length) % slides?.length;
      visibleSlides.push({
        ...slides[index],
        position: i,
        isActive: i === 0,
      });
    }
    return visibleSlides;
  };

  return (
    <div className={styles.wrapper}>
      {getVisibleSlides().map((slide) => (
        <Slide
          key={randomId()}
          content={slide.content}
          position={slide.position}
          isActive={slide.isActive}
        />
      ))}
    </div>
  );
};
