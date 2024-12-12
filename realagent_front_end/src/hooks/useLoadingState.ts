import { useState, useCallback } from 'react';

type LoadingState = [boolean, () => void, () => void];

const useLoadingState = (initialValue = false): LoadingState => {
  const [isLoading, setIsLoading] = useState(initialValue);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const finishLoading = useCallback(() => setIsLoading(false), []);

  return [isLoading, startLoading, finishLoading];
};

export default useLoadingState;
