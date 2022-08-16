import React, { FC } from "react";
import "./Modal.scss";
const Modal: FC<{ onCloseModal: () => void }> = ({
  children,
  onCloseModal,
}) => {
  return (
    <div className="modal__backdrop" onClick={onCloseModal}>
      <div onClick={(e) => e.stopPropagation()} className="modal">
        {children}
      </div>
    </div>
  );
};

export default Modal;
