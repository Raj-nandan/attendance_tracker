import { Bell, MessageSquare } from 'lucide-react';

const alerts = [
  {
    id: '1',
    type: 'late',
    employee: 'Michael Chen',
    message: 'Arrived 30 minutes late',
    time: '2 hours ago'
  },
  {
    id: '2',
    type: 'absent',
    employee: 'Emma Rodriguez',
    message: 'Absent without notice',
    time: '4 hours ago'
  },
  {
    id: '3',
    type: 'discrepancy',
    employee: 'Sarah Wilson',
    message: 'Missing clock-out time',
    time: '1 day ago'
  }
];

export default function AlertPanel() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recent Alerts</h2>
        <Bell className="h-6 w-6 text-indigo-600" />
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-shrink-0">
              <div className={`p-2 rounded-full ${
                alert.type === 'late' ? 'bg-yellow-100' :
                alert.type === 'absent' ? 'bg-red-100' :
                'bg-orange-100'
              }`}>
                <Bell className={`h-5 w-5 ${
                  alert.type === 'late' ? 'text-yellow-600' :
                  alert.type === 'absent' ? 'text-red-600' :
                  'text-orange-600'
                }`} />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">{alert.employee}</h3>
                <span className="text-xs text-gray-500">{alert.time}</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">{alert.message}</p>
            </div>
            <button className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-500">
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}