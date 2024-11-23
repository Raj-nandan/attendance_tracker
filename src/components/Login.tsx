import React, { useState } from 'react';

const Login: React.FC = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Employee ID</label>
                    <input
                        type="text"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;