import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Divider, Flex, Image, Text } from "@mantine/core";
import classes from "./WaitlistScreen.module.css";
import { Logo } from "../../assets";
import { LinkedIn, Twitter, YouTube } from "./assets";
import { SocialMediaLink } from "../../components";
//import { authenticationAPI } from "../../store/features/authentication/authenticationAPI";
import axios from "axios";

const WaitlistScreen: React.FC = () => {
  const [userCount, setUserCount] = useState<number | null>(null);

  // Function to fetch user count from the API
  const fetchUserCount = useCallback(async () => {
    try {
      const response = await axios.post(
        "https://dev-api.realtorbots.ai/api/realagentai/users/number-of-users",
        {},
        {
          headers: {
            Accept: "*/*",
          },
        }
      );
      if (response.data && response.data.result) {
        setUserCount(response.data.result);
      } else {
        console.error("Unexpected API response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserCount();
  }, [fetchUserCount]);

  /*const handleJoinPilotProgram = () => {
    authenticationAPI.setIsRealtorInterestedInAI();
  };*/

  const handleClickLinkedIn = useCallback(() => {
    window.open(
      "https://www.linkedin.com/company/mindspacellc/",
      "_blank",
      "noopener,noreferrer"
    );
  }, []);

  const handleClickTwitter = useCallback(() => {
    window.open(
      "https://x.com/MindspaceA94950",
      "_blank",
      "noopener,noreferrer"
    );
  }, []);

  const handleClickYouTube = useCallback(() => {
    window.open(
      "https://www.youtube.com/@MindSpaceAI",
      "_blank",
      "noopener,noreferrer"
    );
  }, []);

  return (
    <Flex className={classes.root} gap={"30px"}>
      <Image className={classes.logo} src={Logo} />

      <div className={classes.waitlist_join}>
        <Text className={`${classes.label} ${classes.text_1}`}>

          <span className={classes.highlight}>You're on the Waitlist – Your Spot is Reserved!<br /></span>
          {`Thank you for signing up! You’re currently `}
          <span className={classes.highlight} style={{ fontSize: "18px" }}>

            {userCount !== null
              ? `#${userCount + 1} `
              : ""}
          </span>
          {` on the list. We’ll notify you as soon as we expand capacity.`}
        </Text>

        <Flex justify="center" align="center" direction="column" className={classes.labelContainer}>

          <Text className={`${classes.label} ${classes.text_1}`}>

            <span className={classes.highlight}>While You Wait – Get Your Free ROI Assessment<br /></span>

            {`Discover the exact value we can bring to your business with our quick FREE ROI Assessment.`}

          </Text>

          <Button className={classes.button} onClick={() => window.open('https://share.hsforms.com/19g0ybZq7S6eCU8dUGTjrKQqbu3h?source=realtorbots', '_blank', 'noopener,noreferrer')} >
            TAKE ROI ASSESSMENT
          </Button>
        </Flex>

      </div>

      <Box pt={"30px"} className={classes.divider}>
        <Divider color="#C3C3C3" />
      </Box>

      <Flex w={"100%"} justify={"space-around"} align={"center"} gap={"10px"}>
        <SocialMediaLink
          onClick={handleClickLinkedIn}
          icon={LinkedIn}
          title="MindspaceAI"
          tag="@Mindspace AI"
          classes={{
            title: classes.socialMediaTitle,
            tag: classes.socialMediaTag,
          }}
        />
        <SocialMediaLink
          onClick={handleClickTwitter}
          icon={Twitter}
          title="MindspaceAI"
          tag="@Mindspace AI"
          classes={{
            title: classes.socialMediaTitle,
            tag: classes.socialMediaTag,
          }}
        />
        <SocialMediaLink
          onClick={handleClickYouTube}
          icon={YouTube}
          title="MindspaceAI"
          tag="@Mindspace AI"
          classes={{
            title: classes.socialMediaTitle,
            tag: classes.socialMediaTag,
          }}
        />
      </Flex>
    </Flex>
  );
};

export default WaitlistScreen;
