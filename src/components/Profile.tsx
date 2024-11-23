import React from 'react';

interface ProfileProps {
    name: string;
    email: string;
    employeeId: string;
    role: string;
    onClose: () => void;
}

const Profile: React.FC<ProfileProps> = ({ name, email, employeeId, role, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4">Employee Profile</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Employee ID:</strong> {employeeId}</p>
                <p><strong>Role:</strong> {role}</p>
                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Profile;