
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL || "";

function connectDB(){
    mongoose.connect(MONGO_URL).then(()=>console.log("DB connected successfully")).catch((err) => console.log("Errorr", err));
}

export default connectDB;