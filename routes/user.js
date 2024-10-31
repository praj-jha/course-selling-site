const { Router } = require("express");
const userRouter = Router();
const jwt = require("jsonwebtoken")
const { validateSignUp, validateLogIn } = require("../auth/user.auth")
const { signUp } = require("../auth/user.auth")
const { login } = require("../auth/user.auth")




userRouter.post("/signup", async (req, res) => {

    const response = validateSignUp(req.body);
    if (!response.success) {
        return res.status(400).json({
            message: "Wrong input format",
            Error: response.error
        })
    }


    const userData = await signUp(req.body);

    res.json({ message: "You are signedUp successfully", userId : userData.firstname })

})


userRouter.post("/login", async (req, res) => {

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
            }, process.env.JWT_USER_PASSWORD)

        res.json({
            message : "Successfully logged in",
            token: token
        })

``
    } catch (error) {
        res.status(403).json({ error: error.message })
    }

})


module.exports = {
    userRouter: userRouter
}