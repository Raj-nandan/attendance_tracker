import { useState } from 'react';
import { Clock, Bell } from 'lucide-react';
import TimeTracker from './TimeTracker';
import EmployeeList from './EmployeeList';
import AlertPanel from './AlertPanel';
import Stats from './Stats';
import Profile from './Profile';

export default function Dashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const employeeDetails = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      employeeId: 'EMP123',
      role: 'Software Engineer',
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
          <TimeTracker />
          <Stats />
          <EmployeeList />
          <AlertPanel />
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