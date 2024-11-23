import { Users, Check, Clock, AlertTriangle } from 'lucide-react';

const employees = [
  {
    id: '1',
    name: 'Sarah Wilson',
    role: 'Software Engineer',
    status: 'present',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Product Designer',
    status: 'late',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    role: 'Marketing Manager',
    status: 'absent',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

const statusIcons = {
  present: <Check className="h-5 w-5 text-green-500" />,
  late: <Clock className="h-5 w-5 text-yellow-500" />,
  absent: <AlertTriangle className="h-5 w-5 text-red-500" />
};

export default function EmployeeList() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Team Status</h2>
        <Users className="h-6 w-6 text-indigo-600" />
      </div>

      <div className="space-y-4">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <img
                src={employee.avatar}
                alt={employee.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <h3 className="text-sm font-medium text-gray-900">{employee.name}</h3>
                <p className="text-sm text-gray-500">{employee.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {statusIcons[employee.status as keyof typeof statusIcons]}
              <span className="text-sm capitalize text-gray-700">
                {employee.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}