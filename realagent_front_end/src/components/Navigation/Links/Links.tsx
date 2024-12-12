import { Flex, Group, Text, UnstyledButton } from "@mantine/core";
import classes from "./Links.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationIcon, NavigationIconType } from "../NavigationIcon";
import { cx } from "../../../helper";

interface LinksGroupProps {
  icon?: NavigationIconType;
  label: string;
  link: string;
  isTextVisible?: boolean;
  strokeWidth: number;
}

export function LinksGroup(props: LinksGroupProps) {
  const { icon, label, link, isTextVisible = true, strokeWidth } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrentPath = location.pathname.toLowerCase() === link.toLowerCase();

  return (
    <>
      <UnstyledButton
        onClick={() => {
          link && navigate(link);
        }}
        className={cx(classes.navLink, {
          [classes.navLinkActive]: false,
        })}
      >
        <Group justify={isTextVisible ? "flex-start" : "center"} gap={0}>
          <Flex justify={"center"} align={"center"}>
            <NavigationIcon
              type={icon}
              color={isCurrentPath ? "#007BFF" : "#7A7A7A"}
              strokeWidth={strokeWidth}
            />
            {isTextVisible ? (
              <Text
                ml="md"
                className={cx(classes.label, {
                  [classes.labelActive]: isCurrentPath,
                })}
              >
                {label}
              </Text>
            ) : null}
          </Flex>
        </Group>
      </UnstyledButton>
    </>
  );
}
