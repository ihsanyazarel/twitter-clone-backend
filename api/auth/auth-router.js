const router = require("express").Router();

router.post("/register", (req,res,next) => {
    try {
        res.json({message: "router.post(/register)"})
    } catch (error) {
        next(error);
    }
});
router.post("/login", (req,res,next) => {
    try {
        res.json({message: "router.post(/login)"})
    } catch (error) {
        next(error);
    }
});
router.post("/password/reset", (req,res,next) => {
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