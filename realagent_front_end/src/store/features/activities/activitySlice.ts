import { createSlice } from '@reduxjs/toolkit';
import { ActivityState } from './types';
import { createFulfilledHandler, createPendingHandler, createRejectedHandler } from '../../root-store';
import ActivityThunks from './thunks';
import { ApiCallStatus } from '../../../services';

const initialState: ActivityState = {
  status: ApiCallStatus.Idle,
  activities: {
    currentPage: 0,
    totalPages: 1,
    totalItems: 0,
    list: [],
  },
};

export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ActivityThunks.findActivities.pending, createPendingHandler())
      .addCase(
        ActivityThunks.findActivities.fulfilled,
        createFulfilledHandler(undefined, (state, action) => {
          if (action.payload) {
            const data = action.payload.result.list;

            const existingIds = new Set(state.activities.list.map((item) => item._id));
            const newItems = data.filter((item) => !existingIds.has(item._id));

            state.status = ApiCallStatus.Idle;
            state.activities = {
              ...state.activities,
              list: [...state.activities.list, ...newItems],
              currentPage: action.payload?.result.page,
              totalItems: action.payload?.result.total,
              totalPages: Math.ceil(action.payload?.result.total / 20),
            };
          }

          state.status = ApiCallStatus.Idle;
        }),
      )
      .addCase(ActivityThunks.findActivities.rejected, createRejectedHandler('Failed to retrieve activities'));
  },
});

export default activitySlice.reducer;
