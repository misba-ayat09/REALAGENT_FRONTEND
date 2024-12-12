import { FileWithPath } from '@mantine/dropzone';

interface Branding {
  _id: string;
  email: string;
  contactNumber: string;
  website: string;
  primaryColor: string;
  secondaryColor: string;
  logoImage: string |FileWithPath;
  font: string;
  updatedAt: string;
  createdAt: string;
  version: number;
  __v: number;
}

export type BrandingFormData = Partial<Omit<Branding, '_id' | 'createdAt' | 'updatedAt' | 'version' | '__v'>>;

export type BrandingResponse = Partial<Branding>;

export type TemplateFormData = Partial<{
  price: string;
  mainText: string;
  subText: string;
  features: string;
  baseImage: FileWithPath;
  additionalImage: FileWithPath;
  layout: string;
  location: string;
}>;

export interface TemplateResponse {
  _id: string;
  prompt: string;
  wordCount: number;
  post: string;
  image: string;
  isApproved: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  __v: number;
}
