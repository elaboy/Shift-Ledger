import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerField({currentDate, setCurrentDate, text}) {
    return (
        <div className="add-shift-field">
            <text style={{padding: "10px"}}>
                {text}
            </text>
            <DatePicker
                selected={currentDate}
                onChange={setCurrentDate} showMonthYearDropdown/>
        </div>
    )
}