import {
  ConnectionEstablishedServerEvent,
  MeetingAgentAddRequestEvent,
  MeetingChatbotAddRequestEvent,
} from '../../common/enum/connection-dto';
import {
  RealTimeEventHandler,
  RealTimeEventHandlerDecorator,
  RealTimeEventName,
  socketAdapter as __socketAdaptor,
} from '../../socket';
import ActivityThunks from '../../store/features/activities/thunks';
import MeetingThunks from '../../store/features/meetings/thunks';
import { getAllNotifications, getNotificationCounts } from '../../store/features/notification/notificationSlice';
import { AppDispatch, RootState } from '../../store/root-store';
import { logger } from '../../utils';

export const realTimeEventHandler = new RealTimeEventHandler(__socketAdaptor);

export const startSocket = (dispatch: AppDispatch, rootState: Partial<RootState>) => {
  const { authentication } = rootState;

  if (!authentication?.isAuthenticated) {
    return;
  }

  __socketAdaptor.onConnect((_socketAdapter, data) => {
    logger.info('socket connected', data);
  });
  __socketAdaptor.onDisConnect((_socketAdapter, data) => {
    logger.info('socket disconnected', data);
  });
  __socketAdaptor.onError((_socketAdapter, data) => {
    logger.info('socket error', data);
  });

  __socketAdaptor.connect();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const __realTimeEventHandlerDecorator = new RealTimeEventHandlerDecorator<any>(
    realTimeEventHandler,
    RealTimeEventName.ON_CONNECT,
  );

  (__realTimeEventHandlerDecorator as RealTimeEventHandlerDecorator<ConnectionEstablishedServerEvent>).observeEvent(
    (event) => {
      logger.info(RealTimeEventName.ON_CONNECT, event?.payload);
    },
  );

  __realTimeEventHandlerDecorator
    .addNext(
      new RealTimeEventHandlerDecorator<MeetingChatbotAddRequestEvent>(
        realTimeEventHandler,
        RealTimeEventName.MEETING_CHATBOT_ADD_REQUEST,
      ).observeEvent((event) => {
        logger.info(RealTimeEventName.MEETING_CHATBOT_ADD_REQUEST, event?.payload);
        void dispatch(
          getAllNotifications({
            page: 1,
            limit: 10,
            read: false,
          }),
        );
    void dispatch(getNotificationCounts());

        dispatch(ActivityThunks.findActivities({ page: 1, limit: 10 }));
        dispatch(MeetingThunks.findUpcoming({ page: 1, limit: 20 }));
      }),
    )
    .addNext(
      new RealTimeEventHandlerDecorator<MeetingAgentAddRequestEvent>(
        realTimeEventHandler,
        RealTimeEventName.MEETING_AGENT_ADD_REQUEST,
      ).observeEvent((event) => {
        logger.info(RealTimeEventName.MEETING_AGENT_ADD_REQUEST, event?.payload);
        void dispatch(
          getAllNotifications({
            page: 1,
            limit: 10,
            read: false,
          }),
        );
    void dispatch(getNotificationCounts());
        dispatch(MeetingThunks.findUpcoming({ page: 1, limit: 20 }));
      }),
    )
    .addNext(
      new RealTimeEventHandlerDecorator<MeetingAgentAddRequestEvent>(
        realTimeEventHandler,
        RealTimeEventName.MEETING_AGENT_UPDATE_REQUEST,
      ).observeEvent((event) => {
        logger.info(RealTimeEventName.MEETING_AGENT_UPDATE_REQUEST, event?.payload);
        void dispatch(
          getAllNotifications({
            page: 1,
            limit: 10,
            read: false,
          }),
        );
    void dispatch(getNotificationCounts());

        dispatch(MeetingThunks.findUpcoming({ page: 1, limit: 20 }));
      }),
    )
    .addNext(
      new RealTimeEventHandlerDecorator<MeetingAgentAddRequestEvent>(
        realTimeEventHandler,
        RealTimeEventName.MEETING_CHATBOT_UPDATE_REQUEST,
      ).observeEvent((event) => {
        logger.info(RealTimeEventName.MEETING_CHATBOT_UPDATE_REQUEST, event?.payload);
        void dispatch(
          getAllNotifications({
            page: 1,
            limit: 10,
            read: false,
          }),
        );
    void dispatch(getNotificationCounts());

        dispatch(MeetingThunks.findUpcoming({ page: 1, limit: 20 }));
      }),
    )
    .addNext(
      new RealTimeEventHandlerDecorator<MeetingAgentAddRequestEvent>(
        realTimeEventHandler,
        RealTimeEventName.MEETING_AGENT_DELETE_REQUEST,
      ).observeEvent((event) => {
        logger.info(RealTimeEventName.MEETING_AGENT_DELETE_REQUEST, event?.payload);
        void dispatch(
          getAllNotifications({
            page: 1,
            limit: 10,
            read: false,
          }),
        );
    void dispatch(getNotificationCounts());

        dispatch(MeetingThunks.findUpcoming({ page: 1, limit: 20 }));
      }),
    )
    .addNext(
      new RealTimeEventHandlerDecorator<MeetingAgentAddRequestEvent>(
        realTimeEventHandler,
        RealTimeEventName.MEETING_CHATBOT_DELETE_REQUEST,
      ).observeEvent((event) => {
        logger.info(RealTimeEventName.MEETING_CHATBOT_DELETE_REQUEST, event?.payload);
        void dispatch(
          getAllNotifications({
            page: 1,
            limit: 10,
            read: false,
          }),
        );
    void dispatch(getNotificationCounts());

        dispatch(MeetingThunks.findUpcoming({ page: 1, limit: 20 }));
      }),
    );
};
