
import express from "express"
import cors from "cors"
import dotenv from 'dotenv';
import DbCon from './utils/db.js';
import AuthRoute from "./routes/Auth.js";
import cookieParser from "cookie-parser";
import AdminRoute from "./routes/AdminRoute.js";
dotenv.config

const port = process.env.PORT || 3000
const app = express()

// mongo db 
DbCon()
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.use("/api/auth", AuthRoute)
app.use("/api/admin", AdminRoute)

app.get("/", (req, res) => {
    res.send("Hello")
})

app.listen(port, () => {
    console.log(`server runnig in ${port}`);

})
