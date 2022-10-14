import React, { useEffect, useState } from "react";
import './Header.css';
import { setSearchTerm, selectSearchTerm, getFilteredPosts } from "../../store/redditSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
    const [searchTermLocal, setSearchTermLocal] = useState('');
    const dispatch = useDispatch();
    const searchTerm = useSelector(selectSearchTerm);

    useEffect(() => {
        setSearchTermLocal(searchTerm);
    },[searchTerm]);

    const handleLocalChange = (e) => {
        setSearchTermLocal(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearchTerm(searchTermLocal));
        dispatch(getFilteredPosts());
    }

    return (
        <header>
            <div id="logo-container">
                <h1 id="header-h1"><span id="header-span">Randoraz</span> Reddit</h1>
                <FontAwesomeIcon id="reddit-icon" icon="fa-brands fa-square-reddit" />
            </div>
            <form id="search-form" onSubmit={handleSubmit}>
                <input id="search-bar" type="text" placeholder="Search" value={searchTermLocal} onChange={handleLocalChange} />
                <button type="submit" id="search-button"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" onClick={handleSubmit} /></button>
            </form>
        </header>
    )
}

export default Header;