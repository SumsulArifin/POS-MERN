import UserModel from "../models/User.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const ragister = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existUser = await UserModel.findOne({ email })

        if (existUser) {
            return res.status(401).json({ success: false, message: "user already Have" })
        }
        const hassPassword = await bcryptjs.hashSync(password, 10)
        const newUser = new UserModel({
            name, email, password: hassPassword
        })
        await newUser.save()
        res.status(200).json({ message: "User Create Successfuly", newUser })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
        console.log(error);

    }
}

const Login = async (req, res) => {

    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalide User" })
        }
        const isPasswordValide = await bcryptjs.compare(password, user.password)
        if (!isPasswordValide) {
            return res.status(404).json({ success: false, message: "Invalide Password" })

        }
        //npm i cookie-parser npm install jsonwebtoken npm i bcryptjs

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETE)
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000
        })
        res.status(200).json({ success: true, message: "Successfuly Login", user, token })

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
        console.log(error);


    }
}
const Logout = async (req, res) => {
    try {

        res.clearCookie('token')
        res.status(200).json({ message: "Successfuly Logout" })


    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
        console.log(error);
    }
}

export default { ragister, Login, Logout };