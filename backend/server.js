import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import DbCon from "./utils/db.js"
import AuthRoute from "./routes/Auth.js"
import cookieParser from "cookie-parser"
import AdminRoute from "./routes/AdminRoute.js"
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./utils/swaggerConfig.js"
dotenv.config()

const app = express() // Move this to the top
const port = process.env.PORT || 3000
// MongoDB Connection
DbCon()

// Middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Swagger-UI Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// API Routes
app.use("/api/auth", AuthRoute)
app.use("/api/admin", AdminRoute)

app.get("/", (req, res) => {
    res.send("Hello")
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});


// import express from "express"
// import cors from "cors"
// import dotenv from 'dotenv';
// import DbCon from './utils/db.js';
// import AuthRoute from "./routes/Auth.js";
// import cookieParser from "cookie-parser";
// import AdminRoute from "./routes/AdminRoute.js";
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./swaggerConfig'); // Import your Swagger config
// dotenv.config

// // Swagger-UI Route
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// const port = process.env.PORT || 3000
// const app = express()

// // mongo db
// DbCon()
// app.use(express.json())
// app.use(cors())
// app.use(cookieParser())


// app.use("/api/auth", AuthRoute)
// app.use("/api/admin", AdminRoute)

// app.get("/", (req, res) => {
//     res.send("Hello")
// })

// app.listen(port, () => {
//     console.log(`server runnig in ${port}`)

// })
