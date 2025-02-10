import express from "express"
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv";
import  {connectDB}  from "./lib/db.js";

const app = express();
// middlware to let us extract the json data from the body
app.use(express.json());


dotenv.config();
const port = process.env.PORT;

app.use("/api/auth", authRoutes);

app.listen(port,()=>{
    console.log("server runing at : " , port)
    connectDB();
})