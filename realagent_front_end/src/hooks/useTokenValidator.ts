import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { logout, updateAuth } from '../store/features/authentication';
import { loadString, StorageKeys, clear } from '../utils';
import { JwtValidator } from '../utils/JwtValidator';
import AuthService from '../api/services/AuthService';
import { useNavigate } from 'react-router-dom';

const TOKEN_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

const useTokenValidator = (interval = TOKEN_CHECK_INTERVAL) => {
  // console.table({
  //   interval,
  //   isAuthenticated: useAppSelector((state) => state.authentication.isAuthenticated),
  // });
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);
  const navigate = useNavigate();

  // Memoize the tokens so they aren't repeatedly fetched
  const tokens = useMemo(() => {
    const jwtToken = loadString(StorageKeys.TOKEN) || null;
    const refreshToken = loadString(StorageKeys.REFRESH) || null;
    return {
      jwtToken,
      refreshToken,
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !tokens.jwtToken || !tokens.refreshToken) {
      return; // No need to validate if not authenticated or tokens are missing
    }

    const validateAndRefreshToken = async () => {
      try {
        const jwtValidator = JwtValidator.getInstance();

        const isValidToken = jwtValidator.validateToken(tokens.jwtToken);
        if (isValidToken) {
          return;
        }

        if (!tokens.refreshToken) {
          throw new Error('No refresh token');
        }

        const isValidRefreshToken = jwtValidator.validateToken(tokens.refreshToken);
        if (isValidRefreshToken) {
          const refreshResponse = await AuthService.refresh({ refreshToken: tokens.refreshToken });
          const { result } = refreshResponse || {};
          if (result?.token && result?.refreshToken) {
            dispatch(
              updateAuth({
                token: result.token,
                refreshToken: result.refreshToken,
                isAuthenticated: true,
              }),
            );
            window.location.reload();
          } else {
            throw new Error('Failed to refresh token');
          }
        } else {
          throw new Error('Invalid refresh token');
        }
      } catch (error) {
        console.error('Token validation error:', (error as Error)?.message || error);
        clear();
        dispatch(logout());
        window.location.reload();
      }
    };

    validateAndRefreshToken();
    const intervalId = setInterval(validateAndRefreshToken, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [isAuthenticated, tokens.jwtToken, tokens.refreshToken, interval, dispatch, navigate]);

  return {
    isAuthenticated,
    jwtToken: tokens.jwtToken,
    refreshToken: tokens.refreshToken,
  };
};

export default useTokenValidator;
