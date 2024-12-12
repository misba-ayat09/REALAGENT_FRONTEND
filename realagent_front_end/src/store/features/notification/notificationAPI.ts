import { API, Slug } from '../../../services';

export type ListNotifications = {
  status: string;
  result: Result;
};

export type Result = {
  page: number;
  limit: number;
  total: number;
  read: number;
  unread: number;
  list: Notifications[];
};
export type Notifications = {
  _id: string;
  user: string;
  type: string;
  message: string;
  payload: string;
  read: boolean;
  link: string;
  updatedAt: string;
  version: number;
};

export interface NotificationsCount {
  status: string;
  result: {
    read: number;
    unread: number;
  };
}

const GetAllNotifications = (page: number, limit: number, read: boolean) => {
  return API.get<ListNotifications>({
    slug: Slug.NOTIFICATIONS,
    queryParameters: {
      page,
      limit,
      read,
      // sortOrder,
    },
  });
};

const GetNotificationCounts = () => {
  return API.get<NotificationsCount>({
    slug: Slug.NOTIFICATIONSCOUNT,
  });
};

const MarkAllNotificationAsRead = () => {
  return API.patch({ slug: Slug.NOTIFICATIONMARKASREAD });
}

export const notificationAPI = {
  GetAllNotifications,
  GetNotificationCounts,
  MarkAllNotificationAsRead
};
