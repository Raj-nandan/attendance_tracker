import express from "express";
import {
  allAttendance,
  checkIn,
  checkOut,
  getEmpAttendance,
} from "../controllers/attrndanceController.js";

const router = express.Router();

// Check-in Route
router.post("/checkin", checkIn);
router.post("/checkout", checkOut);
router.get("/", allAttendance);
router.get("/:employeeID", getEmpAttendance);

export default router;
