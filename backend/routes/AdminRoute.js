import express from "express"
import adminController from '../controllers/Admin.js'
import check from "../middlware/verifyToken.js"

const AdminRoute = express.Router()
AdminRoute.get("/getuser", check.isManager, adminController.GetUser)
AdminRoute.post("/delete/:id", check.isMainAdmin, adminController.DeletedUser)

export default AdminRoute