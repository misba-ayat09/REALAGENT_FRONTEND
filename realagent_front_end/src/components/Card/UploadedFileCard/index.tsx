import React from "react";
import { Flex, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import styles from "./UploadedFileCard.module.css";
import cx from "classnames";
import { IconType } from '../../common/Icons';
import { Icon } from '../../common/Icons/Icon';

interface UploadedFileCardProps {
  fileName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete?: (e?: React.MouseEvent<any>) => void;
  customIcon?: IconType;
  modalText?: string;
  modalSubText?: string;
  className?: string;
  style?: React.CSSProperties;
  showPreview?: boolean;
  previewUrl?: string;
}

const UploadedFileCard: React.FC<UploadedFileCardProps> = ({
  fileName,
  onDelete,
  customIcon = IconType.PDF,
  className,
  style,
  showPreview = false,
  previewUrl,
}) => (
  <Flex
    className={cx(styles.card, className)}
    align="center"
    justify="space-between"
    style={style}
    gap={"10px"}
  >
    {showPreview && previewUrl ? (
      <img src={previewUrl} alt="File preview" className={styles.preview} />
    ) : (
      <Icon icon={customIcon} />
    )}
    <Text className={styles.fileName} truncate>
      {fileName}
    </Text>
    {onDelete && <IconX className={styles.icon} onClick={(e) => onDelete(e)} />}
  </Flex>
);

export default UploadedFileCard;
