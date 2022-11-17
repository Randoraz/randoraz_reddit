import React, { useEffect, useState } from "react";
import './Header.css';
import { setSearchTerm, selectSearchTerm, getFilteredPosts } from "../../store/redditSlice";
import { setDisplayMenu, selectDisplayMenu } from "../../store/subredditSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
    const [searchTermLocal, setSearchTermLocal] = useState('');
    const displayMenu = useSelector(selectDisplayMenu);
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

    const toggleSubredditsMenu = (e) => {
        e.preventDefault();
        dispatch(setDisplayMenu());
    }

    const changeIconColor = () => {
        if(displayMenu)
            return 'var(--orange)';
        else
            return 'white';
    }

    return (
        <header>
            <div id="logo-container">
                <h1 id="header-h1"><span id="header-span">Randoraz</span> Reddit</h1>
                <FontAwesomeIcon id="reddit-icon" icon="fa-brands fa-square-reddit" />
            </div>
            <form id="search-form" onSubmit={handleSubmit}>
                <input id="search-bar" type="text" placeholder="Search" value={searchTermLocal} onChange={handleLocalChange} aria-label="Search Posts" />
                <button type="submit" id="search-button" onClick={handleSubmit} aria-label="Search">
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" aria-hidden="true" />
                </button>
                <button id="subreddit-menu-button" onClick={toggleSubredditsMenu} aria-label="Subreddits Menu">
                    <FontAwesomeIcon icon="fa-solid fa-bars" style={{color: changeIconColor()}} aria-hidden="true" />
                </button>
            </form>
        </header>
    )
}

export default Header;