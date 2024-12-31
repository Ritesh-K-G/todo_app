import React, { useState } from 'react';
import './FormModal.css';

const MyModal = ({ closeModal }) => {
  const [missionName, setMissionName] = useState('');
  const [missionDetails, setMissionDetails] = useState('');
  const [startDate, setStartDate] = useState('2025-01-01T19:30');
  const [deadline, setDeadline] = useState('2025-01-02T20:30');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    if (!missionName || !missionDetails || !startDate || !deadline) {
      setErrorMessage('All fields are required!');
      return false;
    }
    const start = new Date(startDate);
    const end = new Date(deadline);
    if (end <= start) {
      setErrorMessage('Deadline must be after the start date!');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const missionData = {
        title: missionName,
        description: missionDetails,
        startTime: startDate,
        endTime: deadline,
    };

    try {
      const response = await fetch('http://localhost:8080/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(missionData),
      });
      if (response.ok) {
        alert('Mission Added Successfully!!');
        window.location.reload(true);
      } else {
        alert('Failed to add mission.');
      }
    } catch (error) {
      console.error('Error submitting mission:', error);
      alert('Error submitting mission.');
    }
  };

  return (
    <div className="form-modal-overlay">
      <div className="form-modal-content">
        <button className="close-modal" onClick={closeModal}>✖</button>
        <h2>Add New Mission</h2>
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="form-group">
            <label htmlFor="missionName">Mission Name</label>
            <input
              type="text"
              id="missionName"
              placeholder="Enter mission name"
              value={missionName}
              onChange={(e) => setMissionName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="missionDetails">Mission Details</label>
            <textarea
              id="missionDetails"
              placeholder="Enter mission details"
              value={missionDetails}
              onChange={(e) => setMissionDetails(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="datetime-local"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="deadline">Deadline</label>
            <input
              type="datetime-local"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="submit-btn">Add Mission</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyModal;