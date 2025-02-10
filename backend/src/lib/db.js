import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("db connect succussfuly: " , conn.connection.host);
    } catch(err){
        console.log("cannot connect: ",err)
    }
}