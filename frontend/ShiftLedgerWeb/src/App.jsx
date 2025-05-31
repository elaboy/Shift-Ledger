import {useRef, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Shifts from "./Pages/Shifts.jsx";
import {useNavigate} from 'react-router-dom';
import GetMyShiftsButton from "./Components/GetMyShiftsButton.jsx";
import NavBar from "./Components/NavBar.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <Router>
            <div style={{
                maxWidth: "100%",        // allow shrinking
                width: "100%",
                height: "100%",
                padding: "1rem",        // optional
            }}>
                <NavBar/>
                <Routes>
                    <Route path="" element={<GetMyShiftsButton/>}/>
                    <Route path="/shifts" element={<Shifts/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App
