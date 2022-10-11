const rootAPI = 'https://www.reddit.com/';

export const getRedditPosts = async (subreddit) => {
    const response = await fetch(`${rootAPI}${subreddit}.json`);
    const json = await response.json();
    console.log(json);

    return json.data.children.map((post) => post.data);
}