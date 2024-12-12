import { useEffect } from 'react';

function usePreventZoom(scrollCheck: boolean = true, keyboardCheck: boolean = true) {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (keyboardCheck && e.ctrlKey && (e.key === '=' || e.key === '+' || e.key === '-' || e.key === '_')) {
        e.preventDefault();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (scrollCheck && e.ctrlKey) {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [scrollCheck, keyboardCheck]);
}

export default usePreventZoom;
