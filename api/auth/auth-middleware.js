const db = require("../../data/data-config");
const bcyrptjs = require("bcryptjs");
const userModel = require("../users/users-model");
const {JWT_SECRET} = require("../../config/index");

const registerPayloadVld = (req, res, next) => {
    try {
        const {nickName, userEmail, userName,userSurname, password} = req.body;
        if(!nickName || !userEmail || !password || !userName || !userSurname){
            res.status(400).json({message: "Kullanıcı bilgileri eksiksiz girilmelidir!"})
        } else {
            next()
        }
    } catch (error) {
        next(error);
    }
}

const loginPayloadVld = (req, res, next) => {
    try {
        const {nickName, userEmail, password} = req.body;
        if(!(password && (nickName || userEmail))){
            res.status(400).json({message: "Kullanıcı bilgileri eksiksiz girilmelidir!"})
        } else {
            req.userKey = nickName ? {"nickName": nickName} : {"userEmail" : userEmail};
            next()
        }
    } catch (error) {
        next(error);
    }
}

const passwordVld = async (req, res, next) => {
    try {
        const user = await userModel.findUserByKey(req.userKey);
        // console.log(user);
        // console.log(bcyrptjs.compareSync(req.body.password, user.password));
        if(bcyrptjs.compareSync(req.body.password, user.password)){
            req.user = user;
            next();
        } else {
            res.json({message: "Kullanıcı adı veya şifre hatalı!"});
        }
    } catch (error) {
        next(error);
    }
}

const isNickNameExistInDb = async (req, res, next) => {
    try {
        const user = await db("Users").where("nickName", req.body.nickName).first();
        if(user){
            res.json({message: "Kullanıcı adı daha önce alınmış!"});
        } else {
            next();
        }
    } catch (error) {
        next(error)
    }
}

const isEmailExistInDb = async (req, res, next) => {
    try {
        const user = await db("Users").where("userEmail", req.body.userEmail).first();
        if(user){
            res.json({message: "Email daha önce alınmış!"});
        } else {
            next();
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    registerPayloadVld,
    isNickNameExistInDb,
    isEmailExistInDb,
    loginPayloadVld,
    passwordVld
}