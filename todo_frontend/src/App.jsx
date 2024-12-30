import React, { useState } from "react";
import TabView from "./components/TabView.jsx";
import "./App.css";
import "./Modal.css";

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="content">
        <div className="main-layout">
          <div className="animation-container">
            <img
              src="/checklist.gif"
              alt="Animated GIF"
              className="animation"
            />
          </div>
          <div className="tab-view-container">
            <TabView />
          </div>
        </div>
      </main>
    </div>
  );
};

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="App Logo" className="logo" />
        <span className="app-name">Shinobi Planner</span>
      </div>
      <div className="navbar-menu">
        <button className="addTask-button" onClick={openModal}>+ New Mission</button>
      </div>
      {isModalOpen && <MyModal closeModal={closeModal} />}
    </nav>
  );
};

const MyModal = ({ closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={closeModal}>✖</button>
        <h2>Add New Mission</h2>
        <form>
          <div className="form-group">
            <label htmlFor="missionName">Mission Name</label>
            <input type="text" id="missionName" placeholder="Enter mission name" />
          </div>
          <div className="form-group">
            <label htmlFor="missionDetails">Mission Details</label>
            <textarea id="missionDetails" placeholder="Enter mission details"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input type="datetime-local" id="startDate" />
          </div>
          <div className="form-group">
            <label htmlFor="deadline">Deadline</label>
            <input type="datetime-local" id="deadline" />
          </div>
          <div className="form-group">
            <button type="submit" className="submit-btn">Add Mission</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
