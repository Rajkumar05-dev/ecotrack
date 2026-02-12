import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Workshops = () => {
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWorkshops();
    }, []);

    const fetchWorkshops = async () => {
        try {
            const response = await api.get('/workshops');
            setWorkshops(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch workshops');
            setLoading(false);
            console.error(err);
        }
    };

    const handleEnroll = async (workshopId) => {
        if (!user) {
            navigate('/login');
            return;
        }
        // Enroll logic will be handled in User Dashboard or specific enroll page
        navigate(`/enroll/${workshopId}`);
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Available Workshops</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workshops.map((workshop) => (
                    <div key={workshop.id} className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-2">{workshop.title}</h2>
                        <p className="text-gray-600 mb-4">{workshop.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-green-600 font-bold">${workshop.price}</span>
                            <button
                                onClick={() => handleEnroll(workshop.id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Enroll
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {workshops.length === 0 && (
                <p className="text-center text-gray-500 mt-4">No workshops available at the moment.</p>
            )}
        </div>
    );
};

export default Workshops;
