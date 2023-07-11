const router = require("express").Router();
const { getAllUsers, getUserWithTweets, getUserById, updateUser, deleteUser } = require("./users-model");
// get all users
router.get("/", async (req,res,next)=>{
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        next(error)
    }
})
// find user with tweets
router.get("/tweets/:id", async (req,res,next)=>{
    try {
        const user = await getUserWithTweets(req.params.id);
        res.json(user);
    } catch (error) {
        next(error)
    }
})
// find user by id
router.get("/:id", async (req,res,next)=>{
    try {
        const user = await getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        next(error)
    }
})
// update user
router.post("/:id", async (req,res,next)=>{
    try {
        const newUser = {};
        req.body.nickName ? newUser.nickName = req.body.nickName : "";
        req.body.userName ? newUser.userName = req.body.userName : "";
        req.body.userSurname ? newUser.userSurname = req.body.userSurname : "";
        req.body.userEmail ? newUser.userEmail = req.body.userEmail : "";
        const user = await updateUser(req.params.id, newUser);
        res.json(user);
    } catch (error) {
        next(error)
    }
})
// delete user by id
router.delete("/:id", async (req,res,next)=>{
    try {
        const user = await deleteUser(req.params.id);
        res.json(user);
    } catch (error) {
        next(error)
    }
})


module.exports = router;