import React, { useState } from 'react';
import { Clock, LogIn, LogOut } from 'lucide-react';
import { format } from 'date-fns';

export default function TimeTracker() {
  const [clockedIn, setClockedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockAction = () => {
    setClockedIn(!clockedIn);
    // In a real app, this would make an API call to record the time
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Time Tracker</h2>
        <Clock className="h-6 w-6 text-indigo-600" />
      </div>
      
      <div className="text-center mb-8">
        <div className="text-4xl font-bold text-gray-900 mb-2">
          {format(currentTime, 'HH:mm:ss')}
        </div>
        <div className="text-gray-500">
          {format(currentTime, 'EEEE, MMMM do, yyyy')}
        </div>
      </div>

      {/* <button
        onClick={handleClockAction}
        className={`w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${
          clockedIn
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        {clockedIn ? (
          <>
            <LogOut className="h-5 w-5" />
            <span>Clock Out</span>
          </>
        ) : (
          <>
            <LogIn className="h-5 w-5" />
            <span>Clock In</span>
          </>
        )}
      </button> */}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Today's Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Clock In</span>
            <span className="text-gray-900">09:00 AM</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Duration</span>
            <span className="text-gray-900">8h 30m</span>
          </div>
        </div>
      </div>
    </div>
  );
}