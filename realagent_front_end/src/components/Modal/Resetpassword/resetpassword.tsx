import { Button, Modal } from "@mantine/core";
import "../../../pages/Authentication/ForgotPasswordScreen/ForgotpasswordScreen.css";
import { Logowhite } from "../../../assets";
import { useNavigate } from "react-router-dom";

interface ResetPasswordModalProps {
  modalOpened: boolean;
  setModalOpened: (opened: boolean) => void;
}

const ResetpasswordModal: React.FC<ResetPasswordModalProps> = ({
  modalOpened,
  setModalOpened,
}) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/");
  };
  return (
    <Modal
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      closeButtonProps={{ style: { display: "none" } }}
      title={
        <div className="header">
          <img src={Logowhite} alt="logo" className="logo" />
        </div>
      }
      centered
      classNames={{ header: "modalHeader" }}
    >
      <div
        className="content"
        style={{
          marginTop: "70px",
        }}
      >
        <h1 className="title" style={{ marginLeft: "0px" }}>
          Password Changed Successfully{" "}
        </h1>
        <p className="subtitle" style={{ marginLeft: "0px" }}>
          Your account security has been updated{" "}
        </p>
        <Button
          className="submitButton"
          type="submit"
          style={{ marginTop: "20px" }}
          onClick={handleButtonClick}
        >
          Close{" "}
        </Button>
      </div>
    </Modal>
  );
};

export default ResetpasswordModal;
