import { useState, useEffect } from "react";

interface UseHydrationProps {
  onHydration?: () => void;
}

const useHydration = ({ onHydration }: UseHydrationProps = {}): boolean => {
  const [isHydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!isHydrated) {
      setHydrated(true);
      if (onHydration) {
        onHydration();
      }
    }
  }, [isHydrated, onHydration]);

  return isHydrated;
};

export default useHydration;
