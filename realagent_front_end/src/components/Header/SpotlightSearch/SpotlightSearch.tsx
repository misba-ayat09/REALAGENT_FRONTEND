import { Image } from "@mantine/core";
import {
  Spotlight,
  SpotlightActionData,
  SpotlightActionGroupData,
} from "@mantine/spotlight";
import classes from "./SpotlightSearch.module.css";
import '@mantine/spotlight/styles.css';
import { Logo } from '../../../assets';
import { Icon } from '../../common/Icons/Icon';
import { IconType } from '../../common/Icons';
import { scalar } from '../../../helper';

interface SpotlightSearchProps {
  actions: (SpotlightActionGroupData | SpotlightActionData)[];
}

export const SpotlightSearch: React.FC<SpotlightSearchProps> = ({
  actions,
}) => {

  return (
    <Spotlight
      actions={actions}
      nothingFound="Nothing found..."
      highlightQuery
      scrollable
      maxHeight={'80vh'}
      searchProps={{
        leftSection: <Icon icon={IconType.Search} style={{ width: scalar(24), height: scalar(24) }} />,
        placeholder: 'Search...',
        rightSection: <Image h={scalar(30)} w={scalar(145)} src={Logo} alt="logo" />,
        rightSectionWidth: scalar(190),
      }}
      classNames={{
        action: classes.action,
        actionsGroup: classes.actionsGroup,
        actionLabel: classes.actionLabel,
        actionDescription: classes.actionDescription,
      }}
    />
  );
};
