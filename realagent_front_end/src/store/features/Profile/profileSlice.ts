import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AddProfileFormdata, Profile, profileAPI } from "./profileAPI";
import { toast } from "sonner";

interface InitialState {
  result: Profile[];
  status: string;
}

const initialState: InitialState = {
  result: [],
  status: "idle",
};

export const addProfile = createAsyncThunk(
    "addProfile",
    async (formData: AddProfileFormdata, thunkAPI) => {
      try {
        const response = await profileAPI.AddProfile(formData); 
        return response; 
      } catch (error: unknown) {
        console.log(error);
        return thunkAPI?.rejectWithValue((error as AxiosError).response?.data);
      }
    }
  );
  export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addProfile.pending, (state) => {
          state.status = "loading";
        })
        .addCase(addProfile.fulfilled, (state, action) => {
          if (action.payload) {
            toast.success("Profile added successfully");
            state.status = "idle";
          }
        })
        .addCase(addProfile.rejected, (state) => {
          state.status = "failed";
        })
  },
  });
  
  export default profileSlice.reducer;
  