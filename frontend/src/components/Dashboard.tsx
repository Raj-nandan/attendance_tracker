import { useEffect, useState } from "react";
import { Clock, Bell } from "lucide-react";
import TimeTracker from "./TimeTracker";
import AlertPanel from "./AlertPanel";
import Stats from "./Stats";
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
  status: "string";
}

export default function Dashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const [employ, setEmploy] = useState<Employee[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  // Fetch employee details
  const fetchEmp = async () => {
    const userID = localStorage.getItem("id");
    if (!userID) {
      setError("User ID not found in local storage.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/employee/${userID}`
      );
      setEmploy(response.data);
      setMessage(`Welcome, ${response.data.name}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching employee data.");
    }
  };

  // Fetch all employee
  const fetchAllEmp = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/employee/`);
      setEmployees(response.data);
      setMessage(`Welcome, ${response.data.name}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching employee data.");
    }
  };

  useEffect(() => {
    fetchAllEmp();
    fetchEmp();
  }, []);

  //test

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                TimeSync Pro
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
              <div className="relative">
                <span
                  className="h-8 w-8 rounded-full cursor-pointer"
                  onClick={() => {
                    navigate("/");
                    localStorage.removeItem("id");
                    localStorage.removeItem("token");
                  }}
                >
                  Checkout
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TimeTracker />
          <Stats />
          {/* <EmployeeList /> */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Team Status</h2>
              {/* <Users className="h-6 w-6 text-indigo-600" /> */}
            </div>

            <div className="space-y-4">
              {employees.map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt={employee.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {employee.name}
                      </h3>
                      <p className="text-sm text-gray-500">{employee.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm capitalize text-gray-700">
                      {employee.role === "manager" ? "" : employee.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <AlertPanel />
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold">Attendance Logs</h2>
          {/* <ul className="space-y-4">
            {attendanceLog.map((log, index) => (
              <li
                key={index}
                className={`p-4 rounded ${
                  log.success ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <p className="font-medium">{log.type}</p>
                <p className="text-sm text-gray-700">
                  {log.timestamp.toLocaleString()}
                </p>
                <p className="text-sm">{log.message}</p>
              </li>
            ))}
          </ul> */}
        </div>
      </div>

      {/* {isProfileOpen && (
        <Profile
          name={employeeDetails.name}
          email={employeeDetails.email}
          employeeId={employeeDetails.employeeId}
          role={employeeDetails.role}
          onClose={() => setIsProfileOpen(false)}
        />
      )} */}
    </div>
  );
}
