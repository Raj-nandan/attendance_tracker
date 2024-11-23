import attendanceModel from "../models/attendanceModel.js";
import UserModel from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const employees = await UserModel.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching employees." });
  }
};

export const getUserByID = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting User:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getUserAttendance = async (req, res) => {
  const { employeeID } = req.params;

  try {
    const attendanceLogs = await attendanceModel.find({ employeeID }).sort({
      checkInTime: -1,
    }); // Recent logs first
    if (attendanceLogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No attendance records found for this employee.",
      });
    }
    res.status(200).json({ success: true, attendanceLogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching attendance records.",
    });
  }
};

export const getDailySummery = async (req, res) => {
  const { date } = req.params;
  const startOfDay = new Date(date);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999); // End of the day

  try {
    // Fetch all attendance records for the day
    const attendanceLogs = await attendanceModel.find({
      checkInTime: { $gte: startOfDay, $lte: endOfDay },
    });

    // Fetch all employees
    const totalEmployees = await UserModel.countDocuments();
    const attendedEmployees = new Set(
      attendanceLogs.map((log) => log.employeeID)
    );
    const absentEmployees = totalEmployees - attendedEmployees.size;

    const summary = {
      totalEmployees,
      lateCheckIns: attendanceLogs.filter((log) => log.isLateCheckIn).length,
      earlyCheckOuts: attendanceLogs.filter((log) => log.isEarlyCheckOut)
        .length,
      absentEmployees,
    };

    res.status(200).json({ success: true, summary });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error generating daily summary." });
  }
};
