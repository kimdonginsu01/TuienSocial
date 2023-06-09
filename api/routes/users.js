import express from "express";
import {
  getAllUser,
  getFriends,
  getPotentialFriends,
  getUser,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", getAllUser);
router.get("/find/:userId", getUser);
router.put("/", updateUser);
router.get("/friends/:userId", getFriends);
router.get("/potential-friends/:userId", getPotentialFriends);

export default router;
