import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { QaChatBotHistoryAPI } from './api';
import { QaChatBotHistoryFormData } from './types';

export const getQaChatBotHistory = createAsyncThunk('qaChatBot/getQaChatBotHistory', async (_: void, thunkAPI) => {
  try {
    const response = await QaChatBotHistoryAPI.getQaChatBotHistory();
    return response;
  } catch (error: unknown) {
    // if(isErrorAlertPermitted){
    //   toast.error("Failed to get user chat bot history");
    // }
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const addToQaChatBotHistory = createAsyncThunk(
  'qaChatBot/addToQaChatBotHistory',
  async (formData: QaChatBotHistoryFormData, thunkAPI) => {
    try {
      // debugger;
      const response = await QaChatBotHistoryAPI.addToQaChatBotHistory(formData);
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);
