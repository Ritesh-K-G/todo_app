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
      progress.timestamp[1] = progress.timestamp[1] - 1;
      const myProgress = {
        status: progress.status,
        timestamp: new Date(...progress.timestamp).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          weekday: "short",
          year: "numeric",         
          month: "short",
          day: "2-digit",          
          hour: "2-digit",         
          minute: "2-digit",       
          second: "2-digit",       
        })
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
      todo.startTime[1] = todo.startTime[1] - 1;
      todo.endTime[1] = todo.endTime[1] - 1;
      const myProgress = transformProgressToTableData(todo.progress);
      var cardData = {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        startDate: new Date(...todo.startTime).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          weekday: "short",
          year: "numeric",         
          month: "short",
          day: "2-digit",          
          hour: "2-digit",         
          minute: "2-digit",       
          second: "2-digit",       
        }),
        deadline: new Date(...todo.endTime).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          weekday: "short",
          year: "numeric",         
          month: "short",
          day: "2-digit",          
          hour: "2-digit",         
          minute: "2-digit",       
          second: "2-digit",       
        }),
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