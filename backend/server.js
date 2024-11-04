import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
const port = process.env.PORT || 4000


const app = express()
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
    res.send("Test")
})

app.listen(port, () => {
    console.log(`Server is running ${port}`);

})

