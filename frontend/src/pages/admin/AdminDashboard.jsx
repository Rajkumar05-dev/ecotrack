import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Manage Workshops</h2>
                    <p className="text-gray-600 mb-4">Create, update, and delete workshops.</p>
                    <Link to="/admin/workshops" className="text-blue-500 hover:text-blue-700 font-semibold">
                        Go to Workshops &rarr;
                    </Link>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">View Payments</h2>
                    <p className="text-gray-600 mb-4">Check payment statuses and history.</p>
                    <Link to="/admin/payments" className="text-blue-500 hover:text-blue-700 font-semibold">
                        Go to Payments &rarr;
                    </Link>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Recycling Data</h2>
                    <p className="text-gray-600 mb-4">Manage recycling information.</p>
                    <Link to="/admin/recycle" className="text-blue-500 hover:text-blue-700 font-semibold">
                        Go to Recycling &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
