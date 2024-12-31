import React, { useState } from "react";
import "./Modal.css";
import ProgressTimeline from "./ProgressTimeline";

const Modal = ({ isOpen, onClose, card }) => {
  if (!isOpen) return null;

  const status = card.status;

  const statusMapper = new Map();
  statusMapper.set("CREATED", "ASSIGNED");
  statusMapper.set("WIP", "IN PROGRESS");
  statusMapper.set("UPDATED", "UPDATED");
  statusMapper.set("DONE", "DONE");
  statusMapper.set("DELETED", "DELETED");

  const handleInProgress = async () => {
    if (status === "CREATED") {
      try {
        const url = `http://localhost:8080/todos/${card.id}/markWIP`;
        const response = await fetch(url, {
          method: 'PATCH',
        });
    
        if (response.ok) {
          console.log("Task moved to in progress successfully");
          window.location.reload();
        } else {
          console.error("Failed to update task", response.status);
          alert("Failed to update the card. Please try again.");
        }
        onClose();
      } catch (error) {
        console.error("Error occurred while updating the task:", error);
        alert("An error occurred while updating the task. Please try again.");
        onClose();
      }
    }
  };

  const handleMarkDone = async () => {
    if (status === "WIP") {
      try {
        const url = `http://localhost:8080/todos/${card.id}/markDone`;
        const response = await fetch(url, {
          method: 'PATCH',
        });
    
        if (response.ok) {
          console.log("Task marked done successfully");
          window.location.reload();
        } else {
          console.error("Failed to update task", response.status);
          alert("Failed to update the task. Please try again.");
        }
        onClose();
      } catch (error) {
        console.error("Error occurred while updating the task:", error);
        alert("An error occurred while updating the task. Please try again.");
        onClose();
      }
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
          <ProgressTimeline data={card.progress}/>
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
