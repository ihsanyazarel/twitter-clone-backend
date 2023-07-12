const db = require("../../data/data-config");

const findUserByKey = (key, value) => {
    return db("Users").where(key, value).first();
}

const getAllUsers = ()=>{
    return db("Users")
    .select("user_id", "nickName", "userName", "userSurname", "userEmail", "numberOfFollowers", "numberOfFollowing", "signUpDate")
}

const getUserById = (id)=>{
    return db("Users")
    .select("user_id", "nickName", "userName", "userSurname", "userEmail", "numberOfFollowers", "numberOfFollowing", "signUpDate")
    .where("user_id", id).first()
}


const getUserWithTweets = async (id)=>{
    const user = await db("Users as u")
    .leftJoin('Tweets as t', 't.user_id', "=" , 'u.user_id')
    .select('u.*', "t.tweet_id", "t.tweetContent", "t.numberOfLikes", "t.numberOfComments")
    .where("u.user_id", id);
    const newUser = {
        user_id: user[0].user_id,
        nickName:user[0].nickName,
        userName:user[0].userName,
        userSurname:user[0].userSurname,
        userEmail:user[0].userEmail,
        numberOfFollowers:user[0].numberOfFollowers,
        numberOfFollowing:user[0].numberOfFollowing,
        tweets: []
    };
    user[0].tweet_id && user.forEach(e => {
        let tweet = {};
        tweet.tweet_id = e.tweet_id;
        tweet.tweetContent = e.tweetContent;
        tweet.numberOfLikes = e.numberOfLikes;
        tweet.numberOfComments = e.numberOfComments;
        newUser.tweets.push(tweet);
    });
    return newUser;
}

const updateUser = async (id, user) => {
    await db('Users')
    .where('user_id', id)
    .update(user);
    return getUserById(id);
}

async function deleteUser(id) {
    const user = await getUserById(id)
    await db('Users')
    .where('user_id', id)
    .del();
    return user;
}

module.exports = {
    findUserByKey,
    getAllUsers,
    getUserById,
    getUserWithTweets,
    updateUser,
    deleteUser
}