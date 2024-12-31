import React, { useState } from "react";
import UpdateModal from './UpdateModal';
import Modal from "./Modal";
import "./Card.css";

const Card = ({ card }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [isRestoreModalOpen, setRestoreModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const getStatusClass = (status) => {
    switch (status) {
      case "CREATED":
        return "status-created";
      case "WIP":
        return "status-pending";
      case "DELETED":
        return "status-deleted";
      case "DONE":
        return "status-done";
      case "UPDATED":
        return "status-updated";
      default:
        return "";
    }
  };

  const statusMapper = new Map();
  statusMapper.set("CREATED", "ASSIGNED");
  statusMapper.set("WIP", "IN PROGRESS");
  statusMapper.set("UPDATED", "UPDATED");
  statusMapper.set("DONE", "DONE");
  statusMapper.set("DELETED", "DELETED");

  const handleDeleteClick = () => {
    setConfirmDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      const url = `http://localhost:8080/todos/${card.id}`;
      const response = await fetch(url, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log("Card deleted successfully");
        window.location.reload();
      } else {
        console.error("Failed to delete card", response.status);
        alert("Failed to delete the card. Please try again.");
      }
  
      setConfirmDeleteOpen(false);
    } catch (error) {
      console.error("Error occurred while deleting the card:", error);
      alert("An error occurred while deleting the card. Please try again.");
      setConfirmDeleteOpen(false);
    }
  };
  
  const handleMoveToBin = async () => {
    try {
      const url = `http://localhost:8080/todos/${card.id}/moveToBin`;
      const response = await fetch(url, {
        method: 'PATCH',
      });
  
      if (response.ok) {
        console.log("Card moved to bin successfully");
        window.location.reload();
      } else {
        console.error("Failed to move card to bin", response.status);
        alert("Failed to move the card to bin. Please try again.");
      }
      setConfirmDeleteOpen(false);
    } catch (error) {
      console.error("Error occurred while moving the card to bin:", error);
      alert("An error occurred while moving the card to bin. Please try again.");
      setConfirmDeleteOpen(false);
    }
  };  

  const handleRestoreModal = () => {
    setRestoreModalOpen(true);
  };

  const handleRestore = async () => {
    try {
      const url = `http://localhost:8080/todos/${card.id}/restoreFromBin`;
      const response = await fetch(url, {
        method: 'PATCH',
      });
  
      if (response.ok) {
        console.log("Card removed from bin successfully");
        window.location.reload();
      } else {
        console.error("Failed to remove card from bin", response.status);
        alert("Failed to remove the card from bin. Please try again.");
      }
      setConfirmDeleteOpen(false);
    } catch (error) {
      console.error("Error occurred while removing the card from bin:", error);
      alert("An error occurred while removing the card from bin. Please try again.");
      setConfirmDeleteOpen(false);
    }
  };

  const handleCancel = () => {
    setRestoreModalOpen(false);
    setConfirmDeleteOpen(false);
    setUpdateModalOpen(false);
  };

  return (
    <>
      <div className="card">
        <div>
          <h2 className="card-title">{card.title}</h2>
          <p className="card-description">{card.description}</p>
          <div className="card-dates">
            <span>Start Date: {card.startDate}</span>
            <span>Deadline: {card.deadline}</span>
          </div>
        </div>
        
        {/* Trash Icon Button */}
        <div className="card-actions">
          {/* Conditionally render restore button if the card is deleted */}
          {card.status === "DELETED" && (
            <button className="card-restore-btn" onClick={handleRestoreModal}>
              <i className="fas fa-undo"></i> {/* FontAwesome Restore Icon */}
            </button>
          )}

          {card.status !== "DELETED" && card.status !== "DONE" && (
            <button className="card-update-btn" onClick={() => setUpdateModalOpen(true)}>
              <i class="fa-regular fa-pen-to-square"></i> {/* FontAwesome Update Icon */}
            </button>
          )}

          {/* Trash Icon Button */}
          <button className="card-trash-btn" onClick={handleDeleteClick}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>

        <div className={`card-status ${getStatusClass(card.status)}`}>
          {statusMapper.get(card.status)}
        </div>

        <button className="card-details-btn" onClick={() => setModalOpen(true)}>
          View Details
        </button>
      </div>

      <Modal isOpen={isModalOpen} card={card} onClose={() => setModalOpen(false)} />

      <UpdateModal isOpen={isUpdateModalOpen} card={card} onClose={() => setUpdateModalOpen(false)}/>

      {/* Confirmation Modal for Delete */}
      {isConfirmDeleteOpen && (
        <div className="confirmation-modal">
          <div className="confirmation-modal-content">
            <p>Are you sure you want to delete or move this card to the bin?</p>
            <div className="confirmation-btn-group">
              <button className="confirmation-btn delete" onClick={handleDelete}>
                Delete
              </button>
              {card.status !== "DELETED" && (
                <button className="confirmation-btn move" onClick={handleMoveToBin}>
                  Move to Bin
                </button>)}
              <button className="confirmation-btn cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for restore */}
      {isRestoreModalOpen && (
        <div className="confirmation-modal">
          <div className="confirmation-modal-content">
            <p>Are you sure you want to restore this card from the bin?</p>
            <div className="confirmation-btn-group">
              <button className="confirmation-btn restore" onClick={handleRestore}>
                Restore
              </button>
              <button className="confirmation-btn cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
