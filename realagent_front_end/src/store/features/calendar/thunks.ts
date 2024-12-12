import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { calendarAPI } from './api';
import { CalendarEventFormData } from './types';

export const getCalendarEvents = createAsyncThunk('calendar/getCalendarEvents', async (_: void, thunkAPI) => {
  try {
    const response = await calendarAPI.getCalendarEvents();
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const removeEventToCalendar = createAsyncThunk(
  'calendar/removeEventToCalendar',
  async (id: string, thunkAPI) => {
    try {
       await calendarAPI.removeEventToCalendar(id);

      // Ensure you're returning some meaningful data here
      return { id }; // Return the deleted event ID or a success message
    } catch (error: unknown) {
      // Handle the error properly
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);
export const updateEventInCalendar = createAsyncThunk(
  'calendar/updateEventInCalendar',
  async ({ id, formData }: { id: string; formData: CalendarEventFormData }, thunkAPI) => {
    try {
      const response = await calendarAPI.updateEventInCalendar(id, formData);
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);
export const addEventToCalendar = createAsyncThunk(
  'calendar/addEventToCalendar',
  async (formData: CalendarEventFormData, thunkAPI) => {
    try {
      const response = await calendarAPI.addEventToCalendar(formData);
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);
