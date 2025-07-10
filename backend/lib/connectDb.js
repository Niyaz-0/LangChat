import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfully...')

    } catch (error) {
        console.log('Error while connecting to the database', error)
        process.exit(1)
    }
}