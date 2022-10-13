import React, {useEffect} from "react";
import './Subreddits.css';
import { setSubreddit, selectSubreddit } from "../../store/redditSlice";
import { fetchSubreddits, selectSubreddits, loadingSubreddits, errorSubreddits } from "../../store/subredditSlice";
import { useDispatch, useSelector } from "react-redux";

const Subreddits = () => {
    const dispatch = useDispatch();

    const subreddits = useSelector(selectSubreddits);
    const selectedSubreddit = useSelector(selectSubreddit);
    const isLoading = useSelector(loadingSubreddits);
    const error = useSelector(errorSubreddits);

    useEffect(() => {
        if(subreddits.length !== 0)
            return;

        dispatch(fetchSubreddits());
    }, [dispatch, subreddits]);

    return (
        <div id="subreddits">
            <h3 id="subreddits-h3">Subreddits</h3>
            <ul id="subreddits-list">
            {subreddits.length !== 0
                ? subreddits.map(subreddit => {
                    return <li key={subreddit.id} className="subreddits-list-item">
                            <button
                                type="button"
                                className="subreddits-button"
                                onClick={() => dispatch(setSubreddit(subreddit.url))}>
                                    <img
                                        className="subreddits-img"
                                        alt=""
                                        src={subreddit.icon_img || `https://api.adorable.io/avatars/25/${subreddit.display_name}`}
                                        style={{ borderColor: `${subreddit.primary_color}` }} />
                                    {subreddit.display_name}
                            </button>
                        </li>
                })

                : <p id="loading-message">Loading...</p>
            }

            </ul> 
        </div>
    )
}

export default Subreddits;