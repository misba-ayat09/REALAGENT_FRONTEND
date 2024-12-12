import React, { useState, ReactElement, ReactNode } from "react";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  onAccept: () => void;
}

interface WithModalProps {
  onAccept: () => void;
  children: ReactNode;
  ModalComponent: React.ComponentType<ModalProps>;
}

const WithModal: React.FC<WithModalProps> = ({
  onAccept,
  children,
  ModalComponent,
}) => {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => setOpened(true);
  const handleClose = () => setOpened(false);

  const handleAccept = () => {
    setOpened(false);
    onAccept();
  };

  return (
    <>
      {React.cloneElement(children as ReactElement, { onClick: handleOpen })}
      <ModalComponent
        opened={opened}
        onClose={handleClose}
        onAccept={handleAccept}
      />
    </>
  );
};

export default WithModal;
