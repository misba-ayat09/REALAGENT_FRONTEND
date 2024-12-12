import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import {
  AddConvertArticleToPostFormData,
  AddSocialMediaContentFormData,
  RegenerateSocialMediaContentFormData,
  Results,
  socalMediaContentAPI,
  UpdateContent,
} from './socialMediaContentAPI';
import { ApiCallStatus } from '../../../../services';

interface InitialState {
  status: string;
  result: Results[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

const initialState: InitialState = {
  status: 'idle',
  result: [],
  currentPage: 0,
  totalPages: 1,
  totalItems: 0,
};

export const addConvertArticleToPost = createAsyncThunk(
  'addConvertArticleToPost',
  async (formData: AddConvertArticleToPostFormData, thunkAPI) => {
    try {
      const response = await socalMediaContentAPI.AddConvertArticleToPost(formData);
      return response?.result;
    } catch (error: unknown) {
      console.log(error);
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const addSocialMediaContent = createAsyncThunk(
  'addSocialMediaContent',
  async (formData: AddSocialMediaContentFormData, thunkAPI) => {
    try {
      const response = await socalMediaContentAPI.AddSocialMediaContent(formData);
      return response?.result;
    } catch (error: unknown) {
      console.log(error);
      return thunkAPI?.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const getAllSocialMediaContent = createAsyncThunk(
  'getAllSocialMediaContent',
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
      const response = await socalMediaContentAPI.GetAllSocialMediaContent(
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
export const updateSocialMediaContent = createAsyncThunk(
  'updateSocialMediaContent',
  async (formData: UpdateContent, thunkAPI) => {
    try {
      const response = await socalMediaContentAPI.updateSocialMediaContent(formData);
      return response?.result;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const deleteSocialMediaContent = createAsyncThunk(
  'deleteSocialMediaContent',
  async (queryParameters: { id: string }, thunkAPI) => {
    try {
      await socalMediaContentAPI.deleteSocialMediaContent(queryParameters.id);
      return queryParameters.id; // Return the ID of the deleted item
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const reGenerateSocialMediaContent = createAsyncThunk(
  'reGenerateSocialMediaContent',
  async (formData: RegenerateSocialMediaContentFormData, thunkAPI) => {
    try {
      const response = await socalMediaContentAPI.reGenerateSocialMediaContent(formData);
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const socailmediaContentSlice = createSlice({
  name: 'socialmediaContent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSocialMediaContent.pending, (state) => {
        state.status = 'loading';
        toast.loading('Loading...');
      })
      .addCase(addSocialMediaContent.fulfilled, (state, action) => {
        if (action.payload) {
          toast.success('Social media content added successfully');
          state.status = 'idle';
          toast.dismiss();
        }
      })
      .addCase(addSocialMediaContent.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          toast.error('Failed to add social media content');
          toast.dismiss();
        }
      })
      .addCase(getAllSocialMediaContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllSocialMediaContent.fulfilled, (state, action) => {
        if (action.payload) {
          const data = action.payload.result.list;
          const existingIds = new Set(state.result.map((item) => item._id));
          const newItems = data.filter((item) => !existingIds.has(item._id));

          state.status = ApiCallStatus.Idle;
          state.result = [...state.result, ...newItems];
          state.currentPage = action.payload.result.page;
          state.totalItems = action.payload.result.total;
          state.totalPages = Math.ceil(action.payload.result.total / 20);
        }
      })
      .addCase(getAllSocialMediaContent.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          toast.error('something is wrong with fetching socialmedia content');
        }
      })
      .addCase(addConvertArticleToPost.pending, (state) => {
        state.status = 'loading';
        toast.loading('Converting article to post...', {
          id: 'convert-toast',
        });
      })
      .addCase(addConvertArticleToPost.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          toast.dismiss('convert-toast');
          toast.success('Article converted to post successfully');
        }
      })
      .addCase(addConvertArticleToPost.rejected, (state) => {
        state.status = 'failed';
        toast.dismiss('convert-toast');
        toast.error('Failed to convert article to post');
      })

      .addCase(deleteSocialMediaContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSocialMediaContent.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          // Filter out the deleted item from the list
          state.result = state.result.filter((item) => item._id !== action.payload);
          toast.success('Social media content deleted successfully');
        }
      })

      .addCase(deleteSocialMediaContent.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          toast.error('Failed to delete social media content');
        }
      })
      .addCase(reGenerateSocialMediaContent.pending, (state) => {
        state.status = 'loading';
        // toast.loading("Loading...");
      })
      .addCase(reGenerateSocialMediaContent.fulfilled, (state) => {
        // toast.success("Social media content regenerated successfully");
        toast.dismiss();
        state.status = 'idle';
      })
      .addCase(reGenerateSocialMediaContent.rejected, (state, action) => {
        toast.dismiss();
        state.status = 'failed';
        if (action.payload) {
          toast.error('Failed to regenerate social media content');
        }
      });
  },
});

export default socailmediaContentSlice.reducer;
