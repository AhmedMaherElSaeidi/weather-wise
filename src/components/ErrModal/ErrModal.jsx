import "./ErrModal.css";
import React from "react";

const ErrModal = ({ closeModal, text }) => {
  return (
    <div
      className="modal d-block"
      id="protocol-modal"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <p>{text.toUpperCase()}</p>
            <p>Sorry for the inconvenience.</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrModal;
