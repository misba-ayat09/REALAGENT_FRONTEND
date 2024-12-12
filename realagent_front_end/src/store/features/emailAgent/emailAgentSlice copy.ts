import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { emailAgentAPI, InboxEmailType, EmailRequest, SendEmailRequest } from './emailAgentAPI';
import { AxiosError } from 'axios';
import { Status } from '../../../common/enum';

export const createEmail = createAsyncThunk('emailAgent/createEmail', async (body: SendEmailRequest, thunkAPI) => {
  try {
    const response = await emailAgentAPI.sendEmail(body);
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const getAllEmails = createAsyncThunk('emailAgent/getAllEmails', async (body: EmailRequest, thunkAPI) => {
  try {
    const response = await emailAgentAPI.getInbox(body);
    return response?.result;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const createDraft = createAsyncThunk('emailAgent/createDraft', async (body: SendEmailRequest, thunkAPI) => {
  try {
    const response = await emailAgentAPI.saveAsDraft(body);
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const deleteDraft = createAsyncThunk('emailAgent/deleteDraft', async (draftId: string, thunkAPI) => {
  try {
    const response = await emailAgentAPI.deleteDraft(draftId);
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const getAllDrafts = createAsyncThunk('emailAgent/getAllDrafts', async (_, thunkAPI) => {
  try {
    const response = await emailAgentAPI.getAllDrafts();
    return response?.result;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const getDraft = createAsyncThunk('emailAgent/getDraft', async (id: string, thunkAPI) => {
  try {
    const response = await emailAgentAPI.getDraft(id);
    return response?.result;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

interface EmailAgentState {
  status: Status;
  result: any;
  allEmails: InboxEmailType[];
  email: InboxEmailType | undefined;
  draftEmails: InboxEmailType[];
  draftEmail: InboxEmailType | undefined;
}

const initialState: EmailAgentState = {
  status: Status.idle,
  result: [],
  allEmails: [],
  email: undefined,
  draftEmails: [],
  draftEmail: undefined,
};

export const emailAgentSlice = createSlice({
  name: 'emailAgent',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setDraft: (state, action) => {
      state.draftEmail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmail.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(createEmail.fulfilled, (state) => {
        state.status = Status.idle;
      })
      .addCase(createEmail.rejected, (state) => {
        state.status = Status.failed;
      })
      .addCase(getAllEmails.rejected, (state) => {
        state.status = Status.failed;
        state.allEmails = [];
      })
      .addCase(getAllEmails.fulfilled, (state, action) => {
        state.status = Status.idle;
        if (action.payload) {
          state.allEmails = action.payload;
        }
      })
      .addCase(getAllEmails.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(createDraft.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(createDraft.fulfilled, (state) => {
        state.status = Status.idle;
      })
      .addCase(createDraft.rejected, (state) => {
        state.status = Status.failed;
      })
      .addCase(deleteDraft.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(deleteDraft.fulfilled, (state) => {
        state.status = Status.idle;
      })
      .addCase(deleteDraft.rejected, (state) => {
        state.status = Status.failed;
      })
      .addCase(getAllDrafts.fulfilled, (state, action) => {
        state.status = Status.idle;
        if (action.payload) {
          state.draftEmails = action.payload;
        }
      })
      .addCase(getAllDrafts.rejected, (state) => {
        state.status = Status.failed;
      })
      .addCase(getAllDrafts.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(getDraft.fulfilled, (state, action) => {
        state.status = Status.idle;
        if (action.payload) {
          state.draftEmail = action.payload;
        }
      })
      .addCase(getDraft.rejected, (state) => {
        state.status = Status.failed;
        state.draftEmail = undefined;
      })
      .addCase(getDraft.pending, (state) => {
        state.status = Status.loading;
      });
  },
});

export const { setEmail, setDraft } = emailAgentSlice.actions;

export default emailAgentSlice.reducer;
