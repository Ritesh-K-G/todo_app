import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, card }) => {
  if (!isOpen) return null;

  const [status, setStatus] = useState(card.status);

  const statusMapper = new Map();
  statusMapper.set("CREATED", "ASSIGNED");
  statusMapper.set("WIP", "IN PROGRESS");
  statusMapper.set("UPDATED", "UPDATED");
  statusMapper.set("DONE", "DONE");
  statusMapper.set("DELETED", "DELETED");

  const handleInProgress = () => {
    if (status === "CREATED") {
      setStatus("WIP");
      updateCardStatus(card.id, "WIP");
    }
  };

  const handleMarkDone = () => {
    if (status === "WIP") {
      setStatus("DONE");
      updateCardStatus(card.id, "DONE");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">{card.title}</h2>
        <p className="modal-description">{card.description}</p>
        <div className="modal-info">
          <p><strong>Start Date:</strong> {card.startDate}</p>
          <p><strong>Deadline:</strong> {card.deadline}</p>
          <p><strong>Status:</strong> {statusMapper.get(status)}</p>
        </div>

        {/* Action Buttons */}
        <div className="modal-actions">
          {status === "CREATED" && (
            <button className="btn" onClick={handleInProgress}>
              Move to In Progress
            </button>
          )}
          {status === "WIP" && (
            <button className="btn" onClick={handleMarkDone}>
              Mark as Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
