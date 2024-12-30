import React from "react";
import TabView from "./components/TabView.jsx";
import "./App.css";

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
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="App Logo" className="logo" />
        <span className="app-name">Shinobi Planner</span> 
      </div>
      <div className="navbar-menu">
        <button className="addTask-button">+ New Mission</button>
      </div>
    </nav>
  );
};

export default App;
