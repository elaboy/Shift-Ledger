import React from "react";
import ShiftCard from "./ShiftCard.jsx";

export default function ScrollList({shifts}) {
    return (
        <>
            <div style={{
                overflowY: "scroll",
                width: "300px",
                height: "700px",
                border: "1px solid #ccc",
                padding: "10px",
                }}
            >
                {shifts.map((shift, index) => <ShiftCard {...shift} key={index}/>)}
            </div>
        </>
    )
}