const router = require("express").Router();
const authMw = require("./auth-middleware");
const jwt = require("jsonwebtoken");
const bcyrptjs = require("bcryptjs");
const db = require("../../data/data-config");
const {JWT_SECRET} = require("../../config/index");
const tokenHelper = require("../../token-helper/token-helper")

const tokenGenerator = (user) => {
    const newUser = {
        user_id: user.user_id,
        nickName: user.nickName,
        userName: user.userName,
        userSurname: user.userSurname,
        role: user.role
    };
    const token = jwt.sign(newUser, JWT_SECRET, { expiresIn: "1h" });
    return token;
}

router.post("/register", authMw.registerPayloadVld, authMw.isNickNameExistInDb,authMw.isEmailExistInDb, async (req,res,next) => {
    try {
        let user = {
            nickName: req.body.nickName,
            password: req.body.password,
            userEmail: req.body.userEmail,
            userName: req.body.userName,
            userSurname: req.body.userSurname,
            secretQuestion: req.body.secretQuestion
        }; 
        const hashedPassword = bcyrptjs.hashSync(user.password, 10);
        const hashedSecretQuestion = bcyrptjs.hashSync(user.secretQuestion, 10);
        user.password = hashedPassword;
        user.secretQuestion = hashedSecretQuestion;
        await db("Users").insert(user);
        res.status(201).json({message: "Kullanıcı başarı ile kaydedildi..."})
    } catch (error) {
        next(error);
    }
});

router.post("/login", authMw.loginPayloadVld, authMw.passwordVld, async (req,res,next) => {
    try {
        const token = tokenGenerator(req.user);
        await tokenHelper.setToken(token.split(".")[2])
        res.json({message: `Hoşgeldin ${req.user.userName}, kullanıcı girişi başarılı.`, token: token});
    } catch (error) {
        next(error);
    }
});
router.post("/password/reset", async (req,res,next) => {
    try {
        const user = await db("Users").where("userEmail", req.body.userEmail).first();
        const verified = bcyrptjs.compareSync(req.body.secretQuestion, user.secretQuestion);
        if(verified){
            const hashedPassword = bcyrptjs.hashSync(req.body.password, 10);
            user.password = hashedPassword;
            await db("Users").where("userEmail", req.body.userEmail).update(user);
            res.status(201).json({message: "Şifre başarılı bir şekilde değiştirilmiştir..."});
        }else {
            res.status(400).json({message: "Gizli soru yanlış!"})
        }
    } catch (error) {
        next(error);
    }
});
router.get("/logout", authMw.restricted, async (req,res,next) => {
    try {
        await tokenHelper.deleteToken(req.headers.authorization.split(".")[2])
        res.json({message: "Logout başarılı"})
    } catch (error) {
        next(error);
    }
});


module.exports = router;