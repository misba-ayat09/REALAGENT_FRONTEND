import { useEffect } from "react";

interface Props {
  onLocalStorageChange: () => void;
}

const useLocalStorageListener = ({ onLocalStorageChange }: Props): void => {
  useEffect(() => {
    const handleStorageChange = () => {
      onLocalStorageChange();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [onLocalStorageChange]);
};

export default useLocalStorageListener;
