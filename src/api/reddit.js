const rootAPI = 'https://www.reddit.com/';

export const getRedditPosts = async (subreddit) => {
    const response = await fetch(`${rootAPI}${subreddit}.json`, { cache: "default" });
    const json = await response.json();
    console.log(json);

    return json.data.children.map((post) => post.data);
};

export const getSubreddits = async () => {
    const response = await fetch(`${rootAPI}/subreddits.json`, { cache: "default" });
    const json = await response.json();
    console.log(json);
  
    return json.data.children.map((subreddit) => subreddit.data);
  };

export const getPostComments = async (permalink) => {
    const response = await fetch(`${rootAPI}${permalink}.json`, { cache: "default" });
    console.log(`${rootAPI}${permalink}.json`);
    const json = await response.json();
    console.log(json);
  
    return json[1].data.children.map((subreddit) => subreddit.data);
  };