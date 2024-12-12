import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { AddAiAgentsFormdata, AiAgents, aiAgentsAPI, UpdateAiAgentsFormdata } from './aiAgentsAPI';

interface InitialState {
  status: string;
  result: AiAgents[];
}

const initialState: InitialState = {
  status: 'idle',
  result: [],
};

export const getallAiAgents = createAsyncThunk('getAllAiAgents', async (_, thunkAPI) => {
  try {
    const response = await aiAgentsAPI.getAllAiAgents();
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const addAiAgents = createAsyncThunk('AddAiAgents', async (formData: AddAiAgentsFormdata, thunkAPI) => {
  try {
    const response = await aiAgentsAPI.AddAiAgents(formData);
    console.log(response);
    return response;
  } catch (error: unknown) {
    console.log(error);
    return thunkAPI?.rejectWithValue((error as AxiosError).response?.data);
  }
});
export const updateAiAgents = createAsyncThunk('updateAiAgents', async (formData: UpdateAiAgentsFormdata, thunkAPI) => {
  try {
    const response = await aiAgentsAPI.updateAiAgents(formData, formData._id);
    return response?.result;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const deleteAiAgents = createAsyncThunk('deleteAiAgents', async (id: string, thunkAPI) => {
  try {
    const response = await aiAgentsAPI.deleteAiAgents(id);
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});
export const aiAgentsSlice = createSlice({
  name: 'aiAgent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAiAgents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addAiAgents.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          toast.success('Contact is added successfully');
        }
      })
      .addCase(addAiAgents.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getallAiAgents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getallAiAgents.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          state.result = action.payload.result;
        }
      })
      .addCase(getallAiAgents.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteAiAgents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAiAgents.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          toast.success('Contact deleted successfully');
          state.result = action.payload.result;
        }
      })
      .addCase(deleteAiAgents.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default aiAgentsSlice.reducer;
