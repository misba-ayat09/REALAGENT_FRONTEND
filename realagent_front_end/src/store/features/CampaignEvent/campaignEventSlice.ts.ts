import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { AddCampaignEventFormdata, campaignEventAPI, result } from './campaignEventAPI.ts';

interface InitialState {
  status: string;
  result: result;
}

const initialState: InitialState = {
  status: 'idle',
  result: {
    page: 1,
    limit: 10,
    total:3,
    list: [],
  },
};


export const getAllCampaignEvents = createAsyncThunk(
  'getallCampaign',
  async (
    queryParameters: {
      page: number;
      limit: number;
      sortOrder: string;
      isApproved: boolean;
    },
    thunkAPI,
  ) => {
    try {
      const response = await campaignEventAPI.getAllCampaignEvents(
        queryParameters.page,
        queryParameters.limit,
        queryParameters.sortOrder,
        queryParameters.isApproved,
      );
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const addCampaignEvent = createAsyncThunk(
  'addCampaign',
  async (formData: AddCampaignEventFormdata, thunkAPI) => {
    try {
      const response = await campaignEventAPI.addCampaignEvent(formData);
      console.log(response);
      return response;
    } catch (error: unknown) {
      console.log(error);
      return thunkAPI?.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const deleteCampaignEvent = createAsyncThunk('deleteCampaign', async (id: string, thunkAPI) => {
  try {
    const response = await campaignEventAPI.deleteCampaignEvent(id);
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});
export const campaignEventSlice = createSlice({
  name: 'campaignEvent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCampaignEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCampaignEvent.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          toast.success('Campaign is added successfully');
        }
      })
      .addCase(addCampaignEvent.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getAllCampaignEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllCampaignEvents.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          state.result.list = action.payload.result.list;
        }
      })
      .addCase(getAllCampaignEvents.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteCampaignEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCampaignEvent.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          toast.success('Campaign is deleted successfully');
          state.result = action.payload.result;
        }
      })
      .addCase(deleteCampaignEvent.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default campaignEventSlice.reducer;
