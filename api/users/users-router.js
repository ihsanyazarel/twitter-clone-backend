const router = require("express").Router();
const { idValidation, pyldVld, isAdminOrLoggedInUser } = require("./users-middleware");
const { getAllUsers, getUserWithTweets, updateUser, deleteUser } = require("./users-model");
// get all users - available for everyone
router.get("/", async (req,res,next)=>{
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        next(error)
    }
})
// find user with tweets by user_id - available for everyone
router.get("/tweets/:id",idValidation, async (req,res,next)=>{
    try {
        const user = await getUserWithTweets(req.params.id);
        res.json(user);
    } catch (error) {
        next(error)
    }
})
// find user by user_id - available for everyone
router.get("/:id",idValidation, async (req,res,next)=>{
    try {
        // const user = await getUserById(req.params.id);
        res.json(req.user);
    } catch (error) {
        next(error)
    }
})
// update user by user_id
// available for admin and user who request with his/her own id
router.put("/:id",pyldVld,idValidation, isAdminOrLoggedInUser, async (req,res,next)=>{
    try {
        const user = await updateUser(req.params.id, req.newUser);
        res.json(user);
    } catch (error) {
        next(error)
    }
})
// delete user by id
// available for admin and user who request with his/her own id
router.delete("/:id",idValidation, isAdminOrLoggedInUser, async (req,res,next)=>{
    try {
        const user = await deleteUser(req.params.id);
        res.json(user);
    } catch (error) {
        next(error)
    }
})


module.exports = router;