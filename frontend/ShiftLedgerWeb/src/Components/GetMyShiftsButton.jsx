import React from "react";
import {useNavigate} from "react-router-dom";

export default function GetMyShiftsButton() {
    const navigate = useNavigate();
    const goToShifts = () => {
        navigate("/shifts");
    }
    return(
        <>
            <button onClick={goToShifts}>My Shifts</button>
        </>
    )
}