import { useState, useEffect } from 'react';
import api from '../services/api';
import { useToast } from '../contexts/ToastContext';

const RecycleRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get('/requests'); // Assuming this endpoint exists
        setRequests(res.data);
      } catch {
        setError('Failed to load recycle requests');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.put(`/request/approve/${id}`);
      setRequests(requests.map(r => r.id === id ? { ...r, status: 'approved' } : r));
      addToast('Request approved successfully!', 'success');
    } catch {
      addToast('Approve failed. Please try again.', 'error');
    }
  };

  const handleReject = async (id) => {
    const reason = prompt('Reason for rejection');
    if (reason) {
      try {
        await api.put(`/request/reject/${id}?reason=${encodeURIComponent(reason)}`);
        setRequests(requests.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
        addToast('Request rejected successfully!', 'warning');
      } catch {
        addToast('Reject failed. Please try again.', 'error');
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Recycle Requests Management</h1>
        
        {requests.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No recycle requests at the moment.</div>
          </div>
        ) : (
          <div className="space-y-6">
            {requests.map(request => (
              <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-semibold text-gray-900 mr-3">Item: {request.itemType}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">Quantity: <span className="font-medium">{request.quantity}</span></p>
                    <p className="text-gray-600">Reason: {request.reason}</p>
                  </div>
                </div>
                
                {request.status === 'pending' && (
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md"
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md"
                    >
                      ❌ Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecycleRequests;