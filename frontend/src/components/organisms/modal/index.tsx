import { Dialog, styled } from "@mui/material";
import React from "react";

interface ModalProps {
  modalOpen: boolean;
  children: React.ReactNode;
  modalOnClose : () => void
}

const StyledModal = styled(Dialog)({
  "& .MuiPaper-root": {
    maxWidth: "1000px",
    borderRadius: "12px",
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "box-shadow: 0px 11px 15px 0px #00000033",
  },
});

const Modal = ({ ...props }: ModalProps) => {

  return (
    <StyledModal open={props.modalOpen} onClose={props.modalOnClose}>
      {props.children}
    </StyledModal>
  );
};

export default Modal;
