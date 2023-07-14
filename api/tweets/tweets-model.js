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
    return db("Tweets as t")
    .leftJoin('Followings as f', function() {
        this.on('t.user_id', '=', 'f.following_id')
        .andOn(db.raw("f.following_id <> ? ", [userId]))
    })
    .where(function() {
        this.where('f.userId', '=', userId)
        .orWhere('t.user_id', '=', userId)
    })
    .select("tweet_id", "user_id", "tweetContent", "numberOfLikes", "numberOfComments", "created_at", "updated_at")
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