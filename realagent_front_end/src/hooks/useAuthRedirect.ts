import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store';
import { getEndpointTypes } from '../helper';

interface UseAuthRedirectOptions {
  redirectPath?: string;
  customConditions?: () => boolean;
}

const useAuthRedirect = ({
  redirectPath = '/',
  customConditions = () => true,
}: UseAuthRedirectOptions = {}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);

  // Get endpoint types
  const { isAuthEndpoint, isProtectedEndpoint } = useMemo(
    () => getEndpointTypes(location.pathname),
    [location.pathname],
  );

  // Memoize the calculation of undefined routes
  // const isUndefinedRoute = useMemo(() => {
  //   const allEndpoints = [...AUTH_ENDPOINTS, ...PROTECTED_ENDPOINTS, ...PUBLIC_ENDPOINTS];
  //   return !allEndpoints.includes(location.pathname) && !PATH_WEBSITE.isMeetRoute(location.pathname);
  // }, [location.pathname]);

  // const resetTimeout = useCallback(() => {
  //   if (timeoutRef.current) {
  //     clearTimeout(timeoutRef.current);
  //     timeoutRef.current = null;
  //   }
  // }, []);

  // const startInactivityTimer = useCallback(() => {
  //   resetTimeout();
  //   timeoutRef.current = window.setTimeout(() => {
  //     navigate(redirectPath);
  //   }, inactivityTimeout);
  // }, [resetTimeout, location.pathname, redirectPath, navigate, inactivityTimeout]);

  // const debounceReset = useCallback(() => {
  //   if (debounceRef.current) {
  //     clearTimeout(debounceRef.current);
  //   }
  //   debounceRef.current = window.setTimeout(() => {
  //     resetTimeout();
  //     startInactivityTimer();
  //   }, 200); // 200ms debounce delay
  // }, [resetTimeout, startInactivityTimer]);

  // useEffect(() => {
  //   if (customConditions() && isUndefinedRoute) {
  //     startInactivityTimer();
  //   }

  //   return () => resetTimeout();
  // }, [customConditions, isUndefinedRoute, startInactivityTimer, resetTimeout]);

  // useEffect(() => {
  //   if (!isUndefinedRoute) return;

  //   // Listen to user activity and debounce the reset timer
  //   const resetTimerOnActivity = () => debounceReset();

  //   window.addEventListener('mousemove', resetTimerOnActivity);
  //   window.addEventListener('keydown', resetTimerOnActivity);

  //   return () => {
  //     window.removeEventListener('mousemove', resetTimerOnActivity);
  //     window.removeEventListener('keydown', resetTimerOnActivity);
  //   };
  // }, [isUndefinedRoute, debounceReset]);

  useEffect(() => {
    if (customConditions()) {
      if (isAuthEndpoint && isAuthenticated) {
        navigate(redirectPath);
        return;
      }

      if (isProtectedEndpoint && !isAuthenticated) {
        navigate(redirectPath);
        return;
      }
    }
  }, [customConditions, isAuthEndpoint, isProtectedEndpoint, isAuthenticated, redirectPath, navigate]);

  return isAuthenticated;
};

export default useAuthRedirect;
