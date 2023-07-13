const db = require("../../data/data-config");

const getAllTweets = ()=>{
    return db("Tweets")
}

const getTweetById = (tweetId)=>{
    return db("Tweets")
    .where("tweet_id", tweetId).first();
}


const getTweetsOfUser = async (userId)=>{
    return db("Tweets")
    .where("user_id", userId);
}

const getTweetsOfUserWithFollowings = async (userId)=>{
    const tweets = await db("Tweets")
    .where("user_id", userId);
    const followingTweets = await db("Tweets as t")
    .leftJoin("Followings as f", "f.following_id", "t.user_id")
    .where("f.user_id", userId);
    followingTweets.forEach(item => {
        tweets.push(item)
    });
    return tweets;
}

const updateTweet = async (tweet_id, tweet) => {
    await db('Tweets')
    .where('tweet_id', tweet_id)
    .update(tweet);
    return getTweetById(tweet_id);
}

async function deleteTweet(tweet_id) {
    const tweet = await getTweetById(tweet_id)
    await db('Tweets')
    .where('tweet_id', tweet_id)
    .del();
    return tweet;
}
const createTweet = async (tweet) => {
    const [tweet_id] = await db('Tweets')
    .insert(tweet);
    return getTweetById(tweet_id);
}

module.exports = {
    getAllTweets,
    getTweetById,
    getTweetsOfUser,
    getTweetsOfUserWithFollowings,
    updateTweet,
    deleteTweet,
    createTweet
}