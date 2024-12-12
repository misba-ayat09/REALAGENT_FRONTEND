import { Activity } from './types';

export function updateMeetingList(existingList: Activity[], newList: Activity[]) {
  try {
    const updatedList = newList?.map((newItem) => {
      const existingItem = existingList?.find((item) => item._id === newItem._id);
      return existingItem ? { ...existingItem, ...newItem } : newItem;
    });

    return [
      ...existingList.filter((existingItem) => !newList.some((newItem) => newItem._id === existingItem._id)),
      ...updatedList,
    ];
  } catch (error) {
    return existingList || [];
  }
}
