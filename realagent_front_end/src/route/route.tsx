import { AuthRoutes, ProtectedRoutes, WaitinglistRoutes } from '../router';
import { useAppDispatch, useAppSelector } from '../store';
import { useEffect } from 'react';
import { getConnectedAccounts, getUserData } from '../store/features/authentication';
import { chatAPI } from '../store/features/chat/chatAPI';
import { toast } from 'sonner';
import { useAuthRedirect, useTokenValidator } from '../hooks';
import ChatbotThunks from '../store/features/chatBot/thunks';
import MeetingThunks from '../store/features/meetings/thunks';
import { emailAgentAPI } from '../store/features/emailAgent/emailAgentAPI';
import { startSocket } from '../helper/socket/realtimeSocket';
import { getSavedNumber, getVoiceConfig } from '../store/features/ReceptionistAgent';
import UserChatbotThunks from '../store/features/userChatBot/thunks';
import { AgentType } from '../common/enum/agent.enum';
import {
  getVoiceConfig as getColdVoiceConfig,
  getSavedNumber as getColdSavedNumber,
} from '../store/features/ColdCallBot';

function CustomRouter() {
  const dispatch = useAppDispatch();
  const rootState = useAppSelector((state) => state);

  const {
    authentication: { isInWaitingList, userData },
  } = rootState;

  useTokenValidator();
  const isAuthenticated = useAuthRedirect({
    redirectPath: '/',
  });

  useEffect(() => {
    if (isAuthenticated && !isInWaitingList) {
      chatAPI.generateSummaries();
      dispatch(getUserData());
      dispatch(UserChatbotThunks.getChatHistory());
      dispatch(ChatbotThunks.findOne());
      dispatch(getSavedNumber(AgentType.Receptionist));
      dispatch(getVoiceConfig(AgentType.Receptionist));
      dispatch(getColdSavedNumber(AgentType.ColdCalling));
      dispatch(getColdVoiceConfig(AgentType.ColdCalling));
      dispatch(getConnectedAccounts());

      dispatch(MeetingThunks.findUpcoming({ page: 1, limit: 20 }));
      emailAgentAPI.processMail();

      startSocket(dispatch, rootState);
    } else {
      toast.dismiss();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isInWaitingList]);

  useEffect(() => {
    if (userData?.userId) {
      dispatch(UserChatbotThunks.getAllQuestionAnswers(userData?.userId));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, userData?.userId]);

  return !isAuthenticated ? <AuthRoutes /> : isInWaitingList ? <WaitinglistRoutes /> : <ProtectedRoutes />;
}

export default CustomRouter;
