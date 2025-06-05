import React, {useEffect, useState, useRef} from "react";
import ScrollList from "../Components/ScrollList.jsx";
import FilteringMenu from "../Components/FilteringMenu.jsx";

const base = "http://localhost:5000";

export default function MyShifts() {
    const [shifts, setShifts] = useState([]);
    const constantShifts = useRef([]);
    //todo CONSTANT SHIFTS NEEDED FOR FILTERING MENU  to avoid clearing of array
    useEffect(() => {
        const getMyShifts = async () => {
            try {
                const res = await fetch(base + "/api/shifts");
                const data = await res.json();
                setShifts(data);
                constantShifts.current = data;
            } catch (error) {
                console.log("Failed to fetch Shifts: ", error);
            }
        };
        getMyShifts();
    }, [])
    
    const [selectedOption, setSelectedOption] = useState('');
    console.log("constantShifts.current: ", constantShifts.current)
    return (
        <div style={{maxWidth: "1200px", margin: "0 auto", width: "100%"}}>
            <FilteringMenu
                constantShifts={constantShifts}
                shifts={shifts}
                setShifts={setShifts}/>
            <ScrollList shifts={shifts}/>
        </div>
    )
}