import React from "react";
import { Button, Icon, Modal } from "semantic-ui-react";

export const MyModal = ({ open, handleCloseModal }) => {
  return (
    <Modal
      style={{
        marginTop: "0px !important",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      size="mini"
      open={open}
      onClose={() => handleCloseModal(open)}
    >
      <Modal.Header>Delete Your Account</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete your account</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => handleCloseModal(open)}>
          No
        </Button>
        <Button positive onClick={() => handleCloseModal(open)}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
