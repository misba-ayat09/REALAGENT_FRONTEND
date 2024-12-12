import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../root-store';
import { authenticationAPI } from './authenticationAPI';
import type { GenerateNewAccessTokenBody, LoginFormData, RegisterFormData } from './authenticationAPI';
import { AxiosError } from 'axios';
import { StorageKeys, clear, load, loadString, save, saveString } from '../../../utils';
import { toast } from 'sonner';
import { AuthenticationState, UpdateAuth } from './types';
import { userApi } from './userApi';

//cached global states
const cachedAuthenticationState = localStorage.getItem(StorageKeys.AUTHSTATUS) === 'true' ? true : false;

const cachedUserName =
  load<AuthenticationState>(StorageKeys.USERDATA) && load<AuthenticationState>(StorageKeys.USERDATA)?.userName
    ? (load<AuthenticationState>(StorageKeys.USERDATA)?.userName as string)
    : '';
const cachedEmail =
  load<AuthenticationState>(StorageKeys.USERDATA) && load<AuthenticationState>(StorageKeys.USERDATA)?.email
    ? (load<AuthenticationState>(StorageKeys.USERDATA)?.email as string)
    : '';
const cachedAccessToken = loadString(StorageKeys.TOKEN) ?? '';

const cachedRefreshToken = loadString(StorageKeys.REFRESH) ?? '';

const cachedUserData = load<AuthenticationState['userData']>(StorageKeys.USERAUTHDATA) ?? {};

const initialState: AuthenticationState = {
  status: 'idle',
  isAuthenticated: cachedAuthenticationState,
  isInWaitingList: false,
  userName: cachedUserName,
  email: cachedEmail,
  token: cachedAccessToken,
  refreshToken: cachedRefreshToken,
  userData: cachedUserData,
  connectedAccounts: [],
};

export const login = createAsyncThunk('authentication/login', async (formData: LoginFormData, thunkAPI) => {
  try {
    const response = await authenticationAPI.login(formData);
    return response?.result;
  } catch (error: unknown) {
    return thunkAPI?.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const register = createAsyncThunk('authentication/register', async (formData: RegisterFormData, thunkAPI) => {
  try {
    const response = await authenticationAPI.register(formData);
    return response?.result;
  } catch (error: unknown) {
    console.log(error);
    return thunkAPI?.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const generateAccessToken = createAsyncThunk(
  'authentication/generateAccessToken',
  async (body: GenerateNewAccessTokenBody, thunkAPI) => {
    try {
      const response = await authenticationAPI.generateAccessToken(body);
      return response;
    } catch (error: unknown) {
      return thunkAPI?.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const getUserData = createAsyncThunk('authentication/getUserData', async (_: void, thunkAPI) => {
  try {
    const response = await userApi.fetchUserInfo();
    return response?.result;
  } catch (error: unknown) {
    return thunkAPI?.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const getConnectedAccounts = createAsyncThunk(
  'authentication/getConnectedAccounts',
  async (_: void, thunkAPI) => {
    try {
      const response = await userApi.getConnectedAccounts();
      return response?.result;
    } catch (error: unknown) {
      return thunkAPI?.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    // loadFromStorage: (state) => {
    //   const useData = load<AuthenticationState>(StorageKeys.USERDATA);
    //   const authStatus = load<string>(StorageKeys.AUTHSTATUS);
    //   if (useData && authStatus === "true") {
    //     state.isAuthenticated = true
    //     state.username = useData.username;
    //     state.email = useData.email;
    //     // storing authentication status
    //   } else {
    //     state.isAuthenticated = false;
    //     clear();
    //   }
    // },
    updateAuth: (state, action: PayloadAction<UpdateAuth>) => {
      if (action.payload) {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        saveString(StorageKeys.REFRESH, action.payload.refreshToken);
        saveString(StorageKeys.TOKEN, action.payload.token);
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = '';
      state.refreshToken = '';
      clear();
      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isAuthenticated = true;
        if (action.payload) {
          state.isInWaitingList = action.payload.isInWaitingList;
          state.email = action.payload.emailId;
          save(StorageKeys.USERDATA, {
            email: action.payload.emailId,
            userId: action.payload.userId,
          });

          if (!action.payload.isInWaitingList) {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            saveString(StorageKeys.REFRESH, action.payload.refreshToken);
            saveString(StorageKeys.TOKEN, action.payload.token);
            save(StorageKeys.AUTHSTATUS, true);
          }
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(login.rejected, (state, action: any) => {
        state.status = 'failed';
        if (action?.payload?.error && action?.payload?.error?.message) {
          toast.error(action?.payload?.error?.message);
        } else {
          toast.error('something is wrong with your registration');
        }
        save(StorageKeys.AUTHSTATUS, false);
        clear();
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isAuthenticated = false;
        toast.success('registration successful');
        if (action.payload) {
          state.isInWaitingList = action.payload.isInWaitingList;
          state.email = action.payload.emailId;
          save(StorageKeys.USERDATA, {
            userId: action.payload.userId,
            email: action.payload.emailId,
          });

          if (!action.payload.isInWaitingList) {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            saveString(StorageKeys.REFRESH, action.payload.refreshToken);
            saveString(StorageKeys.TOKEN, action.payload.token);
            save(StorageKeys.AUTHSTATUS, true);
          }
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(register.rejected, (state, action: any) => {
        state.status = 'failed';
        if (action?.payload?.error && action?.payload?.error?.message) {
          toast.error(action?.payload?.error?.message);
        } else {
          toast.error('something is wrong with your registration');
        }
      })

      .addCase(generateAccessToken.fulfilled, (_state, action) => {
        if (action.payload) {
          saveString(StorageKeys.REFRESH, action.payload.refreshToken);
          saveString(StorageKeys.TOKEN, action.payload.token);
          window.location.reload();
        }
      })
      .addCase(generateAccessToken.rejected, (_state, _action) => {
        clear();
      })

      .addCase(getUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          const userData: AuthenticationState['userData'] = {
            ...state.userData,
            userId: action.payload.id ?? '',
            email: action.payload.email ?? '',
            profileId: action.payload.profile?._id ?? '',
            userName: action.payload.userName ?? '',
            firstName: action.payload.firstName ?? '',
            lastName: action.payload.lastName ?? '',
            timezone: action.payload.timezone ?? '',
            dateOfBirth: action.payload.profile?.dateOfBirth ?? '',
            subscription: action.payload.profile?.subscription ?? '',
            profilePicture: action.payload.profile?.profilePicture ?? '',
            phoneNumber: action.payload.profile?.phoneNumber ?? '',
            location: action.payload.profile?.location ?? '',
            website: action.payload.profile?.website ?? '',
            accessableAgents: action.payload.profile?.accessableAgents ?? [],
          };
          state.userData = userData;
          save(StorageKeys.USERAUTHDATA, userData);
        }
      })
      .addCase(getUserData.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(getConnectedAccounts.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(getConnectedAccounts.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          state.connectedAccounts = action.payload;
        }
      })
      .addCase(getConnectedAccounts.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          toast.error('something is wrong with fetching notification count');
        }
      });
  },
});

export const { updateAuth, logout } = authenticationSlice.actions;

export const isAuthenticated = (state: RootState) => state.authentication.isAuthenticated;
export const authStatus = (state: RootState) => state.authentication.status;

export default authenticationSlice.reducer;
