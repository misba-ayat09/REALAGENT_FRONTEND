import React from "react";
import { Card, Group, Text, ActionIcon } from "@mantine/core";
import { Trash } from "tabler-icons-react";

interface TopicCardProps {
  topic: string;
  onRemove: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onRemove }) => {
  return (
    <Card shadow="sm" radius={10} bg={"#F0F5F8"} py={8}>
      <Group justify="space-between" align="center" gap="md" p={0} m={0}>
        <Text component="span" fw={400} c="#6092CD">
          {topic}
        </Text>
        <ActionIcon variant="light" color="red" onClick={onRemove} ml={"auto"}>
          <Trash size={16} />
        </ActionIcon>
      </Group>
    </Card>
  );
};

export default TopicCard;
