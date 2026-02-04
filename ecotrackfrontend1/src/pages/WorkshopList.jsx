import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const WorkshopList = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const res = await api.get('/workshops?pageNumber=0&pageSize=100');
        setWorkshops(res.data.content || res.data);
      } catch {
        setError('Failed to load workshops');
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workshop?')) {
      try {
        await api.delete(`/workshops/${id}`);
        setWorkshops(workshops.filter(w => w.id !== id));
        addToast('Workshop deleted successfully!', 'success');
      } catch {
        addToast('Delete failed. Please try again.', 'error');
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
        <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to EcoTrack</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover amazing workshops on sustainability, recycling, and environmental conservation.
            Join our community in making the planet greener!
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
              🌱 Sustainable Living
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
              ♻️ Recycling Workshops
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
              🌍 Environmental Education
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl mb-2">🌱</div>
            <div className="text-2xl font-bold text-green-600 mb-1">50+</div>
            <div className="text-gray-600">Workshops Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-2xl font-bold text-blue-600 mb-1">1000+</div>
            <div className="text-gray-600">Happy Participants</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl mb-2">♻️</div>
            <div className="text-2xl font-bold text-purple-600 mb-1">5 Tons</div>
            <div className="text-gray-600">Waste Recycled</div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Workshops</h1>
          {currentUser?.role === 'ROLE_ADMIN' && (
            <Link to="/workshops/create" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md">
              + Create Workshop
            </Link>
          )}
        </div>
        {workshops.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No workshops available at the moment.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((workshop, index) => (
              <div
                key={workshop.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={workshop.image}
                    alt={workshop.name}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    ${workshop.price}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{workshop.name}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{workshop.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span>⏱️ {workshop.duration}h</span>
                      <span>📅 {new Date(workshop.registrationDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/workshops/${workshop.id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                      View Details
                    </Link>
                    {currentUser?.role === 'ROLE_ADMIN' && (
                      <div className="flex space-x-1">
                        <Link
                          to={`/workshops/edit/${workshop.id}`}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                          title="Edit"
                        >
                          ✏️
                        </Link>
                        <button
                          onClick={() => handleDelete(workshop.id)}
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkshopList;