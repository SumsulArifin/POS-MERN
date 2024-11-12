import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const RoleModel = mongoose.model("roles", roleSchema);
export default RoleModel;
