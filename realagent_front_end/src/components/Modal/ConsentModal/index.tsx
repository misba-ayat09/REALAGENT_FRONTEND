import React from "react";
import { Modal, Group, Text, Flex } from "@mantine/core";
import SimpleButton from "../../Button/SimpleButton";
import styles from "./index.module.css";

interface ConsentModalProps {
  opened: boolean;
  onClose: () => void;
  onAccept: () => void;
  text?: string;
  subText?: string;
  acceptLabel?: string;
  declineLabel?: string;
}

const ConsentModal: React.FC<ConsentModalProps> = ({
  opened,
  onClose,
  onAccept,
  text,
  subText,
  acceptLabel = "Accept",
  declineLabel = "Decline",
}) => {
  return (
    <Modal opened={opened} onClose={onClose} withCloseButton={false}>
      <Flex direction={"column"} h={"155px"} justify={"center"} gap={"24px"}>
        <Flex direction={"column"} justify={"center"} gap={"5px"}>
          {text && <Text className={styles.text}>{text}</Text>}
          {subText && <Text className={styles.subText}>{subText}</Text>}
        </Flex>
        <Group justify="center" mt="md">
          <SimpleButton variant="light" text={declineLabel} onClick={onClose} />
          <SimpleButton color="#B24432" text={acceptLabel} onClick={onAccept} />
        </Group>
      </Flex>
    </Modal>
  );
};

export default ConsentModal;
