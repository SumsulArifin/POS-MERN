import jwt from "jsonwebtoken"
import UserModel from "../models/User.js"
const isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            res.status(401).json({ message: "No User Token" })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRETE)
        const user = await UserModel.findById(decode.userId)
        console.log(user);
        if (!user) {
            res.status(404).json({ message: "User Not Found" })
        }
        if (user.role !== 'admin') {
            res.status(404).json({ message: "User Not Admin" })
        }
        req.user = user
        next()

    } catch (error) {
        console.log(error);

    }
}
export default isAdmin 