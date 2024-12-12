import { Flex, Divider, useMantineTheme } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import SimpleButton from "../../../../../components/Button/SimpleButton";
import { useAppDispatch, useAppSelector } from "../../../../../store";
import { FileCategory } from "../../../../../common/enum";
import {
  getDataSourceFiles,
  removeFile,
  uploadDataSourceFile,
  uploadFile,
} from "../../../../../store/features/fileHub";
import { toast } from "sonner";
import {
  fileHubAPI,
  FileUploadResponse,
} from "../../../../../store/features/fileHub/fileHubAPI";
import { CustomDropzone } from "../../../../../components/CustomDropzone";
import { PDF_MIME_TYPE } from "@mantine/dropzone";
import WithModal from "../../../../../components/Modal/WithModal";
import ConsentModal from "../../../../../components/Modal/ConsentModal";
import TrashButton from "../../../../../components/Button/TrashButton";
import { useLoadingState } from "../../../../../hooks";
import UploadedFileCard from "../../../../../components/Card/UploadedFileCard";
// import classes from "./files.module.css";

const FILE_MIME_TYPES = [
  ...PDF_MIME_TYPE,
  // "image/jpeg",
  // "image/png",
  // "application/pdf",
  // "application/msword",
  // "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const FilesDataSource: React.FC = () => {
  const dispatch = useAppDispatch();
  const openRef = useRef<() => void>(null);
  const theme = useMantineTheme();

  const [isLoading, startLoading, finishLoading] = useLoadingState();
  const uploadedFileNames = useAppSelector((state) => state.fileHub.allFiles);
  const [selectedFile, setSelectedFile] = useState<File | undefined>();

  const handleDropFiles = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    startLoading();

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("fileCategory", FileCategory.PDF);
      formData.append("fileName", selectedFile.name);

      // Upload to GCP
      const uploadedFile = await uploadFile({
        fileCategory: FileCategory.PDF,
        file: formData,
      });

      if (!uploadedFile?.fileName) {
        throw new Error("Failed to upload the file");
      }

      // Add to datasource file
      await dispatch(
        uploadDataSourceFile({
          contentType: FileCategory.PDF,
          fileName: uploadedFile.fileName,
        })
      );

      setSelectedFile(undefined);
      dispatch(getDataSourceFiles());
      toast.success("File Uploaded Successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload and add data source");
    } finally {
      finishLoading();
    }
  };

  const handleDeleteFile =
    (e?: React.MouseEvent<HTMLButtonElement>) => (file: FileUploadResponse) => {
      e?.preventDefault();
      e?.stopPropagation();

      if (!file || !file._id) {
        toast.error("Invalid file selected for deletion");
        return;
      }

      fileHubAPI
        .deleteDataSourceFile(file._id)
        .then(() => {
          return dispatch(
            removeFile({
              fileName: file.fileName,
              fileCategory: FileCategory.PDF,
            })
          );
        })
        .then(() => {
          dispatch(getDataSourceFiles());
          toast.success("File removed from data source");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to delete this file");
        });
    };

  useEffect(() => {
    dispatch(getDataSourceFiles());
  }, [dispatch]);

  return (
    <div>
      <Flex w={'100%'}>
        <Flex w={'50%'} direction={'column'} gap={'24px'}>
          <CustomDropzone openRef={openRef} onDrop={handleDropFiles} accept={FILE_MIME_TYPES} />
          <div>
            <SimpleButton loading={isLoading} disabled={!selectedFile} text="Upload" mt={24} onClick={handleUpload} />
          </div>
          {selectedFile && (
            <UploadedFileCard fileName={selectedFile.name} onDelete={() => setSelectedFile(undefined)} />
          )}
        </Flex>
        <Flex px={'20px'} justify={'center'}>
          <Divider orientation="vertical" />
        </Flex>
        <Flex w={'50%'} direction={'column'} gap={'24px'}>
          {uploadedFileNames &&
            uploadedFileNames?.map((file) => (
              <Flex key={file._id} w={'100%'} justify={'flex-start'} align={'center'} gap={'24px'}>
                <UploadedFileCard key={file._id} fileName={file.fileName} />
                <WithModal
                  onAccept={() => handleDeleteFile()(file)}
                  ModalComponent={(e) => (
                    <ConsentModal
                      text={'Are you sure you want to delete this?'}
                      subText={'This action cannot be undone'}
                      {...e}
                    />
                  )}>
                  <TrashButton
                    iconSize={16.17}
                    defaultColor={theme.colors.azureBlue[1]}
                    iconColor={theme.colors.azureBlue[6]}
                  />
                </WithModal>
              </Flex>
            ))}
        </Flex>
      </Flex>
    </div>
  );
};

export default FilesDataSource;
