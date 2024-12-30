import React from "react";
import Card from "../CardComponents/Card";
import "./TabContent.css";

const TabContent = ({ activeTab, tabData }) => {
  const activeTabData = tabData.find((tab) => tab.id === activeTab);

  return (
    <div className="tab-content">
      <div className="card-container">
        {activeTabData?.cards.length > 0 ? (
          activeTabData.cards.map((card, index) => (
            <Card key={index} card={card} />
          ))
        ) : (
          <p className="no-cards">No cards available in this tab.</p>
        )}
      </div>
    </div>
  );
};

export default TabContent;
