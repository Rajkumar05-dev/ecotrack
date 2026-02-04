import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const WorkshopDetails = () => {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const res = await api.get(`/workshops/${id}`);
        setWorkshop(res.data);
      } catch {
        setError('Failed to load workshop details');
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshop();
  }, [id]);

  const handleEnroll = async () => {
    try {
      const res = await api.post(`/enroll/${currentUser.id}/enroll/${id}`);
      // Assuming res.data contains Razorpay order details
      const options = {
        key: res.data.key || 'your_razorpay_key', // Replace with actual key
        amount: res.data.amount,
        currency: res.data.currency || 'INR',
        order_id: res.data.orderId,
        name: workshop.name,
        description: workshop.description,
        handler: async (response) => {
          try {
            await api.post('/enroll/confirm', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            addToast('Enrollment successful! 🎉 Welcome to the workshop!', 'success');
          } catch {
            addToast('Payment confirmation failed. Please contact support.', 'error');
          }
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      addToast('Enrollment failed. Please try again.', 'error');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this workshop?')) {
      try {
        await api.delete(`/workshops/${id}`);
        addToast('Workshop deleted successfully!', 'success');
        navigate('/');
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

  if (!workshop) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-500 text-lg">Workshop not found</div>
        <Link to="/" className="text-blue-600 hover:text-blue-500 mt-4 inline-block">← Back to Workshops</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/" className="text-blue-600 hover:text-blue-500 mb-6 inline-block">← Back to Workshops</Link>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img src={workshop.image} alt={workshop.name} className="w-full h-64 md:h-80 object-cover" />
          
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{workshop.name}</h1>
                <p className="text-gray-600 text-lg leading-relaxed">{workshop.description}</p>
              </div>
              <div className="mt-4 md:mt-0 md:ml-8 bg-gray-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">${workshop.price}</div>
                <div className="text-sm text-gray-500 space-y-1">
                  <div>📅 {workshop.registrationDate}</div>
                  <div>🕒 {workshop.time}</div>
                  <div>⏱️ {workshop.duration} hours</div>
                  <div>📍 {workshop.venue}</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {currentUser?.role === 'ROLE_USER' && (
                <button onClick={handleEnroll} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-md">
                  🎟️ Enroll & Pay
                </button>
              )}
              {currentUser?.role === 'ROLE_ADMIN' && (
                <div className="flex gap-4">
                  <Link to={`/workshops/edit/${id}`} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-md text-center">
                    ✏️ Edit Workshop
                  </Link>
                  <button onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-md">
                    🗑️ Delete Workshop
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopDetails;