const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const ObjectId = mongoose.Types.ObjectId;
const userSchema = new Schema({
    firstname : {
        type : String,
        required : true,
    },
    lastname : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    }
    
});


const adminSchema = new Schema({
    firstname : {
        type : String,
        required : true,
    },
    lastname : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    }
    
});

const courseSchema = new Schema({
    title: String,
    description : String,
    price: Number,
    imageUrl : String,
    creatorId: ObjectId,
})

const purchaseSchema = new Schema({
    userId: ObjectId,
    CourseId: ObjectId,
})


const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);
const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = {
    User,
    Admin,
    Course,
    Purchase
}