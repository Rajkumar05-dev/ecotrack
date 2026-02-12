import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
// import api from '../../services/api'; // user api for enrollments

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simulation of fetching enrollments
    useEffect(() => {
        // async function fetchEnrollments() {
        //   try {
        //     const res = await api.get('/user/enrollments');
        //     setEnrollments(res.data);
        //   } catch (err) {
        //     console.error(err);
        //   } finally {
        //     setLoading(false);
        //   }
        // }
        // fetchEnrollments();

        // Using dummy data for now as backend endpoint might vary
        setTimeout(() => {
            setEnrollments([
                { id: 1, workshop: { title: 'Composting 101' }, status: 'ENROLLED', paymentStatus: 'PAID' },
                { id: 2, workshop: { title: 'Urban Gardening' }, status: 'PENDING', paymentStatus: 'PENDING' }
            ]);
            setLoading(false);
        }, 500);
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome, {user?.sub || user?.username}!</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Your Enrollments</h2>
                {loading ? (
                    <p>Loading enrollments...</p>
                ) : enrollments.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Workshop
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Payment
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollments.map((enrollment) => (
                                    <tr key={enrollment.id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{enrollment.workshop.title}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${enrollment.status === 'ENROLLED' ? 'text-green-900' : 'text-orange-900'}`}>
                                                <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${enrollment.status === 'ENROLLED' ? 'bg-green-200' : 'bg-orange-200'}`}></span>
                                                <span className="relative">{enrollment.status}</span>
                                            </span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{enrollment.paymentStatus}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {enrollment.paymentStatus === 'PENDING' && (
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs">
                                                    Pay Now
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>You have not enrolled in any workshops yet.</p>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
