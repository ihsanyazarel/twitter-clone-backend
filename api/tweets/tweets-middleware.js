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
            const newTweet = {};
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

module.exports = {
    idValidation,
    pyldVld,
}