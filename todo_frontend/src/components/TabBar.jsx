import React from "react";
import "./TabBar.css";

const TabBar = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="tab-bar">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.title}
        </div>
      ))}
    </div>
  );
};

export default TabBar;
