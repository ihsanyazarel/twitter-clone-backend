const db = require("../../data/data-config");

const getAllComments = ()=>{
    return db("Comments")
}

const getCommentById = (comment_id)=>{
    return db("Comments")
    .where("comment_id", comment_id).first();
}


const getCommentsOfTweet = async (tweetId)=>{
    return db("Comments")
    .where("tweet_id", tweetId);
}


const updateComment = async (comment_id, comment) => {
    await db('Comments')
    .where('comment_id', comment_id)
    .update(comment);
    return getCommentById(comment_id);
}

async function deleteComment(comment_id) {
    const comment = await getCommentById(comment_id)
    await db('Comments')
    .where('comment_id', comment_id)
    .del();
    return comment;
}
const createComment = async (comment) => {
    const [comment_id] = await db('Comments')
    .insert(comment);
    return getCommentById(comment_id);
}

module.exports = {
    getAllComments,
    getCommentById,
    getCommentsOfTweet,
    updateComment,
    deleteComment,
    createComment
}