import React from "react";
import './Header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
    return (
        <header>
            <div id="logo-container">
                <h1 id="header-h1"><span id="header-span">Randoraz</span> Reddit</h1>
                <FontAwesomeIcon id="reddit-icon" icon="fa-brands fa-square-reddit" />
            </div>
            <form id="search-form">
                <input id="search-bar" type="text" placeholder="Search" />
                <button type="submit" id="search-button"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
            </form>
        </header>
    )
}

export default Header;