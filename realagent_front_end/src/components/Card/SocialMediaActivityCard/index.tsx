import React, { useState } from 'react';
import { Text, Flex, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SocialMedia } from '../../../common/enum';
import PostStatisticsCard from '../PostStatisticsCard';
import { PostStatistics } from '../../../store/features/socialMediaAgent';
import { GcpImage } from '../../common/Image';
import { timeSince } from '../../../utils';

interface DetailedSocialMediaCardProps {
  description: string;
  mediaURL?: string;
  postDetails: Partial<Record<SocialMedia, PostStatistics>>;
  socialMediaIcons: Partial<Record<SocialMedia, string>>;
  createdAt?: string;
}

const SocialMediaActivityCard: React.FC<DetailedSocialMediaCardProps> = ({
  description,
  postDetails,
  mediaURL,
  socialMediaIcons,
  createdAt,
}) => {
  // Using useDisclosure for modal visibility management
  const [
    opened,
    {
      // open,
      close,
    },
  ] = useDisclosure(false);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialMedia | null>(null);

  // Function to open modal with specific platform details
  const openModal = (platform: SocialMedia) => {
    setSelectedPlatform(platform);
    // open();
  };

  return (
    <>
      {/* Main SocialMediaActivityCard */}
      <Flex
        p={16}
        w="100%"
        direction="row"
        align="flex-start"
        bg="#FFFFFF"
        style={{ borderRadius: '10px', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)' }}>
        {mediaURL && <GcpImage src={mediaURL} alt="Post Image" height="120px" width="120px" />}

        <Flex direction="column" m={'10px 10px 10px 0px'} ml={mediaURL ? '10px' : 0} gap={'5px'} style={{ flex: 1 }}>
          <Text fw={600} fz={14} ff="Roboto" c="#B1B1B1">
            {createdAt && timeSince(new Date(createdAt))}
          </Text>
          <Text fz={12} c="black" mb={10} style={{ lineHeight: 1.5 }}>
            {description}
          </Text>
          <Flex wrap="wrap" gap="10px" mt="10px">
            {Object.entries(postDetails).map(([platform, stats]) => (
              <PostStatisticsCard
                key={platform}
                platform={{
                  name: platform,
                  logo: socialMediaIcons[platform as keyof typeof socialMediaIcons]!,
                }}
                statistics={{
                  likes: stats?.likes || 0,
                  comments: stats?.comments || 0,
                }}
                onClick={() => openModal(platform as SocialMedia)}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>

      <Modal opened={opened} onClose={close} bg={'#FFFFFF'} withCloseButton={false} centered size="80%">
        <Flex direction="column" gap="10px" bg={'#FFFFFF'}>
          <Flex w="100%" direction="row" align="flex-start">
            {mediaURL && <GcpImage src={mediaURL} alt="Post Image" height="120px" width="120px" />}

            <Flex
              direction="column"
              m={'10px 10px 10px 0px'}
              ml={mediaURL ? '10px' : 0}
              gap={'5px'}
              style={{ flex: 1 }}>
              <Text fw={600} fz={14} ff="Roboto" c="#B1B1B1">
                {createdAt && timeSince(new Date(createdAt))}
              </Text>
              <Text fz={12} c="black" mb={10} style={{ lineHeight: 1.5 }}>
                {description}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            {selectedPlatform && (
              <PostStatisticsCard
                platform={{
                  name: selectedPlatform,
                  logo: socialMediaIcons[selectedPlatform]!,
                }}
                statistics={{
                  likes: postDetails[selectedPlatform]?.likes || 0,
                  comments: postDetails[selectedPlatform]?.comments || 0,
                }}
              />
            )}
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default SocialMediaActivityCard;
