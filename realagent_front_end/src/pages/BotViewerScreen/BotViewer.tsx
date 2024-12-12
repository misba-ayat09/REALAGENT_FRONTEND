import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_PAGES } from '../../router/route';

import BotViewerNew from '../../assets/BotVNew.svg';
import './BotView.css';
import { useAppSelector, useAppDispatch } from '../../store';
import { getallAiAgents } from '../../store/features/aiAgents/aiAgentsSlice';
import { AgentType } from '../../common/enum/agent.enum';


const BotViewer: React.FC = () => {
  const accessableAgents = useAppSelector((state) => state?.authentication?.userData?.accessableAgents || []);
  const aiAgents = useAppSelector((state) => state?.aiAgents?.result || []);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getallAiAgents());
  }, [dispatch]);

  const navigate = useNavigate();
  const accessibleAiAgents = aiAgents.filter((agent) => accessableAgents.includes(agent._id));
  const handleNavigation = (agentType: AgentType, path: string) => {
    const isTypeAccessible = accessibleAiAgents.some((agent) => agent.type === agentType);
    if (isTypeAccessible) navigate(path);
  };

  return (
    <div className="botviewer-container">
      <img src={BotViewerNew} alt="BotViewer Screen" className="botviewer-background" />
      <button
        className="transparent-btn btn-ai-research"
        onClick={() => handleNavigation(AgentType.Research, PATH_PAGES.researchHome)} // AI Research Agent Navigation
      />
      <button
        className="transparent-btn btn-social-media"
        onClick={() => handleNavigation(AgentType.SocialMedia, PATH_PAGES.publish)} // Social Media Agent Navigation
      />
      <button
        className="transparent-btn btn-ai-cold"
        onClick={() => handleNavigation(AgentType.ColdCalling, PATH_PAGES.campaign)} // AI ColdCalling Agent Navigation
      />
      <button
        className="transparent-btn btn-ai-phn"
        onClick={() => handleNavigation(AgentType.Receptionist, PATH_PAGES.receptionistHome)} // AI Receptionist Navigation
      />
      <button
        className="transparent-btn btn-web-agent"
        onClick={() => handleNavigation(AgentType.Website, PATH_PAGES.websiteActivities)} // Web Agent Navigation
      />
      <button
        className="transparent-btn btn-manager-bot"
        onClick={() => navigate(PATH_PAGES.dashboardHome)} // dashboard Navigation
      />
      <button
        className="transparent-btn btn-assistant-bot"
        onClick={() => navigate(PATH_PAGES.dashboardHome)} // dashboard Navigation
      />
    </div>
  );
};

export default BotViewer;
