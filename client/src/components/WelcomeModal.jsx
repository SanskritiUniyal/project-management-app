import React from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const WelcomeModal = ({ isOpen, toggle, username }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    toggle();
    navigate("/dashboard");
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Welcome!</ModalHeader>
      <ModalBody>
        <p>Hello <strong>{username}</strong>, you’ve successfully logged in.</p>
        <Button color="primary" onClick={handleContinue}>Go to Dashboard</Button>
      </ModalBody>
    </Modal>
  );
};

export default WelcomeModal;
