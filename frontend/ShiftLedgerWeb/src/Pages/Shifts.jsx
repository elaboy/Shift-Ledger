import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import ScrollList from "../Components/ScrollList.jsx";
import DatePickerField from "../Components/DatePickerField.jsx";

const base = "http://localhost:5000";

export default function Shifts() {
    const [shifts, setShifts] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const navigate = useNavigate();
    const redirectToAddShift = () => {
        navigate("/AddShift")
    }
    
    const redirectToMyShifts = () => {
        navigate("/MyShifts")
    }
    
    // useEffect(() => {
    //     fetch(base + "/api/shifts")
    //         .then(res => res.json())
    //         .then(data => setShifts(data))
    //         .catch(error => console.log("Failed to fetch Shifts: ", error))
    // }, []);

    console.log(shifts);
    return (
        <div className="shift-button-layout">
            {/*<div style={{maxWidth: "1200px", margin: "0 auto", width: "100%"}}>*/}
            {/*    <ScrollList shifts={shifts}/>*/}
            {/*</div>*/}
            <button onClick={redirectToMyShifts}>My Shifts</button>
            <button onClick={redirectToAddShift}>Add Shift</button>
            <button>Remove Shift</button>
            {/*<DatePickerField currentDate={currentDate} setCurrentDate={setCurrentDate}></DatePickerField>*/}
        </div>
    )
}