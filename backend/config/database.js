import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://johnmater842002:NizpVFI3wKJNAo1K@cluster0.louoj.mongodb.net/<dbname>?retryWrites=true&w=majority");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("DB not connected");
        
        console.error("Error connecting to MongoDB: ", error);
    }
};

export default connectDB;
