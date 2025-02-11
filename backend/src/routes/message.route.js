import express from "express";
import { protectRoute } from "../middleware/auth.middlware.js";
import { getMessages, getUserLists, senMessage } from "../controllers/message.controllers.js";
const router = express.Router();

router.get("/users", protectRoute, getUserLists);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id",protectRoute,senMessage);

export default router;