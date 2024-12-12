import { createSlice } from "@reduxjs/toolkit";
import { SocialMediaAgentState } from "./types";
import SocialMediaThunk, { getAllSocialMediaPosts, getSocialMediaPost, sendSocialMediaPost } from './thunks';
import { ApiCallStatus } from '../../../services';
import { createFulfilledHandler, createPendingHandler, createRejectedHandler } from '../../root-store';

const initialState: SocialMediaAgentState = {
  status: ApiCallStatus.Idle,
  articles: [],
  posts: [],
  post: undefined,
  activities: [],
};

export const socialMediaAgentSlice = createSlice({
  name: 'socialMediaAgent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // sendSocialMediaPost
      .addCase(sendSocialMediaPost.pending, (state) => ({
        ...state,
        status: ApiCallStatus.Loading,
      }))
      .addCase(sendSocialMediaPost.fulfilled, (state) => ({
        ...state,
        status: ApiCallStatus.Idle,
      }))
      .addCase(sendSocialMediaPost.rejected, (state) => ({
        ...state,
        status: ApiCallStatus.Failed,
      }))

      // getAllSocialMediaPosts
      .addCase(getAllSocialMediaPosts.pending, (state) => ({
        ...state,
        status: ApiCallStatus.Loading,
      }))
      .addCase(getAllSocialMediaPosts.fulfilled, (state, action) => ({
        ...state,
        status: ApiCallStatus.Idle,
        posts: action.payload?.result ?? [],
      }))
      .addCase(getAllSocialMediaPosts.rejected, (state) => ({
        ...state,
        status: ApiCallStatus.Failed,
      }))

      // getSocialMediaPost
      .addCase(getSocialMediaPost.pending, (state) => ({
        ...state,
        status: ApiCallStatus.Loading,
      }))
      .addCase(getSocialMediaPost.fulfilled, (state, action) => ({
        ...state,
        status: ApiCallStatus.Idle,
        post: action.payload?.result ?? undefined,
      }))
      .addCase(getSocialMediaPost.rejected, (state) => ({
        ...state,
        status: ApiCallStatus.Failed,
      }))

      .addCase(SocialMediaThunk.getActivities.pending, createPendingHandler())
      .addCase(
        SocialMediaThunk.getActivities.fulfilled,
        createFulfilledHandler(undefined, (state, action) => {
          if (action.payload) {
            const data = action.payload.result;
            state.activities = data;
          }
          state.status = ApiCallStatus.Idle;
        }),
      )
      .addCase(SocialMediaThunk.getActivities.rejected, createRejectedHandler());
  },
});

export default socialMediaAgentSlice.reducer;
