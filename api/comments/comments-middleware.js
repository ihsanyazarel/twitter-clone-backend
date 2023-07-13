const { getCommentById } = require("./comments-model");

const idValidation = async (req,res,next) => {
    try {
        const comment = await getCommentById(req.params.id);
        if(comment){
            req.comment = comment;
            next()
        } else {
            res.status(404).json({messagge: "Comment bulunamadı!"});
        }
    } catch (error) {
        next(error);
    }
}

const pyldVld = (req,res,next) => {
    try {
        const allowedKeys = ["commentContent", "numberOfLikes"];
        const sentAllowedKeys = Object.keys(req.body).filter(key => allowedKeys.includes(key));
        if(sentAllowedKeys.length > 0){
            const newComment = {
                updated_at: new Date().toISOString().replace("T", " ").slice(0,19)
            };
            sentAllowedKeys.forEach(item => {
                newComment[item] = req.body[item];
            });
            req.newComment = newComment;
            next()
        } else {
            res.status(400).json({message: "Güncellemek istediğiniz bilgileri giriniz!"});
        }
    } catch (error) {
        next(error)
    }
}
// create comment
const createPyldVld = (req,res,next) => {
    try {
        const {commentContent, user_id} = req.body; // user_id tokendan alınacak
        if(commentContent){
            const newComment = {
                commentContent: req.body.commentContent
            };
            req.newComment = newComment;
            next()
        } else {
            res.status(400).json({message: "Güncellemek istediğiniz bilgileri giriniz!"});
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    idValidation,
    pyldVld,
    createPyldVld
}