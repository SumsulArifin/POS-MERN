import jwt from "jsonwebtoken"
import UserModel from "../models/User.js"

const isMainAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "No User Token" })
        }

        // Ensure JWT_SECRET is loaded
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "Server Error: JWT Secret is missing." })
        }

        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Find user and populate the role field
        const user = await UserModel.findById(decoded.userId).populate("role")

        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }

        // Check if user role is admin
        if (user.role.name !== "admin") {
            return res.status(403).json({ message: "User Not Authorized" })
        }

        req.user = user
        next()
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}
const isManager = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "No User Token" })
        }

        // Ensure JWT_SECRET is loaded
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "Server Error: JWT Secret is missing." })
        }

        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Find user and populate the role field
        const user = await UserModel.findById(decoded.userId).populate("role")

        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }

        // Check if user role is admin
        if (user.role.name !== "manager" && user.role.name !== "admin") {
            return res.status(403).json({ message: "User Not Authorized" })
        }

        req.user = user
        next()
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

export default { isMainAdmin, isManager }


// const isAdmin = async (req, res, next) => {
//     try {
//         const token = req.cookies.token
//         if (!token) {
//             res.status(401).json({ message: "No User Token" })
//         }
//         const decode = jwt.verify(token, process.env.JWT_SECRETE)
//         const user = await UserModel.findById(decode.userId)
//         console.log(user);
//         if (!user) {
//             res.status(404).json({ message: "User Not Found" })
//         }
//         if (user.role.name !== 'manager') {
//             res.status(404).json({ message: "User Not Admin" })
//         }
//         req.user = user
//         next()

//     } catch (error) {
//         console.log(error);

//     }
// }
// export default isAdmin 