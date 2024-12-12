import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { AddCampaignFormdata, Campaign, campaignAPI, UpdateCampaignFormdata } from './campaignAPI';

interface InitialState {
  status: string;
  result: Campaign[];
}

const initialState: InitialState = {
  status: 'idle',
  result: [],
};

export const getallCampaign = createAsyncThunk('getallCampaign', async (_, thunkAPI) => {
  try {
    const response = await campaignAPI.getAllCampaign();
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const addCampaign = createAsyncThunk('addCampaign', async (formData: AddCampaignFormdata, thunkAPI) => {
  try {
    const response = await campaignAPI.AddCampaign(formData);
    return response;
  } catch (error: unknown) {
    console.log(error);
    return thunkAPI?.rejectWithValue((error as AxiosError).response?.data);
  }
});
export const updateCampaign = createAsyncThunk('updateCampaign', async (formData: UpdateCampaignFormdata, thunkAPI) => {
  try {
    const response = await campaignAPI.updateCampaign(formData, formData._id);
    return response?.result;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const deleteCampaign = createAsyncThunk('deleteCampaign', async (id: string, thunkAPI) => {
  try {
    const response = await campaignAPI.deleteCampaign(id);
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});
export const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCampaign.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCampaign.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          toast.success('Campaign is added successfully');
        }
      })
      .addCase(addCampaign.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getallCampaign.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getallCampaign.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          state.result = action.payload.result ;
        }
      })
      .addCase(getallCampaign.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteCampaign.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCampaign.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          toast.success('Campaign deleted successfully');
          state.result = action.payload.result;
        }
      })
      .addCase(deleteCampaign.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default campaignSlice.reducer;
