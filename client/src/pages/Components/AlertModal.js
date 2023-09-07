import './AlertModal.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function AlertModalBS({ show, text, handleClose }) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="alert">
          <h4>{text}</h4>
        </Modal.Body>
        <Modal.Footer className="alert">
          <Button
            className="close-button"
            variant="secondary"
            onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default function AlertModal({ id, text }) {
  return (
    <>
      <div
        class="modal fade"
        id={id}
        tabindex="-1"
        role="dialog"
        aria-labelledby="alertModal"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            {/* <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div> */}
            <div class="modal-body alert">{text}</div>
            {/* <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
