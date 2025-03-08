import express from "express"
import authRoutes from "./routes/auth.route.js"
import MessageRoutes from "./routes/message.route.js"

import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import cors from "cors"
import  {connectDB}  from "./lib/db.js";
import { app,server } from "./lib/socket.js";

import path from "path"
// middlware to let us extract the json data from the body
app.use(express.json());


dotenv.config();
const port = process.env.PORT;
const __dirname = path.resolve();
app.use(cookieParser()); // allow to parser the cookie (bring the cookie);
app.use(
    cors({
        origin: "http://localhost:5173", // Update to match your frontend
        credentials: true, // Allow cookies
    })
);
app.use("/api/auth", authRoutes);
app.use("/api/messages", MessageRoutes);

//make both the fronend and backend in one place localhost:5001
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req,res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    });
}

server.listen(port,()=>{
    console.log("server runing at : " , port)
    connectDB();
})