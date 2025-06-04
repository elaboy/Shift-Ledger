import React from 'react';
import DatePicker from "react-datepicker";

export default function FilteringMenu() {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = () => setIsOpen(prev => !prev);

    return (
        <>
            <button onClick={toggleMenu}>
                {isOpen ? 'Close Filtering' : 'Open Filtering'}
            </button>
            {isOpen && (
                <>
                    <div className="filter-row-container">
                        <div style={{
                            padding: "10px",
                        }}>
                            <label>By Date</label>
                        </div>
                        <div style={{
                            padding: "10px",
                        }}>
                            <DatePicker showMonthYearDropdown></DatePicker>
                        </div>
                    </div>
                    <div className="filter-row-container">
                        <div style={{
                            padding: "10px",
                        }}>
                            <label>Date Range</label>
                        </div>
                        <div style={{
                            padding: "10px",
                        }}>
                            <DatePicker showMonthYearDropdown></DatePicker>
                            <label> to</label>
                            <DatePicker showMonthYearDropdown></DatePicker>
                        </div>
                    </div>
                    <div className="filter-row-container">
                        <div style={{
                            padding: "10px",
                        }}>
                            <label>Hours Worked</label>
                        </div>
                        <div style={{
                            padding: "10px",
                        }}>
                            <input placeholder="i.e. 4:00 or 5:30"/>
                        </div>
                    </div>
                    <div className="filter-row-container">
                        <div style={{
                            padding: "10px",
                        }}>
                            <label>Start Time</label>
                        </div>
                        <div style={{
                            padding: "10px",
                        }}>
                            <input aria-label="time"
                                   type="time"/>
                        </div>
                    </div>
                    <div className="filter-row-container">
                        <div style={{
                            padding: "10px",
                        }}>
                            <label>End Time</label>
                        </div>
                        <div style={{
                            padding: "10px",
                        }}>
                            <input aria-label="time"
                                   type="time"/>
                        </div>
                    </div>
                    <button style={{padding: "10px"}}>Submit</button>
                </>
            )}
        </>
    )
}