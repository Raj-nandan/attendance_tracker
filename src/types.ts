export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
}

export interface TimeRecord {
  id: string;
  employeeId: string;
  date: string;
  inTime: string;
  outTime: string | null;
  status: 'present' | 'late' | 'absent' | 'pending';
}

export interface Alert {
  id: string;
  type: 'late' | 'absent' | 'discrepancy';
  employeeId: string;
  message: string;
  timestamp: string;
  read: boolean;
}