import React from "react";
import { Modal, Text, Button, Group } from "@mantine/core";
import classes from "./delete.module.css";
import { IconType } from '../../common/Icons';
import { Icon } from '../../common/Icons/Icon';
import { deleteContact } from "../../../store/features/AddContact/contactSlice";
import { useAppDispatch } from "../../../store";

interface DeleteProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteProps> = ({ open, onClose, id }) => {
  const dispatch = useAppDispatch();

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(deleteContact(id));
  };

  return (
    <>
      <Modal.Root
        opened={open}
        onClose={onClose}
        centered
        classNames={{
          root: classes.modalRoot,
        }}
      >
        <Modal.Overlay
          classNames={{
            overlay: classes.modalOverlay,
          }}
        />
        <Modal.Content
          classNames={{
            content: classes.modalContent,
          }}
        >
          <Modal.Header
            classNames={{
              header: classes.modalHeader,
            }}
          >
            <Text
              classNames={{
                root: classes.modalTitle,
              }}
            >
              Delete Contact{" "}
            </Text>
            <Modal.CloseButton
              classNames={{
                close: classes.modalClose,
              }}
            />
          </Modal.Header>
          <Modal.Body
            classNames={{
              body: classes.modalBody,
            }}
          >
            <Group justify="center">
              <Text
                style={{ fontSize: "16px", fontWeight: "600", color: "black" }}
              >
                Are you sure you want to delete this Contact?
              </Text>
              <Text style={{ fontWeight: "400px", color: "#C0C6CC" }}>
                This action cannot be undone
              </Text>
              <Button
                bg={"#007BFF"}
                c={"#FFFFFF"}
                w={"184px"}
                h={"44px"}
                mt={30}
                radius={42}
              >
                Cancel
              </Button>
              <Button
                bg={"rgba(252, 121, 99, 0.1)"}
                c={"rgba(178, 68, 50, 1)"}
                w={"184px"}
                h={"44px"}
                mt={30}
                radius={42}
                leftSection={<Icon icon={IconType.delete1} />}
                onClick={(e) => handleDelete(e, id)}
              >
                Yes, Remove
              </Button>
            </Group>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default DeleteModal;
