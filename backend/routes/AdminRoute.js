import express from "express"
import adminController from '../controllers/Admin.js'
import isAdmin from "../middlware/verifyToken.js"

const AdminRoute = express.Router()
AdminRoute.get("/getuser", isAdmin, adminController.GetUser)
AdminRoute.get("/delete", isAdmin, adminController.DeletedUser)

export default AdminRoute