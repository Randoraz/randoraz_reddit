const rootAPI = 'https://www.reddit.com/';

export const getRedditPosts = async (subreddit) => {
    const response = await fetch(`${rootAPI}${subreddit}.json`);
    const json = await response.json();
    console.log(json);

    return json.data.children.map((post) => post.data);
};

export const getSubreddits = async () => {
    const response = await fetch(`${rootAPI}/subreddits.json`);
    const json = await response.json();
    console.log(json);
  
    return json.data.children.map((subreddit) => subreddit.data);
  };