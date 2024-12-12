import { Checkbox, Image } from "@mantine/core";
import classes from "./SocialMediaCheckBox.module.css";

interface SocialMediaCheckBoxProps {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  labelElement: string;
}

const SocialMediaCheckBox: React.FC<SocialMediaCheckBoxProps> = ({
  checked = false,
  onChange,
  labelElement,
}) => {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      color={"violet"}
      classNames={{
        root: classes.root,
      }}
      label={<Image src={labelElement} alt="" width={16} height={16} />}
    />
  );
};

export default SocialMediaCheckBox;
