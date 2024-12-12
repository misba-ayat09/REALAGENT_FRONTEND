import { Box, Divider, Flex, ScrollArea, Text } from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";
import { IconType } from "../common/Icons";
import { Icon } from "../common/Icons/Icon";
import classes from "./Navigation1.module.css";

const Navigation1: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationLinks = [
    { label: "Publish", icon: IconType.Publish, link: "/contentcalender/publish" },
    { label: "Activities", icon: IconType.Activity, link: "/contentcalender/activity" },
    { label: "Brand setup", icon: IconType.Brand, link: "/contentcalender/brand" },
    { label: "Create Poster", icon: IconType.Poster, link: "/contentcalender/create-poster" },
  ];

  return (
    <nav className={classes.navbar}>
      <ScrollArea>
        {/* Header Section */}
        <Box className={classes.header}>
          <Icon icon={IconType.Social_Media} size={50} />
          <Text className={classes.title}>Social Media Bot</Text>
        </Box>

        <Divider className={classes.divider} />

        {/* Navigation Links */}
        <Box className={classes.links}>
          <Text className={classes.title}>Discover</Text>
          {navigationLinks.map((item) => (
            <Flex
              key={item.link}
              className={`${classes.navItem} ${
                location.pathname === item.link ? classes.active : ""
              }`}
              onClick={() => navigate(item.link)}
            >
              <Icon icon={item.icon} size={20} />
              <Text className={classes.linkText}>{item.label}</Text>
            </Flex>
          ))}
        </Box>
      </ScrollArea>
    </nav>
  );
};

export default Navigation1;
