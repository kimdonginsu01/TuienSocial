import express from "express";
import { createChat, findChat, findChats } from "../controllers/chat.js";

const router = express.Router();

router.post("/", createChat);
router.get("/", findChats);
router.get("/:id", findChat);

export default router;
