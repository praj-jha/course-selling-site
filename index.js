const express = require("express")
require('dotenv').config();
const mongoose = require("mongoose")
const { courseRouter } = require("./routes/course")
const { userRouter } = require("./routes/user")
const { adminRouter } = require("./routes/admin")


const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter); //ie any req coming to that prefix will go to userRouter
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/course", courseRouter);

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_CONNECT}`)
        console.log(connectionInstance.connection.host);
        app.listen(3000);
    } catch (error) {
        console.log("MONGODB Connection Error", error)
        process.exit(1)
    }
    connectDb();

}
