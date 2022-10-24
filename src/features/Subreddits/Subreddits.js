import React, {useEffect} from "react";
import './Subreddits.css';
import { setSubreddit } from "../../store/redditSlice";
import { fetchSubreddits, selectSubreddits, loadingSubreddits, errorSubreddits } from "../../store/subredditSlice";
import { selectSubreddit } from "../../store/redditSlice";
import { useDispatch, useSelector } from "react-redux";

const Subreddits = () => {
    const dispatch = useDispatch();

    const subreddits = useSelector(selectSubreddits);
    const isLoading = useSelector(loadingSubreddits);
    const error = useSelector(errorSubreddits);
    const selectedSubreddit = useSelector(selectSubreddit);

    useEffect(() => {
        if(subreddits.length !== 0)
            return;

        dispatch(fetchSubreddits());
    }, [dispatch, subreddits]);

    if(isLoading) return <p id="loading-message">Loading...</p>;
    if(error) return <p id="error-message">Failed to load subreddits list</p>;

    return (
        <div id="subreddits">
            <h3 id="subreddits-h3">Subreddits</h3>
            <ul id="subreddits-list">
            {subreddits.map(subreddit => {
                return <li key={subreddit.id} className="subreddits-list-item">
                        <button
                            type="button"
                            className={`subreddits-button ${selectedSubreddit === subreddit.url && 'selected-subreddit'}`}
                            onClick={(e) => dispatch(setSubreddit(subreddit.url))}>
                                <img
                                    className="subreddits-img"
                                    alt=""
                                    src={subreddit.icon_img || `https://api.adorable.io/avatars/25/${subreddit.display_name}`}
                                    style={{ borderColor: `${subreddit.primary_color}` }} />
                                {subreddit.display_name}
                        </button>
                    </li>
                })
            }
            </ul> 
        </div>
    )
}

export default Subreddits;