import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { Loader2, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/web/my`;

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('userToken');
        if (!token) throw new Error('No authentication token found');

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await api.get(`${API_URL}?email=${user.email}`);
        // Filter only confirmed bookings
        const confirmedBookings = response.data.filter(booking => booking.status === 'confirmed');
        setBookings(confirmedBookings);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">My Bookings</h1>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded text-center">
          {error}
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center text-gray-600 py-10">
          <h2 className="text-xl font-semibold mb-2">No Bookings Found</h2>
          <p>You haven't made any bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* ✅ Mobile Card View */}
          <div className="block sm:hidden space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-xl border border-gray-200 shadow p-5 bg-white space-y-3"
              >
                <div className="text-sm text-gray-500">Booking #{booking.id}</div>
                <div className="text-lg font-semibold">{booking.full_name}</div>
                <div className="text-sm">📞 {booking.contact_number}</div>
                <div className="text-sm">📍 {booking.from_location} → {booking.to_location}</div>
                <div className="text-sm">🗓 {booking.start_date} - {booking.end_date}</div>
                <div className="text-sm text-orange-600 font-medium">
                  ₹{Number(booking.amount).toLocaleString('en-IN')}
                </div>
                <button
                  onClick={() => {
                    setSelectedBooking(booking);
                    setIsModalOpen(true);
                  }}
                  className="text-sm text-orange-600 font-medium flex items-center"
                >
                  <Users className="w-4 h-4 mr-1" />
                  View More
                </button>
              </div>
            ))}
          </div>

          {/* ✅ Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto rounded-lg shadow ring-1 ring-gray-200">
            <table className="min-w-full text-sm text-left text-gray-800">
              <thead className="bg-gray-50 border-b border-gray-200 text-sm uppercase font-medium tracking-wide">
                <tr>
                  <th className="px-6 py-4">Booking ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">From</th>
                  <th className="px-6 py-4">To</th>
                  <th className="px-6 py-4">Dates</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-orange-50 transition-all border-b">
                    <td className="px-6 py-4 font-medium">#{booking.id}</td>
                    <td className="px-6 py-4">{booking.full_name}</td>
                    <td className="px-6 py-4">{booking.contact_number}</td>
                    <td className="px-6 py-4">{booking.from_location}</td>
                    <td className="px-6 py-4">{booking.to_location}</td>
                    <td className="px-6 py-4">
                      {booking.start_date} - {booking.end_date}
                    </td>
                    <td className="px-6 py-4 text-orange-600 font-semibold">
                      ₹{Number(booking.amount).toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setIsModalOpen(true);
                        }}
                        className="flex items-center text-orange-600 hover:text-orange-700 font-medium"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        View More
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 🧾 Modal (unchanged) */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
                <div>
                  <p className="font-semibold">Booking ID</p>
                  <p>#{selectedBooking.id}</p>
                </div>
                <div>
                  <p className="font-semibold">Name</p>
                  <p>{selectedBooking.full_name}</p>
                </div>
                <div>
                  <p className="font-semibold">Contact</p>
                  <p>{selectedBooking.contact_number}</p>
                </div>
                <div>
                  <p className="font-semibold">From → To</p>
                  <p>{selectedBooking.from_location} → {selectedBooking.to_location}</p>
                </div>
                <div>
                  <p className="font-semibold">Dates</p>
                  <p>{selectedBooking.start_date} - {selectedBooking.end_date}</p>
                </div>
                <div>
                  <p className="font-semibold">Amount</p>
                  <p className="text-orange-600 font-semibold">
                    ₹{Number(selectedBooking.amount).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Travelers</h3>
                {selectedBooking.travelers?.length > 0 ? (
                  <div className="space-y-2">
                    {selectedBooking.travelers.map((traveler, idx) => (
                      <div
                        key={idx}
                        className="border p-3 rounded-lg text-sm flex flex-col sm:flex-row sm:justify-between"
                      >
                        <span>👤 {traveler.name || 'N/A'}</span>
                        <span>Age: {traveler.age || '-'}</span>
                        <span>Gender: {traveler.gender || '-'}</span>
                        <span>Relation: {traveler.relationship || '-'}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No traveler details available</p>
                )}
              </div>

              <div className="mt-6 text-center text-gray-500 text-sm">
                <p>📸 Take a screenshot — your travel memories, saved like postcards!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
