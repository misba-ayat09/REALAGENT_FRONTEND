import { Activity } from '../../store/features/activities/types';

export interface ActivityQueryParameters {
  page?: number;
  limit?: number;
  sortOrder?: 'asc' | 'desc';
  sortByName?: string;
}

export type ActivityForm = Omit<Activity, '_id' | 'user' | 'createdAt' | 'updatedAt' | 'version' | '__v'>;
