const { getTweetById } = require("./tweets-model");

const idValidation = async (req,res,next) => {
    try {
        const tweet = await getTweetById(req.params.id);
        if(tweet){
            req.tweet = tweet;
            next()
        } else {
            res.status(404).json({messagge: "Tweet bulunamadı!"});
        }
    } catch (error) {
        next(error);
    }
}

const pyldVld = (req,res,next) => {
    try {
        const allowedKeys = ["tweetContent", "numberOfLikes", "numberOfComments"];
        const sentAllowedKeys = Object.keys(req.body).filter(key => allowedKeys.includes(key));
        if(sentAllowedKeys.length > 0){
            const newTweet = {
                updated_at: new Date().toISOString().replace("T", " ").slice(0,19)
            };
            sentAllowedKeys.forEach(item => {
                newTweet[item] = req.body[item];
            });
            req.newTweet = newTweet;
            next()
        } else {
            res.status(400).json({message: "Güncellemek istediğiniz bilgileri giriniz!"});
        }
    } catch (error) {
        next(error)
    }
}
// create tweet
const createPyldVld = (req,res,next) => {
    try {
        const {tweetContent} = req.body;
        if(tweetContent){
            const newTweet = {
                tweetContent: req.body.tweetContent,
                user_id: req.decodedToken.user_id
            };
            req.newTweet = newTweet;
            next()
        } else {
            res.status(400).json({message: "Güncellemek istediğiniz bilgileri giriniz!"});
        }
    } catch (error) {
        next(error)
    }
}

const isAdminOrOwnTweet = (req,res,next)=>{
    try {
        if(req.decodedToken.role == "Admin" || req.tweet.user_id == req.decodedToken.user_id){
           next()
        } else {
           res.status(403).json({message: "Yetkiniz yok!"})
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    idValidation,
    pyldVld,
    createPyldVld,
    isAdminOrOwnTweet
}