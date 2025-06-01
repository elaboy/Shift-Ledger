import React, {useState} from "react";
import ScrollList from "../Components/ScrollList.jsx";
import FilteringMenu from "../Components/FilteringMenu.jsx";

const base = "http://localhost:5000";

export default function MyShifts() {
    const [shifts, setShifts] = useState([]);

    const getMyShifts = () => {
        fetch(base + "/api/shifts")
            .then(res => res.json())
            .then(data => setShifts(data))
            .catch(error => console.log("Failed to fetch Shifts: ", error))
    }
    
    getMyShifts();
    return (
        <div style={{maxWidth: "1200px", margin: "0 auto", width: "100%"}}>
            <text>Filtering Needed</text>
            <FilteringMenu></FilteringMenu>
            <ScrollList shifts={shifts}/>
        </div>
    )
}