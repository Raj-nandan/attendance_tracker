import bcrypt from "bcrypt";
import { sendEmail } from "../utils/email.js";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { dmsToDecimal } from "../utils/convertDMS.js";

// generate emp ID
const generateEmployeeID = () => {
  return `EMP ${Math.floor(10000 + Math.random() * 90000)}`;
};

// registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, buildingLocation, role } = req.body;

    // Validate building location
    if (
      !buildingLocation ||
      !buildingLocation.latitude ||
      !buildingLocation.longitude
    ) {
      return res.status(400).json({ message: "Building location is required" });
    }

    // Convert DMS to DD if necessary
    const latitude = isNaN(buildingLocation.latitude)
      ? dmsToDecimal(buildingLocation.latitude)
      : parseFloat(buildingLocation.latitude);

    const longitude = isNaN(buildingLocation.longitude)
      ? dmsToDecimal(buildingLocation.longitude)
      : parseFloat(buildingLocation.longitude);

    // check if exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create user
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      role,
      employeeID: generateEmployeeID(),
      buildingLocation: { latitude, longitude },
    });
    // save user
    await user.save();
    // send email
    const subject = "Welcome to our company";
    const text = `Hi ${name}, Your EmployeeID is ${user.employeeID}`;
    await sendEmail(email, subject, text);
    res.status(201).json({
      message: "User created successfully and EmployeeID enabled",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// login
export const loginUser = async (req, res) => {
  try {
    const { employeeID, password } = req.body;

    const user = await UserModel.findOne({ employeeID });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid EmployeeID or password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ message: "Invalid EmployeeID or password" });
    }

    // generate JWT
    const token = jwt.sign(
      { employeeID: user.employeeID, role: user.role },
      process.env.SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
