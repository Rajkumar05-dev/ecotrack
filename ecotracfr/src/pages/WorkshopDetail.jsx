import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { workshopAPI, enrollmentAPI, getUser } from '../services/api';
import { initiateRazorpayPayment } from '../utils/razorpay';
import { useAuth } from '../context/AuthContext';

const WorkshopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchWorkshop();
  }, [id]);

  const fetchWorkshop = async () => {
    try {
      setLoading(true);
      const data = await workshopAPI.getById(id);
      setWorkshop(data);
      setError('');
    } catch (err) {
      // Handle authentication errors - clear auth but don't redirect (ProtectedRoute will handle it)
      if (err.isAuthError) {
        // Clear invalid token - ProtectedRoute will redirect if needed
        logout();
        setError('Your session has expired. Please refresh the page and login again.');
        return;
      }
      setError(err.message || 'Failed to load workshop details');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const user = getUser();
    if (!user || !user.id) {
      setError('User information not found. Please login again.');
      return;
    }

    try {
      setEnrolling(true);
      setError('');

      const enrollmentData = await enrollmentAPI.enroll(user.id, id);

      if (enrollmentData.razorpayOrderId && enrollmentData.amount) {
        initiateRazorpayPayment(
          enrollmentData.razorpayOrderId,
          enrollmentData.amount,
          () => {
            // On success, refresh the page or navigate
            setTimeout(() => {
              navigate('/workshops');
            }, 2000);
          }
        );
      } else {
        setError('Failed to initialize payment. Please try again.');
      }
    } catch (err) {
      // Handle authentication errors - clear auth but don't redirect (ProtectedRoute will handle it)
      if (err.isAuthError) {
        // Clear invalid token - ProtectedRoute will redirect if needed
        logout();
        setError('Your session has expired. Please refresh the page and login again.');
        return;
      }
      setError(err.message || 'Failed to enroll. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    return timeString;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error && !workshop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => navigate('/workshops')}
            className="btn-primary"
          >
            Back to Workshops
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/workshops')}
          className="mb-6 text-primary-600 hover:text-primary-700 font-medium flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Workshops
        </button>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {workshop && (
          <div className="card overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full bg-gradient-to-br from-primary-400 to-primary-600">
                  {workshop.image ? (
                    <img
                      src={workshop.image}
                      alt={workshop.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-32 h-32 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{workshop.name}</h1>
                <p className="text-gray-600 mb-6 leading-relaxed">{workshop.description}</p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-700">Registration Date</p>
                      <p className="text-gray-600">{formatDate(workshop.registrationDate)}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-700">Time</p>
                      <p className="text-gray-600">{formatTime(workshop.time)}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-700">Duration</p>
                      <p className="text-gray-600">{workshop.duration || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-700">Venue</p>
                      <p className="text-gray-600">{workshop.venue || 'TBA'}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-bold text-primary-600">
                      ₹{workshop.price || 0}
                    </span>
                  </div>
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed text-lg py-3"
                  >
                    {enrolling ? 'Processing...' : 'Enroll Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkshopDetail;
