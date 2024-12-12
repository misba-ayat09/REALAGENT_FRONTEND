import { Flex, Image, Text } from "@mantine/core";
import { cx } from "../../helper";
import SocialMediaLinkClasses from "./SocialMediaLink.module.css";
import { useMediaQuery } from "@mantine/hooks";

interface SocialMediaLinkProps {
  onClick: () => void;
  icon: string;
  title: string;
  tag: string;
  classes: {
    title: string;
    tag: string;
  };
}

const SocialMediaLink: React.FC<SocialMediaLinkProps> = ({
  onClick,
  icon,
  title,
  tag,
  classes,
}) => {
  const shouldShowSocialMediaText = useMediaQuery("(min-width: 952px)");

  return (
    <Flex
      justify={"center"}
      align={"center"}
      gap={"10px"}
      onClick={onClick}
      className={SocialMediaLinkClasses.cursor}
    >
      <Image h={"36px"} w={"36px"} src={icon} />
      {shouldShowSocialMediaText ? (
        <Flex
          direction={"column"}
          justify={"center"}
          align={"flex-start"}
          gap={"1px"}
        >
          <Text className={cx(classes.title, SocialMediaLinkClasses.cursor)}>
            {title}
          </Text>
          <Text className={cx(classes.tag, SocialMediaLinkClasses.cursor)}>
            {tag}
          </Text>
        </Flex>
      ) : null}
    </Flex>
  );
};

export default SocialMediaLink;
