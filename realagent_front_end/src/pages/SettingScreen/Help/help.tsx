import React from "react";
import { Flex} from "@mantine/core";
import { HeaderNav } from "../../../components";
import FAQContent from "../../../components/FAQ/faq";

export enum Tabs {
  General = "General",
  ChatInterface = "Chat Interface",
  EmbedOnSite = "Embed on Site",
  Delete = "Delete",
}

const HelpScreen: React.FC = () => {

  return (
    <Flex direction={"column"} gap={"2.5px"}>
      <HeaderNav
        title="Help"
        discription="Finding what you need"
        height={90}
      />
      <Flex bg={"#FFFFFF"}>
        <FAQContent/>
      </Flex>
    </Flex>
  );
};

export default HelpScreen;
