import React from 'react';
import '../Modal/Modal.css';

function ConfirmationModal({ onConfirm, onCancel }) {
  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this product?</p>
        <div className="modalButtons">
          <button onClick={onConfirm} className="confirmButton">Yes, Delete</button>
          <button onClick={onCancel} className="cancelButton">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
