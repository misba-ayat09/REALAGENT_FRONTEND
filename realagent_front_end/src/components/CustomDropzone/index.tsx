/* eslint-disable react-refresh/only-export-components */
import { Dropzone, DropzoneProps } from '@mantine/dropzone';
import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconX, IconPhoto } from '@tabler/icons-react';
import classes from './custom-dropzone.module.css';
import { toast } from 'sonner';

interface CustomDropzoneProps extends DropzoneProps {
  title?: string;
  subTitle?: string;
  width?: number | string;
  minHeight?: number | string;
  fullWidth?: boolean; // New prop to control width
}

export const CustomDropzone: React.FC<CustomDropzoneProps> = ({
  openRef,
  onDrop,
  onReject,
  maxSize = 5 * 1024 ** 2,
  accept,
  title = 'Drag images here or click to select files',
  subTitle = 'Supported File Types: .pdf',
  width = '386px',
  minHeight = 76,
  fullWidth,
  ...props
}) => {
  return (
    <Dropzone
      openRef={openRef}
      onDrop={onDrop}
      onReject={(files) => (onReject ? onReject : toast.warning(files[0]?.errors[0]?.message))}
      maxSize={maxSize}
      accept={accept}
      w={fullWidth ? '100%' : width}
      maw={fullWidth ? '100%' : width}
      {...props}>
      <Group
        justify="center"
        gap={8}
        mih={minHeight}
        maw={fullWidth ? '100%' : width}
        w={fullWidth ? '100%' : width}
        style={{
          pointerEvents: 'none',
          border: '1px dotted var(--mantine-color-dimmed)',
        }}>
        <Dropzone.Accept>
          <IconUpload
            style={{
              width: rem(32),
              height: rem(32),
              color: 'var(--mantine-color-blue-6)',
            }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{
              width: rem(32),
              height: rem(32),
              color: 'var(--mantine-color-red-6)',
            }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            style={{
              width: rem(32),
              height: rem(32),
              color: 'var(--mantine-color-dimmed)',
            }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text className={classes.dropzoneTitle} inline>
            {title}
          </Text>
          <Text className={classes.dropzoneSubTitle} inline mt={7}>
            {subTitle}
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};
