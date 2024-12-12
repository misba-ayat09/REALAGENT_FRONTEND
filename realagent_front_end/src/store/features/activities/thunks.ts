import ActivityService from '../../../api/services/ActivityService';
import { createFetchThunk } from '../../root-store';

export default class ActivityThunks {
  static findActivities = createFetchThunk('activity/findActivities', ActivityService.findActivities);
}
