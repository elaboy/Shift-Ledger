import React from "react";

export default function ShiftCard({props}) {
    return (
        <>
            <div style={{border: "1px solid gray", width: "100%"}}>
                <h3>Date: {props.date}</h3>
                <h3>Start Time: {props.startTime}</h3>
                <h3>End Time: {props.endTime}</h3>
                <h3>Hours Worked: {props.hoursWorked}</h3>
            </div>
        </>
    )
}