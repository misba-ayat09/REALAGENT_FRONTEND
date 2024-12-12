import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Contact, contactAPI, AddContactFormdata, UpdateContactFormdata } from './contactAPI';
import { toast } from 'sonner';

interface InitialState {
  status: string;
  result: Contact[];
}

const initialState: InitialState = {
  status: 'idle',
  result: [],
};

export const getallContact = createAsyncThunk('getallContact', async (_, thunkAPI) => {
  try {
    const response = await contactAPI.getAllContact();
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const addContact = createAsyncThunk('addContact', async (formData: AddContactFormdata, thunkAPI) => {
  try {
    const response = await contactAPI.AddContact(formData);
    console.log(response);
    return response;
  } catch (error: unknown) {
    console.log(error);
    return thunkAPI?.rejectWithValue((error as AxiosError).response?.data);
  }
});
export const updateContact = createAsyncThunk('updateContact', async (formData: UpdateContactFormdata, thunkAPI) => {
  try {
    const response = await contactAPI.updateContact(formData, formData._id);
    return response?.result;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const deleteContact = createAsyncThunk('deleteContact', async (id: string, thunkAPI) => {
  try {
    const response = await contactAPI.deleteContact(id);
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});
export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addContact.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          toast.success('Contact is added successfully');
        }
      })
      .addCase(addContact.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getallContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getallContact.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          state.result = action.payload.result;
        }
      })
      .addCase(getallContact.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          toast.success('Contact deleted successfully');
          state.result = action.payload.result;
        }
      })
      .addCase(deleteContact.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default contactSlice.reducer;
