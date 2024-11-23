import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employeeID: {
      type: String,
      required: true,
    },
    checkInTime: {
      type: Date,
      required: true,
    },
    checkOutTime: {
      type: Date,
    },
    isLateCheckIn: {
      type: Boolean,
      default: false,
    },
    location: {
      checkInLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
      },
      checkOutLocation: {
        latitude: Number,
        longitude: Number,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
