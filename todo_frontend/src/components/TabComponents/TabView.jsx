import React, { useState, useEffect } from "react";
import TabBar from "./TabBar";
import TabContent from "./TabContent";
import "./TabView.css";

const TabView = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [tabData, setTabData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const transformProgressToTableData = ((progressList) => {
    var myProgressList = [];
    progressList.map((progress) => {
      const myProgress = {
        status: progress.status,
        timestamp: new Date(...progress.timestamp).toUTCString()
      }
      myProgressList.push(myProgress);
    });
    return myProgressList;
  });

  const transformResponseToTableData = (response) => {
    var cardListData = [
      {
        id: 1,
        title: "All Missions",
        cards: [],
      },
      {
        id: 2,
        title: "Pending Missions",
        cards: [],
      },
      {
        id: 3,
        title: "Completed Missions",
        cards: [],
      },
      {
        id: 4,
        title: "Forgotten Missions",
        cards: [],
      },
    ];
    response.map((todo) => {
      const myProgress = transformProgressToTableData(todo.progress);
      var cardData = {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        startDate: new Date(...todo.startTime).toUTCString(),
        deadline: new Date(...todo.endTime).toUTCString(),
        progress: myProgress
      };
      if (todo.status !== "DELETED") {
        cardListData[0].cards.push(cardData);
        if (todo.status !== "DONE") {
          cardListData[1].cards.push(cardData);
        }
        else {
          cardListData[2].cards.push(cardData);
        }
      }
      else {
        cardListData[3].cards.push(cardData);
      }
    });
    console.log(cardListData);
    return cardListData;
  };

  useEffect(() => {
    const fetchTabData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:8080/todos");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
        const myFilteredData = transformResponseToTableData(data);
        setTabData(myFilteredData);
      } catch (error) {
        console.error("Error fetching tab data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTabData();
  }, []);

  return (
    <div className="tab-view">
      {isLoading ? (
        <div className="tab-loading">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <TabBar tabs={tabData} activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabContent activeTab={activeTab} tabData={tabData} />
        </>
      )}
    </div>
  );
};

export default TabView;