import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the Employee type
interface Employee {
  id: string;
  name: string;
  email: string;
  employeeID: string;
  role: "employee" | "manager";
  buildingLocation: {
    latitude: string;
    longitude: string;
  };
}

const Emp: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);

  const navigate = useNavigate();
  // Fetch employee details
  const fetchEmp = async () => {
    const userID = localStorage.getItem("id"); // Assuming ID is stored in localStorage
    if (!userID) {
      setError("User ID not found in local storage.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/employee/${userID}`
      );
      setEmployee(response.data);
      setMessage(`Welcome, ${response.data.name}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching employee data.");
    }
  };

  useEffect(() => {
    fetchEmp();
  }, []);

  const handleCheckIn = async () => {
    setMessage(null);
    setError(null);

    try {
      const employeeID = employee.employeeID;
      if (!employeeID) {
        setError("User ID not found.");
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/api/attendance/checkin`,
        {
          employeeID,
        }
      );
      setMessage(response.data.message || "Checked in successfully!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error during check-in.");
    }
  };

  const handleCheckOut = async () => {
    setMessage(null);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Location : ", position.coords);

        try {
          const employeeID = employee.employeeID;
          if (!employeeID) {
            setError("User ID not found.");
            return;
          }

          const response = await axios.post(
            `http://localhost:5000/api/attendance/checkout`,
            {
              employeeID: employeeID,
              currentLocation: { latitude, longitude },
            }
          );
          setMessage(response.data.message || "Checked out successfully!");
          localStorage.removeItem("id");
          localStorage.removeItem("token");
          navigate("/login");
        } catch (err: any) {
          setError(err.response?.data?.message || "Error during check-out.");
        }
      },
      (err: any) => {
        setError("Failed to fetch location. Please enable location services.");
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Employee Page</h2>
      {employee && <p className="text-gray-700 mb-4">Hello, {employee.name}</p>}
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-x-4">
        <button
          onClick={handleCheckIn}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Check-In
        </button>
        <button
          onClick={handleCheckOut}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Check-Out
        </button>
      </div>
    </div>
  );
};

export default Emp;
