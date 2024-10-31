const { Router } = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken")
const { adminMiddleware } = require("../middleware/admin");
const {Course} = require("../models/db");
const { validateSignUp , validateLogIn } = require("../auth/admin.auth");
const { signUp} = require ("../auth/admin.auth")
const { login} = require("../auth/admin.auth")


adminRouter.post("/signup", async (req, res) => {

    const response = validateSignUp(req.body);
    if (!response.success) {
        return res.status(400).json({
            message: "Wrong input format",
            Error: response.error
        })
    }

    const adminData = await signUp(req.body);

    res.json({ message: "You are signedUp successfully as an admin" , username : adminData.firstname})
})


adminRouter.post("/login", async (req, res) => {
    const response = validateLogIn(req.body);
    if (!response.success) {
        return res.status(400).json({
            message: "Wrong input format",
            Error: response.error
        })
    }

    
    try {
        const loginUserData = await login(req.body.email, req.body.password);
        const token = jwt.sign(
            {
                id: loginUserData._id
            }, process.env.JWT_ADMIN_PASSWORD)

        res.json({
            message : "Successfully logged in",
            token: token
        })


    } catch (error) {
        res.status(403).json({ error: error.message })
    }
})


adminRouter.post("/create/course", adminMiddleware, async (req, res) => {
    try {
        const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;

    const course = await Course.create({
        title, description, imageUrl, price, creatorId : adminId
    })

    res.json({
        msg: "You have created the course successfully",
        courseId: course._id
    })

    } catch (error) {
        res.json({error: error.message})
    }
    })

adminRouter.put("/edit/course",adminMiddleware, async (req, res) => { ``

    try {
        const adminId = req.userId


    const {title, description, imageUrl, price , courseId} = req.body;

    const course = await Course.updateOne({
        _id : courseId,
        creatorId : adminId
    },
    {title, description, imageUrl, price })

    res.json({
        msg: "you have edited your course successfully",
    })
    } catch (error) {
        res.json({error: error.message})
    }
})

adminRouter.get("/view/course", adminMiddleware, async (req, res) => { 
    const adminId = req.userId

    const courses = await Course.find({
        creatorId : adminId
    })
    res.json({
        msg: "Here are the courses you made",
        courses,
    })
})


module.exports = {
    adminRouter: adminRouter
}