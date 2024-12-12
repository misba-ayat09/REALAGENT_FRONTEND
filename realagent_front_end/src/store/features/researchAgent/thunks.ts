import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { researchAgentAPI } from './api';
import { ResearchPostFormData, TopicFormData } from './types';

export const getResearchAgentArticles = createAsyncThunk(
  'version/getResearchAgentArticles',
  async (
    queryParameters: {
      page: number;
      limit: number;
      sortOrder: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await researchAgentAPI.getArticles(
        queryParameters.page,
        queryParameters.limit,
        queryParameters.sortOrder,
      );
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

// export const deleteResearchAgentArticle = createAsyncThunk(
//   "version/deleteResearchAgentArticle",
//   async (id: string, thunkAPI) => {
//     try {
//       await researchAgentAPI.deleteResearchAgentArticle(id);
//       return id;
//     } catch (error: unknown) {
//       return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
//     }
//   }
// );
export const deleteResearchAgentArticle = createAsyncThunk(
  'researchAgent/deleteResearchAgentArticle',
  async (id: string, thunkAPI) => {
    try {
      await researchAgentAPI.deleteResearchAgentArticle(id);
      return id; // Return the ID of the deleted article
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const addResearchAgentLink = createAsyncThunk(
  'version/addResearchAgentLink',
  async (formData: TopicFormData, thunkAPI) => {
    try {
      const response = await researchAgentAPI.addResearchAgentLink(formData);
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const getResearchAgentTopics = createAsyncThunk('version/getResearchAgentTopics', async (_: void, thunkAPI) => {
  try {
    const response = await researchAgentAPI.getResearchAgentTopics();
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const removeResearchAgentLink = createAsyncThunk(
  'version/removeResearchAgentLink',
  async (id: string, thunkAPI) => {
    try {
      await researchAgentAPI.removeResearchAgentLink(id);
      return id;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);
export const addResearchPost = createAsyncThunk(
  'version/addResearchPost',
  async (formData: ResearchPostFormData, thunkAPI) => {
    try {
      const response = await researchAgentAPI.addResearchPost(formData);
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);
