import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../../../common/enum/redux-status.enum';
import { CreateParagraphResult, paragraphAPI } from './DataSourceAPI/textAPI';
import { CreateWebsiteUrlResponse, websiteAPI } from './DataSourceAPI/websiteAPI';
import { CreateQuestionAnswerResponse, questionAnswerAPI } from './DataSourceAPI/questionAnswerAPI';
import { AxiosError } from 'axios';
import { datasourceAPI, FetchDataSourceResponse } from './DataSourceAPI/datasourceAPI';
import { CreateQualifyingQuestionResponse, qualifyingQuestionAPI } from './DataSourceAPI/qualifyingQuestionAPI';

export interface DataSourceState {
  status: Status;
  allParagraphs: CreateParagraphResult[];
  allQuestionAnswers: CreateQuestionAnswerResponse[];
  allWebsiteUrls: CreateWebsiteUrlResponse[];
  allDatasource: FetchDataSourceResponse | null;
  allQualifyingQuestions: CreateQualifyingQuestionResponse[];
}

const initialState: DataSourceState = {
  status: Status.idle,
  allParagraphs: [],
  allQuestionAnswers: [],
  allWebsiteUrls: [],
  allDatasource: null,
  allQualifyingQuestions: [],
};

export const getAllParagraphs = createAsyncThunk('dataSources/getAllParagraphs', async (_, thunkAPI) => {
  try {
    const response = await paragraphAPI.getAllParagraphs();
    return response?.result;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const getAllQuestionAnswers = createAsyncThunk('dataSources/getAllQuestionAnswers', async (_, thunkAPI) => {
  try {
    const response = await questionAnswerAPI.getAllQuestionAnswer();
    return response?.result;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const getQualifyingQuestions = createAsyncThunk('dataSources/getQualifyingQuestions', async (_, thunkAPI) => {
  try {
    const response = await qualifyingQuestionAPI.getAllQualifyingQuestion();
    return response?.result;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const getAllWebsiteUrls = createAsyncThunk('dataSources/getAllWebsiteUrls', async (_, thunkAPI) => {
  try {
    const response = await websiteAPI.getAllWebsiteUrls();
    return response?.result;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const fetchDatasource = createAsyncThunk('dataSources/fetchDatasource', async (id: string, thunkAPI) => {
  try {
    const response = await datasourceAPI.createFetchDataSource({ realtor_id: id }, id);

    if (response && response.result) {
      // Check if response and response.result are defined
      return response.result;
    } else {
      throw new Error('No data received from API');
    }
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const dataSourceSlice = createSlice({
  name: 'dataSources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // texts
    builder
      .addCase(getAllParagraphs.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(getAllParagraphs.rejected, (state) => {
        state.status = Status.failed;
      })
      .addCase(getAllParagraphs.fulfilled, (state, action) => {
        state.status = Status.idle;
        if (action.payload) state.allParagraphs = action.payload;
      })
      //   qna
      .addCase(getAllQuestionAnswers.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(getAllQuestionAnswers.rejected, (state) => {
        state.status = Status.failed;
      })
      .addCase(getAllQuestionAnswers.fulfilled, (state, action) => {
        state.status = Status.idle;
        if (action.payload) state.allQuestionAnswers = action.payload;
      })
      //   qq
      .addCase(getQualifyingQuestions.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(getQualifyingQuestions.rejected, (state) => {
        state.status = Status.failed;
      })
      .addCase(getQualifyingQuestions.fulfilled, (state, action) => {
        state.status = Status.idle;
        if (action.payload) state.allQualifyingQuestions = action.payload;
      })
      //   website api
      .addCase(getAllWebsiteUrls.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(getAllWebsiteUrls.rejected, (state) => {
        state.status = Status.failed;
      })
      .addCase(getAllWebsiteUrls.fulfilled, (state, action) => {
        state.status = Status.idle;
        if (action.payload) state.allWebsiteUrls = action.payload;
      })
      //   datasource api

      .addCase(fetchDatasource.pending, (state) => {
        state.status = Status.loading;
      })

      .addCase(fetchDatasource.fulfilled, (state, action) => {
        state.status = Status.idle;
        if (action.payload) state.allDatasource = action.payload;
      })

      .addCase(fetchDatasource.rejected, (state, action) => {
        const error = action.payload as AxiosError;
        if (error?.response?.status !== 404) {
          state.status = Status.failed;
          console.error('Failed to fetch datasource:', error);
        } else {
          state.status = Status.idle;
        }
      });
  },
});

export default dataSourceSlice.reducer;
