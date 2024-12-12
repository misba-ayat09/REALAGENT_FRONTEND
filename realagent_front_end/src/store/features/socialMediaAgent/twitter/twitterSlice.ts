import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Results, AddtwitterFormData, twitterAPI } from "./twitterAPI";

interface InitialState {
  status: string;
  result: Results[];
}

const initialState: InitialState = {
  status: "idle",
  result: [],
};


export const addTwitter = createAsyncThunk(
  "addTwitter",
  async (formData: AddtwitterFormData, thunkAPI) => {
    try {
      const response = await twitterAPI.AddTwitter(formData); 
      return response?.result; 
    } catch (error: unknown) {
      console.log(error);
      return thunkAPI?.rejectWithValue((error as AxiosError).response?.data);
    }
  }
);
export const twitterSlice = createSlice({
  name: "twitter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTwitter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTwitter.fulfilled, (state, action) => {
        if (action.payload) {
          state.result = action.payload;
          state.status = "idle";
        }
      })
      .addCase(addTwitter.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          toast.error("Twitter is already added");
        }
      })
},
});

export default twitterSlice.reducer;
