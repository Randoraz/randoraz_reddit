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
            {/* <li id="subreddits-list-item"><img id="subreddits-img" src="https://external-preview.redd.it/5kh5OreeLd85QsqYO1Xz_4XSLYwZntfjqou-8fyBFoE.png?auto=webp&s=dbdabd04c399ce9c761ff899f5d38656d1de87c2"  alt="" /> Subreddit1</li>
                <li id="subreddits-list-item"><img id="subreddits-img" src="https://external-preview.redd.it/5kh5OreeLd85QsqYO1Xz_4XSLYwZntfjqou-8fyBFoE.png?auto=webp&s=dbdabd04c399ce9c761ff899f5d38656d1de87c2"  alt="" /> Subreddit2</li>
                <li id="subreddits-list-item"><img id="subreddits-img" src="https://external-preview.redd.it/5kh5OreeLd85QsqYO1Xz_4XSLYwZntfjqou-8fyBFoE.png?auto=webp&s=dbdabd04c399ce9c761ff899f5d38656d1de87c2"  alt="" /> Subreddit3</li>
            */}
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

                : <p>Loading...</p>
            }

            </ul> 
        </div>
    )
}

export default Subreddits;