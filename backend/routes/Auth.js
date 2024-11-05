import express from 'express'
import authController from '../controllers/Auth.js'

const AuthRoute = express.Router()

AuthRoute.post("/register", authController.ragister)
AuthRoute.post("/login", authController.Login)
AuthRoute.post("/logout", authController.Logout)
export default AuthRoute