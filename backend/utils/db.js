import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();

console.log("MONGODB_URL:", process.env.MONGODB_URL);  // Add this line


const DbCon = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB is connected');
    } catch (error) {
        console.log(error);
    }
};

export default DbCon;
// import mongoose from "mongoose";


// const DbCon = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URL)
//         console.log('mongo db is connected')
//     } catch (error) {
//         console.log(error)
//     }
// }

// export default DbCon
