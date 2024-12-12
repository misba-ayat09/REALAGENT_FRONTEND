import MeetingService from '../../../api/services/MeetingService';
import { UpdateMeetingFormData } from '../../../api/types';
import { createFetchThunk } from '../../root-store';

export default class MeetingThunks {
  static create = createFetchThunk('Meeting/create', MeetingService.create);
  static findPast = createFetchThunk('Meeting/findPast', MeetingService.findPast);
  static findUpcoming = createFetchThunk('Meeting/findUpcoming', MeetingService.findUpcoming);
  static findOne = createFetchThunk('Meeting/findOne', MeetingService.findOne);
  static update = createFetchThunk('Meeting/update', ({ id, body }: { id: string; body: UpdateMeetingFormData }) =>
    MeetingService.update(id, body),
  );
  static remove = createFetchThunk('Meeting/remove', MeetingService.remove);
}
