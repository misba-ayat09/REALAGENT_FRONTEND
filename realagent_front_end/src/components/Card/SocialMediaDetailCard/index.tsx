/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, Image, Flex, ActionIcon } from "@mantine/core";
import classes from "./SocialMediaDetailCard.module.css";
import { Icon } from '../../common/Icons/Icon';
import { IconType } from '../../common/Icons';
// import { Facebook, Instagram, LinkedIn, Twitter } from "../../../assets";
import { SocialMedia } from "../../../common/enum";
// import PostStatisticsCard from "../PostStatisticsCard";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";

interface PostDetails {
  views: number;
  likes: number;
  reposts: number;
}

interface SocialMediaDetailCardProps {
  image?: string;
  content: string;
  postDetails: Partial<Record<SocialMedia, PostDetails>>;
}

const SocialMediaDetailCard: React.FC<SocialMediaDetailCardProps> = ({
  image,
  content,
  // postDetails,
}) => {
  // const socialMediaIcons = {
  //   [SocialMedia.FACEBOOK]: Facebook,
  //   [SocialMedia.INSTAGRAM]: Instagram,
  //   [SocialMedia.TWITTER]: LinkedIn,
  //   [SocialMedia.LINKEDIN]: Twitter,
  // };

  const [expand, setExpand] = useState(false);

  return (
    <Flex className={classes.Card} gap={10}>
      {image && (
        <Flex h={'100%'}>
          <Image
            src={image}
            className={classes.image}
            style={{ height: '180px', width: '180px' }}
            alt="Description"
            loading="lazy"
          />
        </Flex>
      )}
      <Flex direction={'column'} h={'100%'} gap={50} w={'100%'}>
        <Flex w={'100%'} h={'100%'} justify={'space-between'} gap={10}>
          <Flex direction={'column'} w={'100%'}>
            <Text fz={{ lg: 14 }} pr={40} lineClamp={3}>
              {content}
            </Text>
          </Flex>
          <Flex pos={'relative'} h={'100%'}>
            <ActionIcon variant="transparent" color="#000000" onClick={() => setExpand((e) => !e)}>
              {expand ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
            </ActionIcon>
          </Flex>
        </Flex>
        <Flex justify={'space-between'} align={'center'}>
          <Flex gap={20} align="center" justify="space-between">
            {/* {Object.entries(postDetails).map(([key, value]) => (
              <PostStatisticsCard
                key={key}
                // label={key}
                // labelImage={
                //   socialMediaIcons[key as keyof typeof socialMediaIcons]
                // }
                // likes={value.likes}
                // views={value.views}
                // reposts={value.reposts}
                // isExpanded={expand}
              />
            ))} */}
          </Flex>
          <Flex justify={'space-between'} align={'center'}>
            <Icon icon={IconType.Delete} style={{ width: '34px', height: '34px' }} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SocialMediaDetailCard;
