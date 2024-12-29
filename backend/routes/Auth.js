import express from 'express'
import authController from '../controllers/Auth.js'
import check from "../middlware/verifyToken.js"

const AuthRoute = express.Router()

AuthRoute.post("/register", authController.ragister)
AuthRoute.post("/role", check.isManager, authController.createRole)
AuthRoute.post("/login", authController.Login)
AuthRoute.post("/logout", authController.Logout)
export default AuthRoute