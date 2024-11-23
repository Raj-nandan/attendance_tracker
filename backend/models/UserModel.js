import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    employeeID: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    buildingLocation: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    role: {
      type: String,
      enum: ["employee", "manager"],
      default: "employee",
    },
    status: {
      type: String,
      enum: ["checkedIn", "checkedOut"],
      default: "checkedOut",
    }, // Default: checkedOut
  },
  { timestamps: true }
);

export default mongoose.model("UserModel", userModel);
