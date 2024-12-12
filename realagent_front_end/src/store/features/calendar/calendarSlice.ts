import { createSlice } from '@reduxjs/toolkit';
import { CalendarState } from './types';
import { getCalendarEvents, addEventToCalendar, removeEventToCalendar, updateEventInCalendar } from './thunks';
import { ApiCallStatus } from '../../../services';

const initialState: CalendarState = {
  status: ApiCallStatus.Idle,
  calendarData: [],
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // getCalendarEvents
      .addCase(getCalendarEvents.pending, (state) => ({
        ...state,
        status: ApiCallStatus.Loading,
      }))
      .addCase(getCalendarEvents.fulfilled, (state, action) => ({
        ...state,
        status: ApiCallStatus.Idle,
        calendarData: action.payload?.result ?? [],
      }))
      .addCase(getCalendarEvents.rejected, (state) => ({
        ...state,
        status: ApiCallStatus.Failed,
      }))

      // removeEventToCalendar
      .addCase(removeEventToCalendar.pending, (state) => ({
        ...state,
        status: ApiCallStatus.Loading,
      }))
      .addCase(removeEventToCalendar.fulfilled, (state, action) => ({
        ...state,
        status: ApiCallStatus.Idle,
        calendarData: state.calendarData?.filter(
          (item) => item.id !== action.payload.id, // Use the returned event ID to filter
        ),
      }))

      .addCase(removeEventToCalendar.rejected, (state) => ({
        ...state,
        status: ApiCallStatus.Failed,
      }))

      // updateEventInCalendar
      .addCase(updateEventInCalendar.pending, (state) => ({
        ...state,
        status: ApiCallStatus.Loading,
      }))
      // .addCase(updateEventInCalendar.fulfilled, (state, action) => ({
      //   ...state,
      //   status: ApiCallStatus.Idle,
      //   calendarData: state.calendarData.map((item) =>
      //     item.id === action.payload?.result.id ? action.payload.result : item,
      //   ),
      // }))
      .addCase(updateEventInCalendar.rejected, (state) => ({
        ...state,
        status: ApiCallStatus.Failed,
      }))

      // addEventToCalendar
      .addCase(addEventToCalendar.pending, (state) => ({
        ...state,
        status: ApiCallStatus.Loading,
      }))
      // .addCase(addEventToCalendar.fulfilled, (state, action) => ({
      //   ...state,
      //   status: ApiCallStatus.Idle,
      //   calendarData: action.payload?.result
      //     ? [...(state.calendarData ?? []), action.payload?.result]
      //     : state.calendarData,
      // }))
      .addCase(addEventToCalendar.rejected, (state) => ({
        ...state,
        status: ApiCallStatus.Failed,
      }));
  },
});

export default calendarSlice.reducer;
