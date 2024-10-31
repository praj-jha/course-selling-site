const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
    try {
        
        const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_USER_PASSWORD)


if (decoded) {
    req.userId = decoded.id;
    next()
} else {
    res.status(403).json({
        msg: "You are not signed in"
    })
}

    } catch (error) {
        res.json({error : error.message})
    }
    
}


module.exports = {
    userMiddleware,
}