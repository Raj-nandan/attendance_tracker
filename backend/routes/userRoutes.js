import express from "express";
import {
  getDailySummery,
  getUserByID,
  getUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserByID);
// router.get("/:employeeID", getDailySummery);

export default router;
