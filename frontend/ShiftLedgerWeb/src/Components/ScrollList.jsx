import React from "react";
import ShiftCard from "./ShiftCard.jsx";

export default function ScrollList({shifts}) {
    return (
        <>
            <div style={{
                overflowY: "scroll",
                height: "700px",
                width: "100%",
                maxWidth: "100%",
                border: "1px solid #ccc",
                padding: "10px",
                }}
            >
                {shifts.map((shift, index) => <ShiftCard {...shift} key={index}/>)}
            </div>
        </>
    )
}