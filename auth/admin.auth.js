const zod = require("zod")
const bcrypt = require("bcrypt")
const { Admin } = require("../models/db")


function validateSignUp(obj) {
    const UserInput = zod.object({
        firstname: zod.string(),
        lastname: zod.string(),
        email: zod.string().email(),
        password: zod.string().min(8, { message: "The password should be atleast 8 chars long" })
    })
    return UserInput.safeParse(obj);
}

function validateLogIn(obj) {
    const UserInput = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8, { message: "The password should be atleast 8 chars long" })
    })
    return UserInput.safeParse(obj);
}

async function signUp(data) {

    try {
        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(data.password, saltRounds)

        const admin = new Admin({ firstname: data.firstname, lastname: data.lastname, email: data.email, password: hashedPassword })

        const savedUser = await admin.save();

        return savedUser;


    } catch (error) {
        console.error('Error in registration:', error);
    }

}

async function login(email, password) {
    try {
        const admin = await Admin.findOne({ email })
        if (!admin) {
            throw new Error('Admin not found ')
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            throw new Error('Password is invalid')
        }

        return admin;


    } catch (error) {
        console.error("Login error", error.message)``
    }
}

module.exports = ({
    validateSignUp,
    validateLogIn,
    signUp,
    login
})