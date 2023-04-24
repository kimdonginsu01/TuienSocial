import express from "express";
import { getAllUser, getUser, updateUser } from "../controllers/user.js";

const router = express.Router();

router.get("/", getAllUser);
router.get("/find/:userId", getUser);
router.put("/", updateUser);

export default router;
