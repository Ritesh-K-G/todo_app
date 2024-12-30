import React, { useState } from "react";
import TabBar from "./TabBar";
import TabContent from "./TabContent";
import "./TabView.css";

const TabView = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabData = [
    {
      id: 1,
      title: "All Missions",
      cards: [
        {
          title: "Card 1",
          description: "This is a short description for Card 1.",
          startDate: "2024-01-01",
          deadline: "2024-01-10",
        },
        {
          title: "Card 2",
          description: "This is a short description for Card 2.",
          startDate: "2024-01-11",
          deadline: "2024-01-20",
        },
        {
            title: "Card 2",
            description: "This is a short description for Card 2.",
            startDate: "2024-01-11",
            deadline: "2024-01-20",
          },
          {
            title: "Card 2",
            description: "This is a short description for Card 2.",
            startDate: "2024-01-11",
            deadline: "2024-01-20",
          },
          {
            title: "Card 2",
            description: "This is a short description for Card 2.",
            startDate: "2024-01-11",
            deadline: "2024-01-20",
          },
          {
            title: "Card 2",
            description: "This is a short description for Card 2.",
            startDate: "2024-01-11",
            deadline: "2024-01-20",
          },
          {
            title: "Card 2",
            description: "This is a short description for Card 2.",
            startDate: "2024-01-11",
            deadline: "2024-01-20",
          },
          {
            title: "Card 2",
            description: "This is a short description for Card 2.",
            startDate: "2024-01-11",
            deadline: "2024-01-20",
          },
          {
            title: "Card 2",
            description: "This is a short description for Card 2.",
            startDate: "2024-01-11",
            deadline: "2024-01-20",
          },
          {
            title: "Card 2",
            description: "This is a short description for Card 2.",
            startDate: "2024-01-11",
            deadline: "2024-01-20",
          },
          {
            title: "Card 2",
            description: "This is a short description for Card 2.",
            startDate: "2024-01-11",
            deadline: "2024-01-20",
          },
          {
            title: "Card 2",
            description: "This is a short description for Card 2.",
            startDate: "2024-01-11",
            deadline: "2024-01-20",
          },
      ],
    },
    {
      id: 2,
      title: "Pending Missions",
      cards: [
        {
          title: "Card 3",
          description: "This is a short description for Card 3.",
          startDate: "2024-02-01",
          deadline: "2024-02-15",
        },
      ],
    },
    {
      id: 3,
      title: "Completed Missions",
      cards: [
        {
          title: "Card 4",
          description: "This is a short description for Card 4.",
          startDate: "2024-03-01",
          deadline: "2024-03-10",
        },
        {
          title: "Card 5",
          description: "This is a short description for Card 5.",
          startDate: "2024-03-11",
          deadline: "2024-03-20",
        },
      ],
    },
    {
      id: 4,
      title: "Forgotten Missions",
      cards: [],
    },
  ];

  return (
    <div className="tab-view">
      <TabBar tabs={tabData} activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabContent activeTab={activeTab} tabData={tabData} />
    </div>
  );
};

export default TabView;
