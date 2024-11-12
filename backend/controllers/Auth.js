import RoleModel from "../models/RoleModel.js"
import UserModel from "../models/User.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"



const createRole = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if the role already exists
        const existingRole = await RoleModel.findOne({ name });
        if (existingRole) {
            return res.status(400).json({ success: false, message: "Role already exists" });
        }
        // Create new role
        const newRole = new RoleModel({ name });
        await newRole.save();

        res.status(201).json({ success: true, message: "Role created successfully", role: newRole });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
        console.error(error);
    }
};




const ragister = async (req, res) => {
    try {
        const { name, email, password, roleName = "user" } = req.body
        const existUser = await UserModel.findOne({ email })

        if (existUser) {
            return res.status(401).json({ success: false, message: "user already Have" })
        }
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const role = await RoleModel.findOne({ name: roleName });
        if (!role) {
            return res.status(400).json({ success: false, message: "Invalid role" });
        }
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            role: role._id
        });

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

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
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

export default { ragister, Login, Logout, createRole };