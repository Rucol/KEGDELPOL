import React from "react";
import './Navbar.css';

const Navbar = ({onLogout}) => {
    return (
        <header className="header">
            <a href="/" className="logo">
                <img src="/keg.svg" alt="Keg" className="keg-image" />
                <div className="logo-text">
                    <div className="main-title">KegDelPol</div>
                    <div className="sub-title">we deliver your beer</div>
                </div>
            </a>
            <nav className="navbar">
                <a href='/Login'>Home</a>
                <a href='/About'>About us</a>
                <a href='/Contact'>Contact</a>
            </nav>
        </header>
    )
}

export default Navbar;