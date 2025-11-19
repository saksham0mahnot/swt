import { useEffect, useState } from 'react';
import {
  User, Mail, Phone, MapPin, Calendar, Clock, Settings,
  AlertCircle, RefreshCw, IndianRupee
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useLocation } from 'react-router-dom';

export default function MyProfile() {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);


  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.post('/api/web/user/');
        const data = response.data;
        if (data.status && data.data) {
          setUserData(data.data);
        } else {
          throw new Error('Invalid response format from server');
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load profile data');
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const StatCard = ({ label, value, icon: Icon }) => (
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-sm rounded-lg p-4 transition hover:shadow-md">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">{label}</p>
        {Icon && <Icon size={18} className="text-blue-600" />}
      </div>
      <h4 className="text-2xl font-bold">{value}</h4>
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <RefreshCw className="animate-spin text-blue-600 h-6 w-6" />
        <p className="text-gray-500 mt-3">Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <AlertCircle className="text-red-500 h-10 w-10" />
        <p className="text-red-600 font-semibold mt-2">Error loading profile</p>
        <p className="text-gray-500 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <RefreshCw size={16} /> Try Again
        </button>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <AlertCircle className="text-red-500 h-10 w-10" />
        <p className="text-red-600 font-semibold mt-2">No Profile Data</p>
        <p className="text-gray-500 text-sm">Please log in to view your profile.</p>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <RefreshCw size={16} /> Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-3xl font-extrabold">My Profile</h2>
        <button
          onClick={() => navigate('/edit-profile')}
          className="flex items-center gap-2 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-300 px-4 py-2 rounded transition"
        >
          <Settings size={16} /> Edit Profile
        </button>
      </div>

      {/* Profile Card */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white shadow rounded-lg p-6">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
          {getInitials(userData.name)}
        </div>
        <div className="space-y-2 w-full">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <User size={20} /> {userData.name}
          </h3>
          <p className="text-gray-600 flex items-center gap-2"><Mail size={16} /> {userData.email}</p>
          <p className="text-gray-600 flex items-center gap-2"><Phone size={16} /> {userData.phone_number}</p>
          {userData.city && (
            <p className="text-gray-600 flex items-center gap-2"><MapPin size={16} /> {userData.city}</p>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-gray-800">My Stats</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total Bookings" value={userData.total_bookings || 0} icon={Clock} />
          <StatCard label="Amount Spent" value={`${userData.total_amount || 0}`} icon={IndianRupee} />
          <StatCard label="Upcoming Trips" value={userData.upcoming_trips || 0} icon={Calendar} />
        </div>
      </div>

      {/* Recent Bookings */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Recent Bookings</h3>
        <div className="bg-white shadow rounded-lg p-5">
          <p className="text-gray-600 mb-4">Check your recent bookings and upcoming trips.</p>
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition"
            onClick={() => navigate('/my-bookings')}
          >
            <Clock size={16} /> View All Bookings
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate('/genZtrip')}
            className="flex items-center gap-2 bg-white hover:bg-gray-100 border border-gray-300 px-5 py-2 rounded-md shadow-sm transition"
          >
            <MapPin size={16} /> Book a Trip
          </button>
          <button
            onClick={() => navigate('/genZtrip')}
            className="flex items-center gap-2 bg-white hover:bg-gray-100 border border-gray-300 px-5 py-2 rounded-md shadow-sm transition"
          >
            <Calendar size={16} /> Upcoming Trips
          </button>
        </div>
      </div>
    </div>
  );
}
