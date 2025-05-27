import React from "react";
import ShiftCard from "./ShiftCard.jsx";

export default function ScrollList({shifts}) {
    return (
        <>
            <div style={{overflowY: "scroll", width: "300px"}}>
                {shifts.map((shift, index) => <ShiftCard props={shift} key={index} />)}
            </div>
        </>
    )
}