import { useEffect, useState } from 'react';
import { enrollmentAPI, getUser } from '../services/api';

const MyEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEnrollments = async () => {
      try {
        setLoading(true);
        setError('');

        const currentUser = getUser();
        if (!currentUser || !currentUser.id) {
          setError('User information not found. Please login again.');
          setLoading(false);
          return;
        }

        // Backend endpoint: GET /enroll/{userId}
        const data = await enrollmentAPI.getByUser(currentUser.id);
        setEnrollments(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'Failed to load your enrollments.');
      } finally {
        setLoading(false);
      }
    };

    loadEnrollments();
  }, []);

  const formatDateTime = (value) => {
    if (!value) return 'N/A';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount) => {
    if (amount == null) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Enrollments</h1>
          <p className="text-gray-600">
            View all workshops you have enrolled in and their payment status.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {enrollments.length === 0 && !error ? (
          <div className="card p-8 text-center">
            <p className="text-gray-600 text-lg">
              You have not enrolled in any workshops yet.
            </p>
          </div>
        ) : null}

        {enrollments.length > 0 && (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Workshop
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enrolled At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {enrollments.map((enrollment) => {
                    const workshop = enrollment.workshop || enrollment.workShop || {};
                    return (
                      <tr key={enrollment.id || enrollment.razorpayOrderId}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {workshop.name || 'Workshop'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {workshop.venue || workshop.description || ''}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(enrollment.amount || workshop.price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              enrollment.paymentStatus === 'SUCCESS' ||
                              enrollment.paymentStatus === 'PAID'
                                ? 'bg-green-100 text-green-800'
                                : enrollment.paymentStatus === 'PENDING'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {enrollment.paymentStatus || 'UNKNOWN'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {enrollment.razorpayOrderId || '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDateTime(enrollment.createdAt || enrollment.enrolledAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEnrollments;

