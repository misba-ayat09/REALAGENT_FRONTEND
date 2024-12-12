import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { AddNumberFormdata, AddVoiceFormdata, AvailableNumber, Calls, config, Configuaration, MakeCallFormdata, phoneAgentAPI, UpdatevoiceFormdata, VoiceList } from './ReceptionistAgentAPI';
import { AgentType } from '../../../common/enum/agent.enum';

interface CallsState {
  totalItems: number;
  totalPages: number;
  items: Calls[];
  page: number;
  limit: number;
}
interface PhoneAgentState {
  number?: AvailableNumber;
  calls?: CallsState;
  configuration?: Configuaration;
  voices?: VoiceList;
  configuaration?: config;
}

const initialState: PhoneAgentState = {
  number: {
    friendlyName: '',
    phoneNumber: '',
    lata: '',
    locality: '',
    rateCenter: '',
    latitude: '',
    longitude: '',
    region: '',
    postalCode: '',
    isoCountry: '',
    addressRequirements: '',
    beta: false,
    capabilities: {
      voice: false,
      SMS: false,
      MMS: false,
    },
  },
  calls: {
    totalItems: 0,
    totalPages: 0,
    items: [],
    page: 0,
    limit: 0,
  },
  configuration: {
    _id: '',
    userId: '',
    twilioPhoneNumber: '',
    accountSid: '',
    accountToken: '',
    sid: '',
    isSelfManaged: false,
    forwardingNumber: '',
  },
  configuaration: {
    _id: '',
    userId: '',
    twilioPhoneNumber: '',
    voiceId: '',
    gender: '',
    name: '',
    organization: '',
    startMessage: '',
    createdAt: '',
    updatedAt: '',
    previewUrl: '',
    accent: '',
    description: '',
    age: '',
    useCase: '',
    enableReminder: false,
    remindBeforeHours: '',
    remindBeforeMinutes: '',
  },
  voices: [],
};

export const getAvailableNumber = createAsyncThunk('phoneAgent/getAvailableNumber', async (_, thunkAPI) => {
  try {
    const response = await phoneAgentAPI.getAvailableNumber();
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const getAllCalls = createAsyncThunk('phoneAgent/getAllCalls', async (_, thunkAPI) => {
  try {
    const response = await phoneAgentAPI.getAllCalls();
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const getSavedNumber = createAsyncThunk(
  'phoneAgent/getSavedNumber',
  async (agentType: AgentType = AgentType.ColdCalling, thunkAPI) => {
    try {
      const response = await phoneAgentAPI.getSavedNumber(agentType);
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const getVoices = createAsyncThunk('phoneAgent/getVoices', async (_, thunkAPI) => {
  try {
    const response = await phoneAgentAPI.getVoice();
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const getVoiceConfig = createAsyncThunk(
  'phoneAgent/getVoiceConfig',
  async (agentType: AgentType = AgentType.ColdCalling, thunkAPI) => {
    try {
      const response = await phoneAgentAPI.getVoiceConfig(agentType);
      console.log('getVoiceConfig' + JSON.stringify(response));
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const addTwilioNumber = createAsyncThunk(
  'phoneAgent/addTwilioNumber',
  async (formData: AddNumberFormdata, thunkAPI) => {
    try {
      const response = await phoneAgentAPI.AddTwilioNumber(formData);
      return response;
    } catch (error: unknown) {
      console.log(error);
      return thunkAPI?.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const addVoice = createAsyncThunk('phoneAgent/addVoice', async (formData: AddVoiceFormdata, thunkAPI) => {
  try {
    const response = await phoneAgentAPI.AddVoice(formData);
    return response;
  } catch (error: unknown) {
    console.log(error);
    return thunkAPI?.rejectWithValue((error as AxiosError).response?.data);
  }
});
export const makeCall = createAsyncThunk('phoneAgent/makeCall', async (formData: MakeCallFormdata, thunkAPI) => {
  try {
    const response = await phoneAgentAPI.MakeCall(formData);
    return response;
  } catch (error: unknown) {
    console.log(error);
    return thunkAPI?.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const updateVoice = createAsyncThunk(
  'phoneAgent/updateVoice',
  async (formData: UpdatevoiceFormdata, thunkAPI) => {
    try {
      const response = await phoneAgentAPI.updateVoice(formData);
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const updateTwilioConfiguration = createAsyncThunk(
  'phoneAgent/updateTwilioConfiguration',
  async (formData: UpdatevoiceFormdata, thunkAPI) => {
    try {
      const response = await phoneAgentAPI.updateVoice(formData);
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const removeNumber = createAsyncThunk('phoneAgent/removeNumber', async (_: void, thunkAPI) => {
  try {
    const response = await phoneAgentAPI.removeNumber();
    return response;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const phoneAgentSlice = createSlice({
  name: 'phoneAgent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAvailableNumber.pending, () => {})
      .addCase(getAvailableNumber.fulfilled, (state, action) => {
        state.number = action.payload?.number;
      })
      .addCase(getAvailableNumber.rejected, () => {})
      .addCase(getAllCalls.pending, () => {})
      .addCase(getAllCalls.fulfilled, (state, action) => {
        state.calls = action.payload;
      })
      .addCase(getAllCalls.rejected, () => {
        // toast.error('Something went wrong with fetching calls');
      })
      .addCase(getSavedNumber.pending, () => {})
      .addCase(getSavedNumber.fulfilled, (state, action) => {
        state.configuration = action.payload?.configuration;
      })
      .addCase(getSavedNumber.rejected, () => {
        // toast.error('Something went wrong with fetching saved number');
      })
      .addCase(getVoices.pending, () => {})
      .addCase(getVoices.fulfilled, (state, action) => {
        state.voices = action.payload;
      })
      .addCase(getVoices.rejected, () => {
        // toast.error('Something went wrong with fetching voices');
      })
      .addCase(getVoiceConfig.pending, () => {})
      .addCase(getVoiceConfig.fulfilled, (state, action) => {
        console.log('getVoiceConfig.fulfilled' + JSON.stringify(action.payload?.configuration));
        if (action.payload?.configuration) {
          state.configuaration = action.payload?.configuration;
        }
      })
      .addCase(getVoiceConfig.rejected, () => {
        // toast.error('Something went wrong with fetching voice config');
      })
      .addCase(addTwilioNumber.pending, () => {})
      .addCase(addTwilioNumber.fulfilled, () => {
        toast.success('Twilio number added successfully');
      })
      .addCase(addTwilioNumber.rejected, () => {
        toast.error('Something went wrong with adding twilio number');
      })
      .addCase(addVoice.pending, () => {})
      .addCase(addVoice.fulfilled, () => {
        toast.success('Voice added successfully');
      })
      .addCase(addVoice.rejected, () => {
        toast.error('Something went wrong with adding voice');
      })
      .addCase(makeCall.pending, () => {})
      .addCase(makeCall.fulfilled, () => {
        toast.success('Call made successfully');
      })
      .addCase(makeCall.rejected, () => {
        toast.error('Something went wrong with making call');
      })
      .addCase(updateVoice.pending, () => {})
      .addCase(updateVoice.fulfilled, () => {
        toast.success('Voice updated successfully');
      })
      .addCase(updateVoice.rejected, () => {
        toast.error('Something went wrong with updating voice');
      })
      .addCase(removeNumber.pending, () => {})
      .addCase(removeNumber.fulfilled, () => {
        toast.success('Number removed successfully');
      })
      .addCase(removeNumber.rejected, () => {
        toast.error('Something went wrong with removing number');
      });
  },
});

export default phoneAgentSlice.reducer;
