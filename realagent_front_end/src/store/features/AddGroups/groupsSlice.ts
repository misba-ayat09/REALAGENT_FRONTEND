import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import {  Group, groupAPI } from './groupsAPI';

interface InitialState {
  status: 'idle' | 'loading' | 'failed';
  result: Group[];
}

const initialState: InitialState = {
  status: 'idle',
  result:[],
};
export const getallGroup = createAsyncThunk('getallGroup', async (_, thunkAPI) => {
  try {
    const response = await groupAPI.getAllGroup();
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const AddGroup = createAsyncThunk('AddGroup', async (formData: FormData, thunkAPI) => {
  try {
    const response = await groupAPI.AddGroup(formData);
    console.log(response);
    return response;
  } catch (error: unknown) {
    console.log(error);
    return thunkAPI?.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const deleteGroup = createAsyncThunk('deleteGroup', async (id: string, thunkAPI) => {
  try {
    const response = await groupAPI.deleteGroup(id);
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});
export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddGroup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AddGroup.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          toast.success('Group is added successfully');
        }
      })
      .addCase(AddGroup.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getallGroup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getallGroup.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          state.result = action.payload.result;
        }
      })
      .addCase(getallGroup.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteGroup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          toast.success('Group deleted successfully');
          state.result = action.payload.result;
        }
      })
      .addCase(deleteGroup.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default groupSlice.reducer;
