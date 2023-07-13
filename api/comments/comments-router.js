const router = require("express").Router();
const { getAllComments, getCommentById, getCommentsOfTweet, updateComment, deleteComment, createComment } = require("./comments-model");
const commentsMw = require("./comments-middleware");
const tweetsMw = require("../tweets/tweets-middleware");


// get all comments
router.get("/", async (req,res,next)=>{
    try {
        const comments = await getAllComments();
        res.json(comments);
    } catch (error) {
        next(error)
    }
})
// get comment by comment_id
router.get("/:id",commentsMw.idValidation, async (req,res,next)=>{
    try {
        const comment = await getCommentById(req.params.id);
        res.json(comment);
    } catch (error) {
        next(error)
    }
})
// get comments of tweet by tweet_id
router.get("/tweet/:id",tweetsMw.idValidation, async (req,res,next)=>{
    try {
        const comments = await getCommentsOfTweet(req.params.id);
        res.json(comments);
    } catch (error) {
        next(error)
    }
})

// update comment
router.put("/:id",commentsMw.idValidation, commentsMw.pyldVld, async (req,res,next)=>{
    try {
        const comment = await updateComment(req.params.id, req.newComment);
        res.json(comment);
    } catch (error) {
        next(error)
    }
})
// delete comment by comment_id
router.delete("/:id",commentsMw.idValidation, async (req,res,next)=>{
    try {
        const comment = await deleteComment(req.params.id);
        res.json(comment);
    } catch (error) {
        next(error)
    }
})
// create comment
router.post("/:id",commentsMw.createPyldVld,tweetsMw.idValidation, async (req,res,next)=>{
    try {
        req.newComment.tweet_id = req.tweet.tweet_id;
        const comment = await createComment(req.newComment);
        res.json(comment);
    } catch (error) {
        next(error)
    }
})

module.exports = router;