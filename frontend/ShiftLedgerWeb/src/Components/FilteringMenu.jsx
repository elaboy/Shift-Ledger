import React from 'react';
import DatePicker from "react-datepicker";

export default function FilteringMenu({constantShifts, shifts, setShifts}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [filterDate, setFilterDate] = React.useState(new Date);
    const [dateRange, setDateRange] = React.useState('');
    const [hoursWorked, setHoursWorked] = React.useState('');
    const [startTime, setStartTime] = React.useState('');
    const [endTime, setEndTime] = React.useState('');
    const monthToDigitDictionary = {
        "Jan": "01",
        "Feb": "02",
        "Mar": "03",
        "Apr": "04",
        "May": "05",
        "Jun": "06",
        "Jul": "07",
        "Aug": "08",
        "Sep": "09",
        "Oct": "10",
        "Nov": "11",
        "Dec": "12",
    }
    const toggleMenu = () => setIsOpen(prev => !prev);

    function formatFilteredDate(date) {
        const justDate = date.toString().split(' ');
        const dayOfTheWeek = justDate[0];
        const month = justDate[1];
        const dayOfTheMonth = justDate[2];
        const year = justDate[3];
        return {dayOfTheWeek, dayOfTheMonth, month, year};
    }

    function shiftsDateFormat(formattedDate) {
        return `${formattedDate.year}-${monthToDigitDictionary[formattedDate.month]}-${formattedDate.dayOfTheMonth}`;
    }

    function setShiftsByDate(e) {
        setShifts(constantShifts.current)
        setFilterDate(e);
        const formattedDate = shiftsDateFormat(formatFilteredDate(e));

        const filtered = constantShifts.current.filter(
            shift => shift.date === formattedDate
        );

        setShifts(filtered);
    }
    
    function clearPickDateFilter(){
        setFilterDate(new Date());
        setShifts(constantShifts.current);
    }

    const tryingShiftDateFormat = formatFilteredDate(filterDate);

    // console.log(shifts.filter(shift => shift.date === shiftsDateFormat(tryingShiftDateFormat)));
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
                            <DatePicker selected={filterDate}
                                        onChange={(e) => setShiftsByDate(e)}
                                        showMonthYearDropdown
                            />
                        </div>
                        <button onClick={clearPickDateFilter}>Clear Filter</button>
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
                </>
            )}
        </>
    )
}