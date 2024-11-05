import UserModel from "../models/User.js"

const GetUser = async (req, res) => {
    try {
        const user = await UserModel.find()
        res.status(200).json({ user })
    } catch (error) {
        res.status(404).json({ message: "Internal server error" })
        console.log(error);

    }
}

const DeletedUser = async (req, res) => {
    try {
        const userId = req.params.id
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