const { getUserById } = require("./users-model");

const idValidation = async (req,res,next) => {
    try {
        const user = await getUserById(req.params.id);
        if(user){
            req.user = user;
            next()
        } else {
            res.status(404).json({messagge: "Kullanıcı bulunamadı!"});
        }
    } catch (error) {
        next(error);
    }
}

const pyldVld = (req,res,next) => {
    try {
        const allowedKeys = ["nickName", "userName", "userSurname", "userEmail"];
        const sentAllowedKeys = Object.keys(req.body).filter(key => allowedKeys.includes(key));
        if(sentAllowedKeys.length > 0){
            const newUser = {};
            sentAllowedKeys.forEach(item => {
                newUser[item] = req.body[item];
            });
            req.newUser = newUser;
            next()
        } else {
            res.status(400).json({message: "Güncellemek istediğiniz bilgileri giriniz!"});
        }
    } catch (error) {
        next(error)
    }
}

const isAdminOrLoggedInUser = (req,res,next)=>{
    try {
         if(req.decodedToken.role == "Admin" || req.params.id == req.decodedToken.user_id){
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
    isAdminOrLoggedInUser
}