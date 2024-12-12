import { Flex, Group, Text } from "@mantine/core";
import classes from "./Header-Nav.module.css";

interface HeaderNavProps {
  title: string;
  discription: string;
  height: number;
}

const HeaderNav: React.FC<HeaderNavProps> = ({
  title,
  discription,
  height,
}) => {
  return (
    <Group
      justify="space-between"
      h={height}
      py="sm"
      px="lg"
      bg={"#FFFFFF"}
      className={classes.root}
    >
      <Flex direction={"column"} justify={"center"} align={"flex-start"}>
        <Text size="xl" fw={700}>
          {title}
        </Text>
        <Text c="dimmed">{discription}</Text>
      </Flex>
    </Group>
  );
};

export default HeaderNav;
