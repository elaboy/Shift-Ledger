import React from 'react';
import DatePicker from "react-datepicker";

const base = "http://localhost:5000";

export default function FilteringMenu({constantShifts, shifts, setShifts}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [filterDate, setFilterDate] = React.useState(new Date);
    const [startDateRange, setStartDateRange] = React.useState(new Date);
    const [endDateRange, setEndDateRange] = React.useState(new Date);
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

    function formatRawDatePicker(rawDatePicker) {
        const formattedDate = formatFilteredDate(rawDatePicker);
        return shiftsDateFormat(formattedDate);
    }

    function handleShiftsByDate() {
        setShifts(constantShifts.current)
        const formattedDate = formatRawDatePicker(filterDate);

        const filtered = constantShifts.current.filter(
            shift => shift.date === formattedDate
        );

        setShifts(filtered);
    }

    async function handleShiftsByDateRange() {
        try {

            const res = await fetch(
                base +
                `/api/date-range?start=${formatRawDatePicker(startDateRange)}&end=${formatRawDatePicker(endDateRange)}`
            );

            if (!res.ok) {
                throw new Error(`An Error has been throw: ${res.statusText}`);
            }

            const data = await res.json();
            setShifts(data);
        } catch (errors) {

            alert(errors);
        }
    }

    async function handleHoursWorked() {
        try {
            const res = await fetch(
                base +
                `/api/hours-worked?hoursWorked=${hoursWorked}`
            )
            if (!res.ok) {
                throw new Error(`An Error has been throw: ${res.statusText}`);
            }
            const data = await res.json();
            setShifts(data);
        } catch (errors) {
            alert(errors);
        }
    }

    async function handleStartTimeShifts() {
        console.log(startTime);
        try {
            const res = await fetch(
                base +
                `/api/start-time?startTime=${startTime}`
            )
            if (!res.ok) {
                throw new Error(`An Error has been throw: ${res.statusText}`)
            }
            const data = await res.json();
            setShifts(data);
        } catch (errors) {
            alert(errors);
        }
    }

    async function handleEndTimeShifts() {
        console.log(startTime);
        try {
            const res = await fetch(
                base +
                `/api/end-time?endTime=${endTime}`
            )
            if (!res.ok) {
                throw new Error(`An Error has been throw: ${res.statusText}`)
            }
            const data = await res.json();
            setShifts(data);
        } catch (errors) {
            alert(errors);
        }
    }

    function handleUpdateHoursWorked(e) {
        setHoursWorked(e.target.value);
    }

    function clearPickDateFilter() {
        setFilterDate(new Date());
        setShifts(constantShifts.current);
    }

    function clearDateRangeFilter() {
        setStartDateRange(new Date());
        setEndDateRange(new Date());
        setShifts(constantShifts.current);
    }

    function clearHoursWorkedFilter() {
        setHoursWorked('')
        setShifts(constantShifts.current);
    }

    function clearStartTimeFilter() {
        setStartTime("");
        setShifts(constantShifts.current);
    }

    function clearEndTimeFilter() {
        setEndTime("");
        setShifts(constantShifts.current);
    }

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
                            <DatePicker
                                selected={filterDate}
                                onChange={(e) => setFilterDate(e)}
                                showMonthYearDropdown
                            />
                        </div>
                        <button onClick={handleShiftsByDate}>Search</button>
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
                            <DatePicker
                                selected={startDateRange}
                                onChange={(e) => setStartDateRange(e)}
                                showMonthYearDropdown
                            />
                            <label> to</label>
                            <DatePicker
                                selected={endDateRange}
                                onChange={(e) => setEndDateRange(e)}
                                showMonthYearDropdown
                            />
                            <button onClick={handleShiftsByDateRange}>Search</button>
                            <button onClick={clearDateRangeFilter}>Clear Filter</button>
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
                            <input placeholder="i.e. 4:00 or 5:30" value={hoursWorked}
                                   onChange={handleUpdateHoursWorked}/>
                            <button onClick={handleHoursWorked}>Submit</button>
                            <button onClick={clearHoursWorkedFilter}>Clear Filter</button>
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
                                   type="time"
                                   value={startTime}
                                   onChange={(e) => {
                                       const time = e.target.value;
                                       setStartTime(`${time}:00`);
                                   }}
                            />
                            <button onClick={handleStartTimeShifts}>Submit</button>
                            <button onClick={clearStartTimeFilter}>Clear Filter</button>
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
                                   type="time"
                                   value={endTime}
                                   onChange={(e) => {
                                       const time = e.target.value;
                                       setEndTime(`${time}:00`);
                                   }}
                            />
                            <button onClick={handleEndTimeShifts}>Submit</button>
                            <button onClick={clearEndTimeFilter}>Clear Filter</button>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}