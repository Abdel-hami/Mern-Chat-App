import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js"


export const getUserLists = async(req,res) => {
    try {
        const userLoggedInId = req.user._id;
        const filtredUsers = await User.find({_id:{$ne:userLoggedInId}}).select("-password");

        res.status(200).json(filtredUsers);
    } catch (error) {
        console.log("error in getUserLists controller: ", error.message);
        res.status(500).json({message: "internal error"});
    }
}

export const getMessages = async(req,res)=>{
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:userToChatId, receiverId:myId},
                {senderId:myId, receiverId:userToChatId},
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("error in getUserLists controller: ", error.message);
        res.status(500).json({message: "internal error"});
    }
}

export const senMessage = async(req,res)=>{
    try {
        const {text, image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let image_url;
        if(image){
            const imageRes = await cloudinary.uploader.upload(image);
            image_url = imageRes.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: image_url
        })
        await newMessage.save();
        // todo: real time functionality foes here: => socket.io
        res.status(200).json(newMessage);
    } catch (error) {
        console.log("error in sendMessage controller: ", error.message);
        res.status(500).json({message: "internal error"});
    }
}