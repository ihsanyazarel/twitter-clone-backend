const router = require("express").Router();
const authMw = require("./auth-middleware");
const jwt = require("jsonwebtoken");
const bcyrptjs = require("bcryptjs");
const db = require("../../data/data-config");
const {JWT_SECRET} = require("../../config/index");

const tokenGenerator = (user) => {
    const newUser = {
        user_id: user.user_id,
        nickName: user.nickName,
        userName: user.userName,
        userSurname: user.userSurname
    };
    const token = jwt.sign(newUser, JWT_SECRET, { expiresIn: "3h" });
    return token;
}

router.post("/register", authMw.registerPayloadVld, authMw.isNickNameExistInDb,authMw.isEmailExistInDb, async (req,res,next) => {
    try {
        let user = req.body;
        const hashedPassword = bcyrptjs.hashSync(user.password, 10);
        user.password = hashedPassword;
        await db("Users").insert(user);
        res.json({message: "Kullanıcı başarı ile kaydedildi..."})
    } catch (error) {
        next(error);
    }
});

router.post("/login", authMw.loginPayloadVld, authMw.passwordVld, async (req,res,next) => {
    try {
        const token = tokenGenerator(req.user);
        res.json({message: `Hoşgeldin ${req.user.userName}, kullanıcı girişi başarılı.`, token: token});
    } catch (error) {
        next(error);
    }
});
router.post("/password/reset",  (req,res,next) => {
    try {
        res.json({message: "router.post(/password/reset)"})
    } catch (error) {
        next(error);
    }
});
router.get("/logout", (req,res,next) => {
    try {
        res.json({message: "router.post(/logout)"})
    } catch (error) {
        next(error);
    }
});


module.exports = router;