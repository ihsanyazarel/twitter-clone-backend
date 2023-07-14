const db = require("../../data/data-config");
const bcyrptjs = require("bcryptjs");
const userModel = require("../users/users-model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/index");
const tokenBlackList = [];
const registerPayloadVld = (req, res, next) => {
  try {
    const {nickName, userEmail, userName, userSurname, password, secretQuestion} = req.body;
    if (!nickName || !userEmail || !password || !userName || !userSurname || !secretQuestion) {
      res.status(400).json({ message: "Kullanıcı bilgileri eksiksiz girilmelidir!" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const isNickNameExistInDb = async (req, res, next) => {
  try {
    const user = await db("Users").where("nickName", req.body.nickName).first();
    if (user) {
      res.json({ message: "Kullanıcı adı daha önce alınmış!" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const isEmailExistInDb = async (req, res, next) => {
  try {
    const user = await db("Users")
      .where("userEmail", req.body.userEmail)
      .first();
    if (user) {
      res.json({ message: "Email daha önce alınmış!" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const loginPayloadVld = (req, res, next) => {
  try {
    const { nickName, userEmail, password } = req.body;
    if (!(password && (nickName || userEmail))) {
      res
        .status(400)
        .json({ message: "Kullanıcı bilgileri eksiksiz girilmelidir!" });
    } else {
      req.userKey = nickName ? { nickName: nickName } : { userEmail: userEmail };
      next();
    }
  } catch (error) {
    next(error);
  }
};

const passwordVld = async (req, res, next) => {
  try {
    const user = await userModel.findUserByKey(req.userKey);
    if (user) {
      if (bcyrptjs.compareSync(req.body.password, user.password)) {
        req.user = user;
        next();
      } else {
        res.json({ message: "Kullanıcı adı veya şifre hatalı!" });
      }
    } else {
      res.json({ message: "Kullanıcı bilgisi bulunamadı!" });
    }
  } catch (error) {
    next(error);
  }
};

const restricted = (req, res, next) => {
  try {
    const sentToken = req.headers.authorization;
    if (sentToken) {
      const tokenSecret = sentToken.split(".")[2];
      if (tokenBlackList.filter((item) => item == tokenSecret).length > 0) {
        res.status(400).json({ message: "Token geçersiz!" });
      } else {
        jwt.verify(sentToken, JWT_SECRET, (err, decodedToken) => {
          if (err) {
            res.status(400).json({ message: "Token geçersiz!" });
          } else {
            req.decodedToken = decodedToken;
            next();
          }
        });
      }
    } else {
      res.status(400).json({ message: "Token bilgisi gereklidir!" });
    }
  } catch (error) {
    next(error);
  }
};


const isAdmin = (req,res,next)=>{
  try {
       if(req.decodedToken.role == "Admin"){
          next()
       } else {
          res.status(400).json({message: "Yetkiniz yok!"})
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
  passwordVld,
  restricted,
  tokenBlackList,
  isAdmin
};
