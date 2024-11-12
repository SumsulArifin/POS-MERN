import mongoose from "mongoose";
import RoleModel from "../models/RoleModel.js"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles",
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const UserModel = mongoose.model("users", userSchema);
export default UserModel;


// import mongoose from "mongoose";

// const userSechmea = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     role: {
//         type: String,
//         enum: ['admin', "user"],
//         default: "user"
//     },
//     password: {
//         type: String,
//         required: true
//     }
// }, { timestamps: true })


// const UserModel = mongoose.model('users', userSechmea)


// export default UserModel