import React from "react";
import "./Card.css";

const Card = ({ card }) => {
  return (
    <div className="card">
      <h2 className="card-title">{card.title}</h2>
      <p className="card-description">{card.description}</p>
      <div className="card-dates">
        <span>Start Date: {card.startDate}</span>
        <span>Deadline: {card.deadline}</span>
      </div>
    </div>
  );
};

export default Card;
