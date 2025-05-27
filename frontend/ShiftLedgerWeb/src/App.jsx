import {useRef, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Shifts from "./Pages/Shifts.jsx";
import {useNavigate} from 'react-router-dom';
import GetMyShiftsButton from "./Components/GetMyShiftsButton.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Router>
                {/*<nav>*/}
                {/*    <Link to="/shifts"></Link>*/}
                {/*</nav>*/}

                <Routes>
                        <Route path="" element={<GetMyShiftsButton />} />
                        <Route path="/shifts" element={<Shifts/>}/>

                </Routes>
            </Router>
        </>
    )
}

export default App
