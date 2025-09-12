import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
    }
    catch(error){
        throw new Error("Could not connect to database " + error)
    }
}
export default connectDB; 