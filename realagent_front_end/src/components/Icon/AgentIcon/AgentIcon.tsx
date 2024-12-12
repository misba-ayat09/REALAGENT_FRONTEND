import React from 'react';
import { AgentIconType } from './AgentIconType.enum';
import { icons } from './icons';
import { AgentType } from '../../../common/enum/agent.enum';

interface IconProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: AgentType;
  type: AgentIconType;
  size?: number | string;
  radius?: number | string;
  height?: number | string;
}

const AgentIcon: React.FC<IconProps> = ({ size = 24, radius = '50%', style, icon, type, ...others }) => {
  const iconUrl = icons[icon]?.[type];

  if (!iconUrl) {
    return null;
  }

  return (
    <div style={{ width: size, height: size, borderRadius: radius, ...style }} {...others}>
      <img src={iconUrl} alt={`${icon} icon`} width="100%" height="100%" style={{ borderRadius: radius }} />
    </div>
  );
};

export default AgentIcon;
