import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ApiCallStatus } from '../../../services';
import { DashboardAgentState, dashboardAgentAPI, DashboardDataType } from './dashBoardAgentAPI';
import { AxiosError } from 'axios';

const initialState: DashboardAgentState = {
  status: ApiCallStatus.Idle,
  result: [],
  currentPage: 0,
  totalPages: 1,
  totalItems: 0,
};

export const getallDashboardAgent = createAsyncThunk(
  'dashboardAgent/getallDashboardAgent',
  async (queryParameters: { page: number; limit: number; sortOrder: string }, thunkAPI) => {
    try {
      const response = await dashboardAgentAPI.getAllDashboardAgent(
        queryParameters.page,
        queryParameters.limit,
        queryParameters.sortOrder,
      );
      if (!response) {
        throw new Error('API response is undefined');
      }
      return {
        result: response.list,
        currentPage: response.page,
        totalItems: response.total,
      };
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const dashboardAgentSlice = createSlice({
  name: 'dashboardAgent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getallDashboardAgent.pending, (state) => {
        state.status = ApiCallStatus.Loading;
      })
      .addCase(
        getallDashboardAgent.fulfilled,
        (
          state,
          action: PayloadAction<{
            result: DashboardDataType[];
            currentPage: number;
            totalItems: number;
          }>,
        ) => {
          const existingIds = new Set(state.result.map((item) => item._id));
          const newItems = action.payload.result.filter((item) => !existingIds.has(item._id));

          state.status = ApiCallStatus.Idle;
          state.result = [...state.result, ...newItems];
          state.currentPage = action.payload.currentPage;
          state.totalItems = action.payload.totalItems;
          state.totalPages = Math.ceil(action.payload.totalItems / 20);
        },
      )
      .addCase(getallDashboardAgent.rejected, (state) => {
        state.status = ApiCallStatus.Failed;
      });
  },
});

export default dashboardAgentSlice.reducer;
