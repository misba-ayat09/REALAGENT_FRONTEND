/* eslint-disable no-param-reassign */
import { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataSourceFileFormData, FileUploadResponse, fileHubAPI } from "./fileHubAPI"; 
import { FileCategory } from "../../../common/enum/file-category.enum";
import { Status } from "../../../common/enum/redux-status.enum";

export interface FileHubState {
  status: Status;
  fileName: string | undefined;
  fileUrl: string | undefined;
  allFiles:FileUploadResponse[]
}

const initialState: FileHubState = {
  status: Status.idle,
  fileName: undefined,
  fileUrl: undefined,
  allFiles:[]
};

export const uploadFile =  
  async (
    { fileCategory, file }: { fileCategory: FileCategory; file: FormData } 
  ) => {
    try {
      const response = await fileHubAPI.uploadFile(fileCategory, file);
      return response?.result;
    } catch (error: unknown) { 
      console.log(error)
      return undefined
    }
  } 
export const updateAuthUrl = createAsyncThunk(
  'masterData/updateAuthUrl',
  async (
    {
      fileCategory,
      fileName,
    }: { fileCategory: FileCategory; fileName: string },
    thunkAPI
  ) => {
    try {
      const response = await fileHubAPI.updateAuthUrl(fileCategory, fileName);
      return response?.fileName;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const getAuthUrl = createAsyncThunk(
  'masterData/getAuthUrl',
  async (
    {
      fileCategory,
      fileName,
    }: { fileCategory: FileCategory; fileName: string },
    thunkAPI
  ) => {
    try {
      const response = await fileHubAPI.getAuthUrl(fileCategory, fileName);
      return response?.result;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  }
);
export const removeFile = createAsyncThunk(
  'masterData/removeFile',
  async (
    {
      fileCategory,
      fileName,
    }: { fileCategory: FileCategory; fileName: string },
    thunkAPI
  ) => {
    try {
      const response = await fileHubAPI.removeAuthUrl(fileCategory, fileName);
      return response?.fileName;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const getDataSourceFile = createAsyncThunk(
  'masterData/getDataSourceFile',
  async (_, thunkAPI) => {
    try {
      const response = await fileHubAPI.getDataSourceFile();
      return response?.result;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  }
)
export const getDataSourceFiles = createAsyncThunk(
  'masterData/getDataSourceFiles',
  async (_, thunkAPI) => {
    try {
      const response = await fileHubAPI.getDataSourceFiles(); 
      return response?.result
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  }
)
export const uploadDataSourceFile = createAsyncThunk<any,DataSourceFileFormData,any>(
  'masterData/uploadDataSourceFile',
  async (body:DataSourceFileFormData, thunkAPI) => {
    try {
      const response = await fileHubAPI.createDataSourceFile(body);
      return response?.result;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  }
)

export const fileHubSlice = createSlice({
  name: "fileHub",
  initialState,
  reducers: {
    fileHubStateClearAll: (state) => {
      Object.assign(state, initialState);
    },
    updateAuthUrlState: (state) => ({
      ...state,
      status: Status.loading
    }),
    removeFileState: (state) => ({
      ...state,
      status: Status.loading
    })
  },
  extraReducers: (builder) => {
    builder
      // .addCase(uploadFile.pending, (state) => ({
      //   ...state,
      //   status: Status.loading
      // }))
      // .addCase(uploadFile.fulfilled, (state, action) => {
      //   if (action.payload && action.payload.fileName) {
      //     return {
      //       ...state,
      //       status: Status.idle,
      //       fileName: action.payload.fileName
      //     };
      //   }
      //   return {
      //     ...state,
      //     status: Status.idle
      //   };
      // })
      // .addCase(uploadFile.rejected, (state) => ({
      //   ...state,
      //   status: Status.failed
      // }))
      .addCase(getAuthUrl.pending, (state) => ({
        ...state,
        status: Status.loading
      }))
      .addCase(getAuthUrl.fulfilled, (state, action: any) => {
        if (action.payload && action.payload.result.signedUrl) {
          return {
            ...state,
            status: Status.idle,
            fileUrl: action.payload.result.signedUrl
          };
        }
        return {
          ...state,
          status: Status.idle
        };
      })
      .addCase(getAuthUrl.rejected, (state) => ({
        ...state,
        status: Status.failed
      }))
      // .addCase(updateAuthUrl.fulfilled, (state) => ({
      //   ...state,
      //   status: Status.idle
      // }))
      // .addCase(updateAuthUrl.rejected, (state) => ({
      //   ...state,
      //   status: Status.failed
      // }));
    builder
      .addCase(removeFile.fulfilled, (state) => ({
        ...state,
        status: Status.idle
      }))
      .addCase(removeFile.rejected, (state) => ({
        ...state,
        status: Status.failed
      }));

    builder
      .addCase(getDataSourceFiles.pending, (state) => ({
        ...state,
        status: Status.loading
      }))
      .addCase(getDataSourceFiles.fulfilled, (state, action:any) => { 
        if (action.payload) {
          return {
            ...state,
            status: Status.idle,
            allFiles: action.payload
          };
        }
        return {
          ...state,
          status: Status.idle
        };
      })
      .addCase(getDataSourceFiles.rejected, (state) => ({
        ...state,
        status: Status.failed
      }));
  }
});

export const { fileHubStateClearAll, updateAuthUrlState } = fileHubSlice.actions;

export default fileHubSlice.reducer;
