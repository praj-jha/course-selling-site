const { Router } = require("express")
const courseRouter = Router();
const { userMiddleware } = require("../middleware/user");
const { Course } = require("../models/db");
const { Purchase } = require("../models/db");


courseRouter.post("/purchase", userMiddleware,  async (req, res) => { // purchase courses


    try {
        const userId = req.userId
        const purchaseCourseId = req.body.courseId

        //somewhere here we can handle the payment part 

        const purchaseCourse = await Purchase.create({ CourseId: purchaseCourseId , userId})

    res.json({
        message: "Purchase successful",
        purchaseCourse,
    })
    } catch (error) {
        res.status(404).json({message : "Some error in purchase"})
    }
    
})

courseRouter.get("/view/purchase", userMiddleware, async (req, res) => {

    try {
        const userId = req.userId;

        /*this purchasedCourse var will find the unique user with that userId
        anf then with that purchasedCourse we can find the courseId of the course and
        later can search in the Course model which i did */

    const purchasedCourse = await Purchase.findOne({
        userId,
    })

    const userCourses = await Course.findOne({_id : purchasedCourse.CourseId})
    res.json({
        message: "Your courses",
        userCourses,
    })

    } catch (error) {
        res.json({error: error.message})
    }

    
})


courseRouter.get("/preview", async (req, res) => {  //courses available

    const course = await Course.find({})
    res.json({
        message: "All courses",
        course,
    })
})


module.exports = {
    courseRouter: courseRouter
}