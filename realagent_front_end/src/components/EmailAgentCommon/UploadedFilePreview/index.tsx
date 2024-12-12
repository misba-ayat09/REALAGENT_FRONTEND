import { IconX } from '@tabler/icons-react';
import { IconType } from '../../common/Icons';
import { Icon } from '../../common/Icons/Icon';
import { FlexBox } from '../../common/FlexBox/FlexBox';
import { Text } from '@mantine/core';
import { FileType } from '../../../common/enum';
import { email_agent_common_bg } from '..';
const UploadedFile: React.FC<{
  fileName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete: (e: React.MouseEvent<any>) => void;
}> = (props) => {
  const { fileName, onDelete } = props;
  return (
    <FlexBox
      margin={'20px 0 0 0'}
      padding={'0px 20px'}
      borderRadius={5}
      style={{
        borderLeft: 'rgba(0, 123, 255, 1) 1px solid',
        overflow: 'hidden',
        flexShrink: '0',
        maxWidth: '200px',
        background: email_agent_common_bg,
        color: 'black',
      }}
      container
      alignContent="center"
      justifyContent="space-between"
      width={'80%'}
      backgroundColor="white"
      height={50}>
      <RelevantIconForFileType fileType={FileType.Unknown} />
      <Text
        my={'auto'}
        fw={400}
        style={{
          textAlign: 'center',
          flexShrink: 0,
          width: '76%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        fz={14}>
        {fileName}
      </Text>
      <IconX onClick={onDelete} color="black" style={{ margin: 'auto 0' }} />
    </FlexBox>
  );
};

const RelevantIconForFileType: React.FC<{ fileType: FileType }> = ({ fileType }) => {
  return {
    [FileType.Document]: <Icon icon={IconType.PDF} />,
    [FileType.Image]: <Icon icon={IconType.PDF} />,
    [FileType.Audio]: <Icon icon={IconType.PDF} />,
    [FileType.Unknown]: <Icon icon={IconType.PDF} />,
    [FileType.Video]: <Icon icon={IconType.PDF} />,
  }[fileType];
};

export default UploadedFile;
