// import  jwt from "jsonwebtoken";
// import User from "../models/user.model.js";

// export const protectRoute = async(req,res,next)=>{
//     try{
//         // console.log("Cookies received: ", req.cookies); // Debugging log
//         const token = req.cookies.jwt;
//         if(!token) {
//             return res.status(401).json({message: "unauthorized - no token provided"});
//         }
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if(!decoded){
//             return res.status(401).json({message: "unauthorized - token invalid"});
//         }
//         const user = await User.findById(decoded.userId).select("-password");
//         if(!user){
//             return res.status(404).json({message: "user not found"});
//         }
//         req.user = user;
//         next();
//     } catch(error){
//         console.log("error in protectRoute middleware: ", error.message);
//         res.status(500).json({message:"internal error"});
//     }
// }
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        console.log("Cookies received: ", req.cookies); // Debugging log
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        // Decode the token to inspect its payload
        const decoded = jwt.decode(token);
        console.log("Decoded token:", decoded);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Token invalid" });
        }

        // Debug: Log the JWT_SECRET
        console.log("JWT_SECRET:", process.env.JWT_SECRET);

        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Verified token:", verified);

        const user = await User.findById(verified.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        res.status(500).json({ message: "Internal error" });
    }
};