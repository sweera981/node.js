// import mongoose from 'mongoose';
// import { DB_NAME } from '../constants/dbName.js';
// const connectDB = async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         console.log("connected to mongodb")
//     } catch (error) {
//         console.log(`error:${error.message}`)
//         process.exit(1);
//     }

// }
// export default connectDB;


import mongoose from 'mongoose';
import { DB_NAME } from '../constants/dbName.js';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { dbName: DB_NAME });
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.log(`Database Connection Error: ${error.message}`);
    }
};

export default connectDB;