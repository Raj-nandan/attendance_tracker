import React, { useState } from "react";
import { Clock, Bell } from "lucide-react";
import TimeTracker from "./TimeTracker";
import EmployeeList from "./EmployeeList";
import AlertPanel from "./AlertPanel";
import Stats from "./Stats";
import Profile from "./Profile";

interface EmployeeDetails {
  name: string;
  email: string;
  employeeId: string;
  role: string;
}

interface AttendanceLog {
  type: "Clock-In" | "Clock-Out";
  timestamp: Date;
  success: boolean;
  message: string;
}

export default function Dashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [attendanceLog, setAttendanceLog] = useState<AttendanceLog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const employeeDetails: EmployeeDetails = {
    name: "John Doe",
    email: "john.doe@example.com",
    employeeId: "EMP123",
    role: "Software Engineer",
  };

  // Define office geofence location (latitude, longitude) and radius in meters
  const officeLocation = { lat: 29.8923, lng: 77.9602 }; // Example: San Francisco
  const geofenceRadius = 500; // 100 meters

  // Utility to calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; // Radius of Earth in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  // Handle Clock-In/Clock-Out
  const handleAttendance = (type: "Clock-In" | "Clock-Out") => {
    setLoading(true);

    if (!navigator.geolocation) {
      setAttendanceLog((prevLogs) => [
        ...prevLogs,
        {
          type,
          timestamp: new Date(),
          success: false,
          message: "Geolocation is not supported by your browser.",
        },
      ]);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const distance = calculateDistance(latitude, longitude, officeLocation.lat, officeLocation.lng);

        if (distance <= geofenceRadius) {
          setAttendanceLog((prevLogs) => [
            ...prevLogs,
            {
              type,
              timestamp: new Date(),
              success: true,
              message: `${type} successful within geofence.`,
            },
          ]);
        } else {
          setAttendanceLog((prevLogs) => [
            ...prevLogs,
            {
              type,
              timestamp: new Date(),
              success: false,
              message: `Failed ${type}: Outside geofence (distance: ${distance.toFixed(2)} meters).`,
            },
          ]);
        }

        setLoading(false);
      },
      (error) => {
        setAttendanceLog((prevLogs) => [
          ...prevLogs,
          {
            type,
            timestamp: new Date(),
            success: false,
            message: `Failed ${type}: ${error.message}`,
          },
        ]);
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">TimeSync Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
              <div className="relative">
                <img
                  className="h-8 w-8 rounded-full cursor-pointer"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Admin"
                  onClick={() => setIsProfileOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <button
            onClick={() => handleAttendance("Clock-In")}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Clock In
          </button>
          <button
            onClick={() => handleAttendance("Clock-Out")}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Clock Out
          </button>
          <TimeTracker />
          <Stats />
          <EmployeeList />
          <AlertPanel />
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold">Attendance Logs</h2>
          <ul className="space-y-4">
            {attendanceLog.map((log, index) => (
              <li key={index} className={`p-4 rounded ${log.success ? "bg-green-100" : "bg-red-100"}`}>
                <p className="font-medium">{log.type}</p>
                <p className="text-sm text-gray-700">{log.timestamp.toLocaleString()}</p>
                <p className="text-sm">{log.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isProfileOpen && (
        <Profile
          name={employeeDetails.name}
          email={employeeDetails.email}
          employeeId={employeeDetails.employeeId}
          role={employeeDetails.role}
          onClose={() => setIsProfileOpen(false)}
        />
      )}
    </div>
  );
}
