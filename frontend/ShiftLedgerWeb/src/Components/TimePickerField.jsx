import React from "react";

export default function TimePickerField({currentTime, setCurrentTime, text}) {
    return (
        <div className="add-shift-field">
            <text style={{padding: "10px"}}>
                       {text}
            </text>
            <input
                aria-label="Time"
                type="time"
                value={currentTime}
                onChange={(e) => setCurrentTime(e.target.value)}
            />
        </div>
    )
}