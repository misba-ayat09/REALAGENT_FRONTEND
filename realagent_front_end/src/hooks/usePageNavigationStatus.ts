import { useState, useEffect } from "react";

const usePageNavigationStatus = () => {
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(true);

    const handleNavigationEnd = () => {
      setIsNavigating(false);
    };

    window.addEventListener("popstate", handleNavigationEnd);

    return () => {
      window.removeEventListener("popstate", handleNavigationEnd);
    };
  }, []);

  return isNavigating;
};

export default usePageNavigationStatus;
