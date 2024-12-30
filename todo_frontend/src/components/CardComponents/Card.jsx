import React, { useState } from "react";
import Modal from "./Modal";
import "./Card.css";

const Card = ({ card }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const getStatusClass = (status) => {
    switch (status) {
      case "COMPLETED":
        return "status-completed";
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
        <div className={`card-status ${getStatusClass(card.status)}`}>
          {card.status}
        </div>
        <button className="card-details-btn" onClick={() => setModalOpen(true)}>
          View Details
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>{card.title}</h2>
        <p>{card.description}</p>
        <p><strong>Start Date:</strong> {card.startDate}</p>
        <p><strong>Deadline:</strong> {card.deadline}</p>
        <p><strong>Status:</strong> {card.status}</p>
      </Modal>
    </>
  );
};

export default Card;
