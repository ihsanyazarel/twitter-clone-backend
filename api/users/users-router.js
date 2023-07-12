const router = require("express").Router();
const { idValidation, pyldVld } = require("./users-middleware");
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
router.get("/tweets/:id",idValidation, async (req,res,next)=>{
    try {
        const user = await getUserWithTweets(req.params.id);
        res.json(user);
    } catch (error) {
        next(error)
    }
})
// find user by id
router.get("/:id",idValidation, async (req,res,next)=>{
    try {
        // const user = await getUserById(req.params.id);
        res.json(req.user);
    } catch (error) {
        next(error)
    }
})
// update user
router.post("/:id",pyldVld,idValidation, async (req,res,next)=>{
    try {
        const user = await updateUser(req.params.id, req.newUser);
        res.json(user);
    } catch (error) {
        next(error)
    }
})
// delete user by id
router.delete("/:id",idValidation, async (req,res,next)=>{
    try {
        const user = await deleteUser(req.params.id);
        res.json(user);
    } catch (error) {
        next(error)
    }
})


module.exports = router;