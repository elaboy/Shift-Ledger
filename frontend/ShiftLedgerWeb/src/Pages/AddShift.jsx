import React, {useEffect, useState} from 'react';
import DatePickerField from "../Components/DatePickerField.jsx";
import TimePickerField from "../Components/TimePickerField.jsx";

const base = 'http://localhost:5000';

export default function AddShift() {
    const today = new Date();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const [shiftDate, setShiftDate] = useState(new Date());
    const [shiftEnterTime, setShiftEnterTime] = useState("");
    const [shiftLeaveTime, setShiftLeaveTime] = useState("today.getTime()");
    
    const formatTime = (h, m = 0) => {
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    }
    const submitShift = () => {
        const shift = {
            Date: today.toISOString(),
            StartTime: formatTime(shiftEnterTime),
            EndTime: formatTime(shiftLeaveTime),
        }
        
        fetch(base + "/api/upload-shift", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(shift)
        })
            .catch(error => console.log(error));
    }

    return (
        <div className="add-shift-container">
            <DatePickerField
                currentDate={shiftDate}
                setCurrentDate={setShiftDate}
                text={"Shift Date"}
            />
            <TimePickerField
                currentTime={shiftEnterTime}
                setCurrentTime={setShiftEnterTime}
                text={"Shift Enter Time"}
            />
            <TimePickerField
                currentTime={shiftLeaveTime}
                setCurrentTime={setShiftLeaveTime}
                text={"Shift Leave Time"}
            />
            <button onClick={submitShift}>
                Submit
            </button>
        </div>
    )
}