import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import "./styles.css"

export default function NavBar() {
    //Home, New Shift, My Shifts
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#333',
            padding: '1rem',
            width: '100%',
            
        }}>
            <div style={{color: "#fff", fontWeight: "bold"}}>Shift Logger</div>
            <div style={{display: "flex", gap: "1rem"}}>
                <Link className={"nav-link-text"} to="/">Home</Link>
                <Link className={"nav-link-text"} to="/shifts" >Shifts</Link>
                <Link className={"nav-link-text"} to={"/"}>asd</Link>
            </div>
        </nav>
    )
}