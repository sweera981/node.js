import mongoose from 'mongoose';
import { DB_NAME } from '../constants/dbName.js';
const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("connected to mongodb")
    } catch (error) {
        console.log(`error:${error.message}`)
        process.exit(1);
    }

}
export default connectDB;