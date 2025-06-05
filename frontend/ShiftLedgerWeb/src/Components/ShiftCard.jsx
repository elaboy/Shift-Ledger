import React from "react";

export default function ShiftCard({date, startTime, endTime, hoursWorked}) {
    function formatTime(time){
        const [hour, minutes] = time.split(":");
        return `${hour}:${minutes}`;
    }
    const formattedDate = new Date(date + "T12:00:00").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const formattedStart = formatTime(startTime);
    const formattedEnd = formatTime(endTime);
    return (
        <>
            <div style={{border: "1px solid gray", width: "100%"}}>
                <h3>Date: {formattedDate}</h3>
                <h3>Start Time: {formattedStart}</h3>
                <h3>End Time: {formattedEnd}</h3>
                <h3>Hours Worked: {hoursWorked}</h3>
            </div>
        </>
    )
}