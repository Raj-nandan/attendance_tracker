import attendanceModel from "../models/attendanceModel.js";
import UserModel from "../models/UserModel.js";
import { dmsToDecimal } from "../utils/convertDMS.js";
import { sendEmail } from "../utils/email.js";
import { isOutsideBuildingArea } from "../utils/geoUtils.js";

// checkIN controller
export const checkIn = async (req, res) => {
  try {
    const { employeeID } = req.body;

    const checkInTime = new Date();
    const startOfDay = new Date(checkInTime);
    startOfDay.setHours(9, 0, 0, 0); // 9 AM

    // Find the user by employeeID
    const user = await UserModel.findOne({ employeeID });
    if (!user) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    let isLateCheckIn = false;
    if (checkInTime > startOfDay) {
      isLateCheckIn = true;
    }

    const attendance = new attendanceModel({
      employeeID: user.employeeID,
      checkInTime: new Date(),
      isLateCheckIn,
      location: {
        checkInLocation: user.buildingLocation, // use saved building coordinates
      },
    });

    await attendance.save();

    user.status = "checkedIn";
    user.save();

    res.status(200).json({
      message: isLateCheckIn
        ? `Late check-in recorded at ${checkInTime.toLocaleTimeString()}`
        : "Check-in successful",
      attendance,
    });
  } catch (error) {
    res.status(500).json({ message: "Error checking in", error });
  }
};

export const checkOut = async (req, res) => {
  try {
    const { employeeID, currentLocation } = req.body;

    const checkOutTime = new Date();
    const endOfDay = new Date(checkOutTime);
    endOfDay.setHours(17, 0, 0, 0); // 5 PM

    // Ensure currentLocation is provided
    if (
      !currentLocation ||
      !currentLocation.latitude ||
      !currentLocation.longitude
    ) {
      return res.status(400).json({ message: "Current location is required" });
    }

    // find user
    const user = await UserModel.findOne({ employeeID });
    if (!user) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    // get building location from user
    const buildingLocation = user.buildingLocation;

    // convert DMS to decimal
    let currentDecimalLocation = { ...currentLocation };

    if (
      typeof currentLocation.latitude === "string" &&
      typeof currentLocation.longitude === "string"
    ) {
      try {
        currentDecimalLocation.latitude = dmsToDecimal(
          currentLocation.latitude
        );
        currentDecimalLocation.longitude = dmsToDecimal(
          currentLocation.longitude
        );
      } catch (error) {
        return res
          .status(400)
          .json({ message: `Invalid DMS format: ${error.message}` });
      }
    }

    // Check if the employee is outside the building
    const isOutsideBuilding = isOutsideBuildingArea(
      buildingLocation,
      currentDecimalLocation
    );

    if (isOutsideBuilding || checkOutTime < endOfDay) {
      // send email to manager
      const emailContent = `Employee ${employeeID} checked out early or left the building at ${checkOutTime.toLocaleTimeString()}`;

      await sendEmail(
        "cu24280039@coeruniversity.ac.in",
        "Early check-out alert",
        emailContent
      );
      //record check out time
      const attendance = await attendanceModel.findOne({
        employeeID,
        checkOutTime: null,
      });
      if (attendance) {
        attendance.checkOutTime = checkOutTime;
        attendance.location.checkOutLocation = currentDecimalLocation;
        await attendance.save();

        user.status = "checkedOut";
        await user.save();

        res
          .status(200)
          .json({ message: "Checkout successful, Email sent", attendance });
      } else {
        res.status(400).json({ message: "Employee is not checked in" });
      }
    } else {
      res
        .status(400)
        .json({ message: "Employee is still inside the building" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error checking out" });
  }
};

// Route to get all employees' attendance records
export const allAttendance = async (req, res) => {
  try {
    const attendanceRecords = await attendanceModel.find();
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance records." });
  }
};

export const getEmpAttendance = async (req, res) => {
  const { employeeID } = req.params;
  try {
    const attendance = await attendanceModel.find({ employeeID });
    if (!attendance) {
      return res
        .status(404)
        .json({ message: "No attendance found for this employee." });
    }
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee attendance." });
  }
};
