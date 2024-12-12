import { createSlice } from '@reduxjs/toolkit';
import { MeetState } from './types';
import { createFulfilledHandler, createPendingHandler, createRejectedHandler } from '../../root-store';
import MeetingThunks from './thunks';
import { ApiCallStatus } from '../../../services';
import { updateMeetingList } from './helper';

const initialState: MeetState = {
  status: ApiCallStatus.Idle,
  pastMeetings: {
    page: 1,
    limit: 10,
    total: 0,
    list: [],
  },
  upcomingMeetings: {
    page: 1,
    limit: 10,
    total: 0,
    list: [],
  },
};

export const meetingSlice = createSlice({
  name: 'Meeting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(MeetingThunks.create.pending, createPendingHandler())
      .addCase(MeetingThunks.create.fulfilled, createFulfilledHandler('Meeting created successfully'))
      .addCase(MeetingThunks.create.rejected, createRejectedHandler('Failed to create Meeting'))

      .addCase(MeetingThunks.findPast.pending, createPendingHandler())
      .addCase(
        MeetingThunks.findPast.fulfilled,
        createFulfilledHandler(undefined, (state, action) => {
          if (action.payload) {
            const data = action.payload.result;

            state.pastMeetings = {
              page: data.page,
              limit: data.limit,
              total: data.total,
              list: updateMeetingList(state.pastMeetings.list, data.list),
            };
          }

          state.status = ApiCallStatus.Idle;
        }),
      )
      .addCase(MeetingThunks.findPast.rejected, createRejectedHandler('Failed to retrieve past meetings'))

      .addCase(MeetingThunks.findUpcoming.pending, createPendingHandler())
      .addCase(
        MeetingThunks.findUpcoming.fulfilled,
        createFulfilledHandler(undefined, (state, action) => {
          if (action.payload) {
            const data = action.payload.result;

            state.upcomingMeetings = {
              page: data.page,
              limit: data.limit,
              total: data.total,
              list: updateMeetingList(state.upcomingMeetings.list, data.list),
            };
          }

          state.status = ApiCallStatus.Idle;
        }),
      )
      .addCase(MeetingThunks.findUpcoming.rejected, createRejectedHandler('Failed to retrieve upcoming meetings'))

      .addCase(MeetingThunks.update.pending, createPendingHandler())
      .addCase(
        MeetingThunks.update.fulfilled,
        createFulfilledHandler('Meeting updated successfully', (state, action) => {
          if (action.payload) {
            const updatedMeeting = action.payload.result;

            const upcomingMeetingIndex = state.upcomingMeetings.list.findIndex(
              (meeting) => meeting._id === updatedMeeting._id,
            );
            if (upcomingMeetingIndex !== -1) {
              state.upcomingMeetings.list[upcomingMeetingIndex] = updatedMeeting;
            }

            const pastMeetingIndex = state.pastMeetings.list.findIndex((meeting) => meeting._id === updatedMeeting._id);
            if (pastMeetingIndex !== -1) {
              state.pastMeetings.list[pastMeetingIndex] = updatedMeeting;
            }
          }

          state.status = ApiCallStatus.Idle;
        }),
      )
      .addCase(MeetingThunks.update.rejected, createRejectedHandler('Failed to update meetings'))

      .addCase(MeetingThunks.remove.pending, createPendingHandler())
      .addCase(
        MeetingThunks.remove.fulfilled,
        createFulfilledHandler('Meeting removed successfully', (state, action) => {
          if (action.payload) {
            const data = action.payload.result;

            state.upcomingMeetings.list = state.upcomingMeetings.list.filter((meeting) => meeting._id !== data._id);

            state.pastMeetings.list = state.pastMeetings.list.filter((meeting) => meeting._id !== data._id);
          }

          state.status = ApiCallStatus.Idle;
        }),
      )
      .addCase(MeetingThunks.remove.rejected, createRejectedHandler('Failed to remove meeting'));
  },
});

export default meetingSlice.reducer;
