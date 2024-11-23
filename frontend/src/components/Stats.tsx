import { Users, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      id: 1,
      name: 'Present Today',
      value: '45',
      change: '+2.5%',
      icon: <Users className="h-6 w-6 text-green-600" />
    },
    {
      id: 2,
      name: 'Late Arrivals',
      value: '3',
      change: '-1.1%',
      icon: <Clock className="h-6 w-6 text-yellow-600" />
    },
    {
      id: 3,
      name: 'Absent',
      value: '2',
      change: '+0.5%',
      icon: <AlertTriangle className="h-6 w-6 text-red-600" />
    },
    {
      id: 4,
      name: 'On Time',
      value: '95%',
      change: '+4.75%',
      icon: <CheckCircle className="h-6 w-6 text-indigo-600" />
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center justify-between">
              {stat.icon}
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-500">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}