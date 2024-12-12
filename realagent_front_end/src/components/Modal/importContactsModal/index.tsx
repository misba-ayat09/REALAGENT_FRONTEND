import React, { useRef, useState } from "react";
import { Modal, Text, Button, Group, Flex, Box } from '@mantine/core';
import classes from "./ContactModal.module.css";
import { toast } from "sonner";
import { MS_EXCEL_MIME_TYPE } from '@mantine/dropzone';
import { CustomDropzone } from "../../CustomDropzone";
import { IconDownload, IconFileExcel } from "@tabler/icons-react";
import { contactAPI } from "../../../store/features/AddContact";
import { useAppDispatch } from "../../../store/hooks/hooks";
import { getallContact } from "../../../store/features/AddContact/contactSlice";

interface ImportContactsModalProps {
  open: boolean;
  onClose: () => void;
}

const ImportContactsModal: React.FC<ImportContactsModalProps> = ({
  open,
  onClose,
}) => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<File|null>(null);
  const dispatch = useAppDispatch();

  const openRef = useRef<() => void>(null);




  const handleSubmit = async () => {
    if (!files) {
      alert('No files selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', files); 

    try {
      setUploading(true);
     await contactAPI.importContact(formData);
     dispatch(getallContact())
     onClose()
     
      toast.success('Contacts imported successfully');
    } catch (error) {
      toast.error('Error importing contacts');
      console.error('File upload failed', error);
    } finally {
      setUploading(false);
    }
  };

  const handleOnClose = () => {
    onClose();
  };

  return (
    <>
      <Modal.Root
        opened={open}
        onClose={onClose}
        centered
        classNames={{
          root: classes.modalRoot,
        }}>
        <Modal.Overlay
          classNames={{
            overlay: classes.modalOverlay,
          }}
        />
        <Modal.Content
          classNames={{
            content: classes.modalContent,
          }}>
          <Modal.Header>
            <Group style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-start' }}>
              <Text className={classes.modalTitle}>Import Contacts</Text>
              <Text className={classes.modalTitle1}>Contacts exported will be reflected in the contact list</Text>
            </Group>
          </Modal.Header>
          <Modal.Body
            classNames={{
              body: classes.modalBody,
            }}>
            <Group justify="start">
              <Box
                className={classes.inputGroup}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <Text className={classes.modalTitle2}>Upload Contacts</Text>

                <CustomDropzone
                  openRef={openRef}
                  //  fullWidth={true}
                  onDrop={(files: File[]) => {
                    if (files.length > 0) {
                      setFiles(files[0]); // Select only the first file
                    }
                  }}
                  accept={MS_EXCEL_MIME_TYPE}
                />
              </Box>
              <Flex w={'100%'} gap={'md'} direction={'column'}>
                <Text className={classes.modalTitle2}>Download sample excel file</Text>
                <Flex
                  px={5}
                  bg={'#E6F2FF'}
                  h={'50px'}
                  w={'50%'}
                  align={'center'}
                  justify={'space-between'}
                  onClick={() => {
                    window.open('https://storage.googleapis.com/realtorbot-public/documents/contacts.xlsx');
                  }}>
                  <IconFileExcel></IconFileExcel>
                  <Text className={classes.link}>Sample Excel</Text>
                  <IconDownload color={'#007BFF'}></IconDownload>
                </Flex>
              </Flex>

              <Flex gap={'md'} w={'100%'} justify={'flex-end'} mt={'10px'} mr={'20px'}>
                <Button className={classes.cancelButton} onClick={handleOnClose}>
                  Cancel
                </Button>
                <Button
                  variant="default"
                  className={classes.addButton}
                  onClick={handleSubmit}
                  loading={uploading}
                  disabled={!files}
                  bg={'#007BFF'}>
                  Import
                </Button>
              </Flex>
            </Group>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default ImportContactsModal;
