import { useState, useEffect } from 'react';
import { checkPercentage, isPercentage } from '../utils';

interface ScreenSizeCheckProps {
  miw?: React.CSSProperties['minWidth'];
  maw?: React.CSSProperties['maxWidth'];
  mih?: React.CSSProperties['minHeight'];
  mah?: React.CSSProperties['maxHeight'];
}

export function useScreenSizeCheck({
  miw,
  maw,
  mih,
  mah,
}: ScreenSizeCheckProps): boolean {
  const [isInRange, setIsInRange] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const widthCheck =
        (!miw || (typeof miw === 'number' && windowWidth >= miw)) &&
        (!maw || (isPercentage(maw) ? checkPercentage(maw as string, windowWidth) : (typeof maw === 'number' && windowWidth <= maw)));

      const heightCheck =
        (!mih || (typeof mih === 'number' && windowHeight >= mih)) &&
        (!mah || (isPercentage(mah) ? checkPercentage(mah as string, windowHeight) : (typeof mah === 'number' && windowHeight <= mah)));

      setIsInRange(widthCheck && heightCheck);
    };

    // Initial check
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [miw, maw, mih, mah]);

  return isInRange;
}
