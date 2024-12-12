/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { VersionState } from './types';
import {
  addResearchPost,
  deleteResearchAgentArticle,
  getResearchAgentArticles,
  getResearchAgentTopics,
  removeResearchAgentLink,
} from './thunks';
import { ApiCallStatus } from '../../../services';
import { toast } from 'sonner';
import { createFulfilledHandler } from '../../root-store';

const initialState: VersionState = {
  status: ApiCallStatus.Idle,
  articles: {
    currentPage: 0,
    totalPages: 1,
    totalItems: 0,
    list: [],
  },
  topics: [],
};
// export const removeResearchAgentLink = createAsyncThunk(
//   "researchAgent/removeResearchAgentLink",
//   async (queryParameters: { id: string }, thunkAPI) => {
//     try {
//       await researchAgentAPI.removeResearchAgentLink(queryParameters.id);
//       return queryParameters.id;
//     } catch (error: unknown) {
//       return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
//     }
//   }
// );

export const researchAgentSlice = createSlice({
  name: 'researchAgent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // getResearchAgentArticles
      .addCase(getResearchAgentArticles.pending, (state) => ({
        ...state,
        status: ApiCallStatus.Loading,
      }))
      .addCase(
        getResearchAgentArticles.fulfilled,
        createFulfilledHandler(undefined, (state, action) => {
          if (action.payload) {
            const data = action.payload.result.list;

            const existingIds = new Set(state.articles.list.map((item) => item._id));
            const newItems = data.filter((item) => !existingIds.has(item._id));

            state.status = ApiCallStatus.Idle;
            state.articles = {
              ...state.articles,
              list: [...state.articles.list, ...newItems],
              currentPage: action.payload?.result.page,
              totalItems: action.payload?.result.total,
              totalPages: Math.ceil(action.payload?.result.total / 20),
            };
          }

          state.status = ApiCallStatus.Idle;
        }),
      )
      .addCase(getResearchAgentArticles.rejected, (state) => ({
        ...state,
        status: ApiCallStatus.Failed,
      }))

      // getResearchAgentTopics
      .addCase(getResearchAgentTopics.pending, (state) => ({
        ...state,
        status: ApiCallStatus.Loading,
      }))
      .addCase(getResearchAgentTopics.fulfilled, (state, action) => ({
        ...state,
        status: ApiCallStatus.Idle,
        topics: action.payload?.result ?? [],
      }))
      .addCase(getResearchAgentTopics.rejected, (state) => ({
        ...state,
        status: ApiCallStatus.Failed,
      }))

      // removeResearchAgentLink
      // .addCase(removeResearchAgentLink.pending, (state) => {
      //   // state.status = ApiCallStatus.Loading;
      // })

      .addCase(removeResearchAgentLink.fulfilled, (state, action) => {
        state.status = ApiCallStatus.Idle;
        state.topics = state.topics.filter((topic) => topic._id !== action.payload);
        toast.success('Topics removed successfully');
      })
      .addCase(removeResearchAgentLink.rejected, (state) => {
        state.status = ApiCallStatus.Failed;
        toast.error('Failed to remove Topics');
      })
      // .addCase(deleteResearchAgentArticle.fulfilled, (state, action) => {
      //   state.status = ApiCallStatus.Idle;
      //   state.articles = state.articles.filter(
      //     (article) => article._id !== action.payload
      //   );
      //   toast.success("Article deleted successfully");
      // })
      .addCase(deleteResearchAgentArticle.fulfilled, (state, action) => {
        const articleExists = state.articles.list.find((article) => article._id === action.payload);
        if (articleExists) {
          state.articles.list = state.articles.list.filter((article) => article._id !== action.payload);
        } else {
          state.status = ApiCallStatus.Failed; // Or set a different status indicating the article was already deleted
        }
      })
      .addCase(deleteResearchAgentArticle.rejected, (state) => {
        state.status = ApiCallStatus.Failed;
      })
      // .addCase(deleteResearchAgentArticle.rejected, (state) => {
      //   state.status = ApiCallStatus.Failed;
      //   toast.error('Failed to delete article');
      // })
      .addCase(addResearchPost.pending, (state) => {
        state.status = ApiCallStatus.Loading;
        toast.success('Adding social media post...');
      })
      .addCase(addResearchPost.fulfilled, (state) => {
        state.status = ApiCallStatus.Idle;
        toast.success('Social media post added successfully');
      })
      .addCase(addResearchPost.rejected, (state) => {
        state.status = ApiCallStatus.Failed;
        toast.error('Failed to add to social media post');
      });
  },
});

export default researchAgentSlice.reducer;
