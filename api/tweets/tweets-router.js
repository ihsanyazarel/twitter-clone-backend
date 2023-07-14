const router = require("express").Router();
const { getAllTweets, getTweetById, getTweetsOfUser, getTweetsOfUserWithFollowings, updateTweet, deleteTweet, createTweet } = require("./tweets-model");
const tweetsMw = require("./tweets-middleware");
const userMw = require("../users/users-middleware");
const { isAdmin } = require("../Auth/auth-middleware");

// get all tweets - available for just admin
router.get("/", isAdmin, async (req,res,next)=>{
    try {
        const tweets = await getAllTweets();
        res.json(tweets);
    } catch (error) {
        next(error)
    }
})
// get tweet by tweet_id - available for everyone
router.get("/:id",tweetsMw.idValidation, async (req,res,next)=>{
    try {
        const tweet = await getTweetById(req.params.id);
        res.json(tweet);
    } catch (error) {
        next(error)
    }
})
// get tweets of user by user_id - available for everyone
router.get("/user/:id",userMw.idValidation, async (req,res,next)=>{
    try {
        const tweet = await getTweetsOfUser(req.params.id);
        res.json(tweet);
    } catch (error) {
        next(error)
    }
})
// Get tweets of user’s home by user_id(user’s tweets and followed user’s tweet)
// available for admin and user who request with his/her own id
router.get("/home/:id",userMw.idValidation, userMw.isAdminOrLoggedInUser, async (req,res,next)=>{
    try {
        const tweet = await getTweetsOfUserWithFollowings(req.params.id);
        res.json(tweet);
    } catch (error) {
        next(error)
    }
})
// update tweet by tweet_id
// available for admin and user who own the tweet
router.put("/:id",tweetsMw.idValidation, tweetsMw.pyldVld,tweetsMw.isAdminOrOwnTweet, async (req,res,next)=>{
    try {
        const tweet = await updateTweet(req.params.id, req.newTweet);
        res.json(tweet);
    } catch (error) {
        next(error)
    }
})
// delete tweet by tweet_id
// available for admin and user who own the tweet
router.delete("/:id",tweetsMw.idValidation,tweetsMw.isAdminOrOwnTweet, async (req,res,next)=>{
    try {
        const tweet = await deleteTweet(req.params.id);
        res.json(tweet);
    } catch (error) {
        next(error)
    }
})
// create tweet
router.post("/",tweetsMw.createPyldVld, async (req,res,next)=>{
    try {
        const tweet = await createTweet(req.newTweet);
        res.json(tweet);
    } catch (error) {
        next(error)
    }
})


module.exports = router;