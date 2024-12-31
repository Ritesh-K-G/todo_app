import React from "react";
import "./ProgressTimeline.css";

const ProgressTimeline = ({ data }) => {

    function giveDate(dateString) {
        const dateObj = new Date(dateString);

        const formattedDate = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        return formattedDate;
    };

    function giveTime(dateString) {
        const dateObj = new Date(dateString);
        // Extract hours, minutes, and seconds
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const seconds = dateObj.getSeconds();

        // Format the time as a string (e.g., "00:03:14")
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        return formattedTime;
    };

    const statusMapper = new Map();
    statusMapper.set("CREATED", "ASSIGNED");
    statusMapper.set("WIP", "IN PROGRESS");
    statusMapper.set("UPDATED", "UPDATED");
    statusMapper.set("DONE", "DONE");
    statusMapper.set("DELETED", "DELETED");

    return (
        <>
            <div className="timeline-header">
                <h2>Progress Timeline</h2>
            </div>
            <div className="timeline-scroll-container">
                <div className="timeline-container">
                    {data.map((item, index) => (
                        <div className="circle-container" key={index}>
                            <div className="status">{statusMapper.get(item.status)}</div>
                            <div className="circle-wrapper">
                                <div className="circle"></div>
                                {index < data.length - 1 && <div className="connector"></div>}
                            </div>
                            <div className="timestamp">{giveDate(item.timestamp)}</div>
                            <div className="timestamp">{giveTime(item.timestamp)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProgressTimeline;
