import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { socialMediaAgentAPI } from "./api";
import { PostFormData, SocialMediaContentFormData } from "./types";
import { createFetchThunk } from '../../root-store';
import { SocialMediaService } from '../../../api/services';

export const generateSocialMediaContent = createAsyncThunk(
  'socialMediaAgent/generateSocialMediaContent',
  async (formData: SocialMediaContentFormData, thunkAPI) => {
    try {
      const response = await socialMediaAgentAPI.generateSocialMediaContent(formData);
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const sendSocialMediaPost = createAsyncThunk(
  'socialMediaAgent/sendSocialMediaPost',
  async (formData: PostFormData, thunkAPI) => {
    try {
      const response = await socialMediaAgentAPI.sendSocialMediaPost(formData);
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const getAllSocialMediaPosts = createAsyncThunk(
  'socialMediaAgent/getAllSocialMediaPosts',
  async (_: void, thunkAPI) => {
    try {
      const response = await socialMediaAgentAPI.getAllSocialMediaPosts();
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const getSocialMediaPost = createAsyncThunk('socialMediaAgent/getSocialMediaPost', async (postId: string, thunkAPI) => {
  try {
    const response = await socialMediaAgentAPI.getSocialMediaPost(postId);
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export default class SocialMediaThunk {
  static getActivities = createFetchThunk('socialMediaAgent/getActivities', SocialMediaService.getActivities);
}
