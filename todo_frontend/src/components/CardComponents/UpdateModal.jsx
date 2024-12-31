import React, { useState, useEffect } from "react";
import "./UpdateModal.css";

const UpdateModal = ({ isOpen, onClose, card }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    deadline: "",
  });
  const [errorMessage, setErrorMessage] = useState('');

  function giveDate(dateString) {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const hours = String(dateObject.getHours()).padStart(2, '0');
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    return formattedDate;
  }

  useEffect(() => {

    if (isOpen && card) {
      setFormData({
        title: card.title,
        description: card.description,
        startDate: giveDate(card.startDate),
        deadline: giveDate(card.deadline)
      });
    }
  }, [isOpen, card]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const hasChanges = 
      formData.title !== card.title ||
      formData.description !== card.description ||
      formData.startDate !== giveDate(card.startDate) ||
      formData.deadline !== giveDate(card.deadline);
    if (!hasChanges) {
      setErrorMessage('Updates can be done only when something is changed');
      return false;
    }
    const start = new Date(formData.startDate);
    const end = new Date(formData.deadline);
    if (end <= start) {
      setErrorMessage('Deadline must be after the start date!');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const missionData = {
          id: card.id,
          title: formData.title,
          description: formData.description,
          startTime: formData.startDate,
          endTime: formData.deadline,
      };
      try {
        const response = await fetch('http://localhost:8080/todos', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(missionData),
        });
        if (response.ok) {
          window.location.reload(true);
        } else {
          alert('Failed to update mission.');
        }
      } catch (error) {
        console.error('Error updating mission:', error);
        alert('Error Updating Mission');
      }
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="form-modal-overlay">
      <div className="form-modal-content">
        <button className="modal-close" onClick={onClose}>
        ✖
        </button>
        <h2 className="modal-title">Update Mission Details</h2>
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="modal-input">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-input">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-input">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="datetime-local"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-input">
            <label htmlFor="deadline">Deadline</label>
            <input
              type="datetime-local"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
