import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const AdminWorkshops = () => {
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWorkshops();
    }, []);

    const fetchWorkshops = async () => {
        try {
            const response = await api.get('/workshops');
            setWorkshops(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch workshops", err);
            // Mock data if backend fails
            setWorkshops([
                { id: 1, title: 'Composting 101', price: 20 },
                { id: 2, title: 'Urban Gardening', price: 30 }
            ]);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this workshop?')) {
            try {
                await api.delete(`/admin/workshops/${id}`);
                setWorkshops(workshops.filter(w => w.id !== id));
            } catch (err) {
                console.error("Failed to delete workshop", err);
                alert('Failed to delete workshop');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Workshops</h1>
                <Link to="/admin/workshops/create" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Create New Workshop
                </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {workshops.map((workshop) => (
                            <tr key={workshop.id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{workshop.title}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">${workshop.price}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <Link to={`/admin/workshops/edit/${workshop.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(workshop.id)} className="text-red-600 hover:text-red-900">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminWorkshops;
