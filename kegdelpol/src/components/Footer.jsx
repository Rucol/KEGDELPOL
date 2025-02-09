import React from "react";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-logo1">
                <img src="/keg.svg" alt="Keg" className="keg-image1" />
                <div className="logo-text1">
                    <div className="main-title1">KegDelPol</div>
                    <div className="sub-title1">we deliver your beer</div>
                </div>
            </div>
            <a href="/privacy-policy" className="privacy-policy">Privacy Policy</a>
            <div className="copyright">
                Copyright © 2024 Kegdelpol sp. z o.o. All rights reserved.
            </div>
            <div className="social-icons">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <img src="/icons8-linkedin.svg" alt="LinkedIn" className="social-icon" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src="/icons8-facebook.svg" alt="Facebook" className="social-icon" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src="/icons8-instagram.svg" alt="Instagram" className="social-icon" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src="icons8-twitter.svg" alt="Twitter" className="social-icon" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <img src="icons8-youtube.svg" alt="YouTube" className="social-icon" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
