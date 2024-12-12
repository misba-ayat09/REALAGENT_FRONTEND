import { AgentType } from '../../../common/enum/agent.enum';
import { Slug, VAPI_API } from '../../../services';

export type NumbersList = {
  number: AvailableNumber;
};
export type AvailableNumber = {
  friendlyName?: string;
  phoneNumber: string;
  lata?: string;
  locality?: string;
  rateCenter: string;
  latitude: string | null;
  longitude: string | null;
  region: string;
  postalCode: string | null;
  isoCountry: string;
  addressRequirements: string;
  beta: boolean;
  capabilities: Capabilities;
};
export type Capabilities = {
  voice: boolean;
  SMS: boolean;
  MMS: boolean;
};
export type CallLists = {
  totalItems: number;
  totalPages: number;
  items: Calls[];
  page: number;
  limit: number;
};
export type Calls = {
  id: string;
  phoneNumber: string;
  type: string;
  contact: Contact;
  recordingUrl: string;
  createdAt: string;
  duration: string;
  messages: Messages[];
  summary: string;
};

export type Contact = {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type Messages = {
  role: string;
  message: string;
};
export type AddNumberFormdata = {
  phoneNumber: string;
  organizationName: string;
};

export type GenerateAiScriptRequest = {
  text: string;
};
export type GenerateAiScriptResponse = {
  script: string;
  success: boolean;
};
export type TwilioNumber = {
  id: string;
  phoneNumber: string;
};
export type SavedNumber = {
  configuration: Configuaration;
};
export type Configuaration = {
  _id: string;
  userId: string;
  twilioPhoneNumber: string;
  accountSid: string;
  accountToken: string;
  sid: string;
  isSelfManaged: boolean;
};
export type AddVoiceFormdata = {
  voiceId: string;
  name: string;
  organization: string;
  startMessage: string;
  enableReminder: boolean;
  remindBeforeHours: string;
  remindBeforeMinutes: string;
};
export type UpdatevoiceFormdata = {
  voiceId: string;
  name: string;
  organization: string;
  startMessage: string;
  enableReminder: boolean;
  remindBeforeHours: string;
  remindBeforeMinutes: string;
};
export type AddedVoiceList = {
  userId: string;
  twilioPhoneNumber: string;
  voiceId: string;
  gender: string;
  name: string;
  organization: string;
  startMessage: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  previewUrl: string;
  accent: string;
  description: string;
  age: string;
  useCase: string;
  enableReminder: boolean;
  remindBeforeHours: string;
  remindBeforeMinutes: string;
};
export type MakeCallFormdata = {
  to: string;
};
export type MakeCallList = {
  success: boolean;
  sid: string;
};

export type VoiceConfiglist = {
  configuration: config;
};
export type config = {
  _id: string;
  userId: string;
  twilioPhoneNumber: string;
  voiceId: string;
  gender: string;
  name: string;
  organization: string;
  startMessage: string;
  createdAt: string;
  updatedAt: string;
  previewUrl: string;
  accent: string;
  description: string;
  age: string;
  useCase: string;
  enableReminder: boolean;
  remindBeforeHours: string;
  remindBeforeMinutes: string;
};
export type Voice = {
  voiceId: string;
  name: string;
  previewUrl: string;
  accent: string;
  description: string;
  age: string;
  gender: string;
  useCase: string;
};

export type VoiceList = Voice[];

const getAvailableNumber = () => {
  return VAPI_API.get<NumbersList>({
    slug: Slug.GETAVAILABLENUMBER,
    queryParameters: {
      agentType: AgentType.Receptionist,
    },
  });
};

const getAllCalls = () => {
  return VAPI_API.get<CallLists>({
    slug: Slug.GETALLCALLS,
    queryParameters: {
      agentType: AgentType.Receptionist,
    },
  });
};
const getSavedNumber = () => {
  return VAPI_API.get<SavedNumber>({
    slug: Slug.GETSAVEDNUMBER,
  });
};
const getVoice = () => {
  return VAPI_API.get<VoiceList>({
    slug: Slug.GETVOICE,
  });
};
const getVoiceConfig = () => {
  return VAPI_API.get<VoiceConfiglist>({
    slug: Slug.GETVOICECONFIG,
  });
};

const AddTwilioNumber = (formData: AddNumberFormdata) =>
  VAPI_API.post<TwilioNumber>({
    slug: Slug.ADDTWILIONUMBER,
    body: formData,
  });
const AddVoice = (formData: AddVoiceFormdata) =>
  VAPI_API.post<AddedVoiceList>({
    slug: Slug.CREATEVOICE,
    body: formData,
  });
const MakeCall = (formData: MakeCallFormdata) =>
  VAPI_API.post<MakeCallList>({
    slug: Slug.MAKECALL,
    body: formData,
  });
const updateVoice = (formData: UpdatevoiceFormdata) => {
  return VAPI_API.put<AddedVoiceList>({
    slug: Slug.UPDATEVOICE,
    body: formData,
  });
};

const removeNumber = () =>
  VAPI_API.post<{ success: boolean }>({
    slug: Slug.REMOVENUMBER,
  });

const GenerateAiScript = (formData: GenerateAiScriptRequest) =>
  VAPI_API.post<GenerateAiScriptResponse>({
    slug: Slug.GENERATE_AI_SCRIPT,
    body: formData,
  });
export const phoneAgentAPI = {
  getAvailableNumber,
  getAllCalls,
  AddTwilioNumber,
  GenerateAiScript,
  getSavedNumber,
  getVoice,
  AddVoice,
  getVoiceConfig,
  MakeCall,
  updateVoice,
  removeNumber,
};
