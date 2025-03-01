import express from "express"
import authRoutes from "./routes/auth.route.js"
import MessageRoutes from "./routes/message.route.js"

import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import cors from "cors"
import  {connectDB}  from "./lib/db.js";

const app = express();
// middlware to let us extract the json data from the body
app.use(express.json());


dotenv.config();
const port = process.env.PORT;

app.use(cookieParser()); // allow to parser the cookie (bring the cookie);
app.use(
    cors({
        origin: "http://localhost:5173", // Update to match your frontend
        credentials: true, // Allow cookies
    })
);
app.use("/api/auth", authRoutes);
app.use("/api/messages", MessageRoutes);

app.listen(port,()=>{
    console.log("server runing at : " , port)
    connectDB();
})