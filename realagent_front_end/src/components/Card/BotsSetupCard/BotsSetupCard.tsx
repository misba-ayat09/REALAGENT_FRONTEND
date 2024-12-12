import { Card, Image, Text, Group, Checkbox } from '@mantine/core';
import classes from './BotSetup.module.css';
import imageSrc from '../../../assets/agents.svg';

interface BotSetupCardProps {
  agentId: string;
  title: string;
  // imageSrc: string;
  listItems?: string[];
  isChecked: boolean;
  onChange: (agentId: string) => void;
  icon: React.ReactNode;
}

export function BotSetupCard({
  agentId,
  title,
  // imageSrc,
  listItems = [],
  isChecked,
  onChange,
  icon,
}: BotSetupCardProps) {
  return (
    <Card withBorder padding="lg" className={classes.card} style={{ borderColor: isChecked ? '#007BFF' : '#FFFFFF' }}>
      <Card.Section>
        <Image src={imageSrc} alt={title} height={100} pl={'10px'} pr={'10px'} pt={'10px'} />
      </Card.Section>
      <Group style={{display: 'flex', flexDirection: 'row',gap: '10px' }}>
        <Checkbox checked={isChecked} onChange={() => onChange(agentId)} />
        {icon}
        <Text fz="sm" fw={700} className={classes.title}>
          {title}
        </Text>
      </Group>
      <ul style={{ paddingLeft: '12px', marginTop: '10px' }}>
        {listItems.map((item, index) => (
          <li style={{ fontSize: '14px', fontFamily: 'Roboto', fontWeight: '400', color: '#292929' }} key={index}>
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
