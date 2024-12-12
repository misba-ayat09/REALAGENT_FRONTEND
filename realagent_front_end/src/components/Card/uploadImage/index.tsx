import React from "react";
import { Checkbox, Flex, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import styles from "./UploadImageCard.module.css";
import { IconType } from '../../common/Icons';

interface UploadeImageCardProps {
  fileName: string;
  onDelete?: (e?: React.MouseEvent<any>) => void;
  customIcon?: IconType;
  className?: string;
  style?: React.CSSProperties;
  showPreview?: boolean;
  previewUrl?: string;
  isSelected?: boolean;
  onSelectChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadeImage: React.FC<UploadeImageCardProps> = ({
  fileName,
  onDelete,
  showPreview = false,
  previewUrl,
  isSelected = false,
  onSelectChange,
}) => (
  <Flex className={styles.container}>
    {showPreview && previewUrl ? (
      <div className={styles.imageContainer}>
        <img src={previewUrl} alt="File preview" className={styles.preview} />
        <Checkbox
          className={styles.checkbox}
          checked={isSelected}
          onChange={onSelectChange}
        />
      </div>
    ) : (
      <Text className={styles.fileName} truncate>
        {fileName}
      </Text>
    )}
    {onDelete && <IconX className={styles.icon} onClick={(e) => onDelete(e)} />}
  </Flex>
);

export default UploadeImage;
