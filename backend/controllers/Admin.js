import UserModel from "../models/User.js"

const GetUser = async (req, res) => {
    try {
        const users = await UserModel.find().populate("role")
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" })
        }
        res.status(200).json({ users })
    } catch (error) {
        console.error("Error fetching users: ", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
};


const DeletedUser = async (req, res) => {
    try {
        const userId = req.params.id

        const checkAdmin = await UserModel.findById(userId)
        if (checkAdmin.role == 'admin') {
            res.status(409).json({ message: "You can not delete yourself" })

        }
        const user = await UserModel.findByIdAndDelete(userId)
        if (!user) {
            res.status(401).json({ message: "User Not Found" })
        }
        res.status(200).json({ message: "user deleted", user })
    } catch (error) {
        res.status(404).json({ message: "Internal server error" })
        console.log(error);
    }
}
export default { GetUser, DeletedUser }