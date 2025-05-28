import React, {useEffect, useState} from "react";
import ScrollList from "../Components/ScrollList.jsx";

const base = "http://localhost:5000";

export default function Shifts() {
    const [shifts, setShifts] = useState([]);


    useEffect(() => {
        fetch(base + "/api/shifts")
            .then(res => res.json())
            .then(data => setShifts(data))
            .catch(error => console.log("Failed to fetch Shifts: ", error))
    }, []);

    console.log(shifts);
    return (
        <>
            <div>
                <ScrollList shifts={shifts}/>
            </div>
        </>
    )
}