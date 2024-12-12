import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { notificationAPI, Result } from './notificationAPI';
interface InitialState {
  status: string;
  result: Result;
}

const initialState: InitialState = {
  status: 'idle',
  result: {
    page: 1,
    limit: 20,
    total: 0,
    read: 0,
    unread: 0,
    list: [],
  },
};

export const getAllNotificationsCount = createAsyncThunk('getAllNotificationsCount', async (_, thunkAPI) => {
  try {
    const response = await notificationAPI.GetNotificationCounts();
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const getAllNotifications = createAsyncThunk(
  'getAllNotifications',
  async (
    queryParameters: {
      page: number;
      limit: number;
      read: boolean;
    },
    thunkAPI,
  ) => {
    try {
      const response = await notificationAPI.GetAllNotifications(
        queryParameters.page,
        queryParameters.limit,
        queryParameters.read,
      );
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);
export const getNotificationCounts = createAsyncThunk('getNotificationCounts', async (_, thunkAPI) => {
  try {
    const response = await notificationAPI.GetNotificationCounts();
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});
export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotifications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          state.result = action.payload.result;
        }
      })
      .addCase(getAllNotifications.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          toast.error('something is wrong with fetching notifications');
        }
      })

      .addCase(getNotificationCounts.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(getNotificationCounts.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          state.result = {
            ...state.result,
            ...action.payload.result,
          };
        }
      })
      .addCase(getNotificationCounts.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          toast.error('something is wrong with fetching notification count');
        }
      });
  },
});

export default notificationSlice.reducer;
