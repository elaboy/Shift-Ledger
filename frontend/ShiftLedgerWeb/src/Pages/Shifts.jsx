import React from "react";
import ScrollList from "../Components/ScrollList.jsx";

const base = "http://localhost:5000";

export default function Shifts() {
    const shiftArray = [];
    
    let shifts = fetch(base + "/api" + "/shifts")
        .then((result) => {
            result.json().then(data => shiftArray.push(...data))
        });

    console.log(shiftArray);
    return (
        <>
            <div>
                <ScrollList shifts={shiftArray}/>
            </div>
        </>
    )
}