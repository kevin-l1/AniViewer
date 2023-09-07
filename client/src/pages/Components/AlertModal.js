import './AlertModal.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AlertModal({ show, text, handleClose }) {
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
