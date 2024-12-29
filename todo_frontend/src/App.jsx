import React from "react";
import TabView from "./components/TabView.jsx";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="content">
        <div className="main-layout">
          {/* Animation or GIF */}
          <div className="animation-container">
            <img
              src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"
              alt="Animated GIF"
              className="animation"
            />
          </div>

          {/* Tab View */}
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
      <div className="navbar-logo">ToDo App</div>
      <div className="navbar-menu">
        <button className="profile-button">Add Task</button>
      </div>
    </nav>
  );
};

export default App;
