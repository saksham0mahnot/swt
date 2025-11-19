import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import {
  User,
  Mail,
  Phone,
  LoaderCircle,
  PencilLine,
  AlertCircle,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function EditProfile() {
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
      
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await api.post('/api/web/user/');
      const data = response.data;

      if (data.status && data.data) {
        setFormData({
          name: data.data.name || '',
          email: data.data.email || '',
          phone_number: data.data.phone_number || '',
        });
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error.response?.data?.message || 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.put('/api/web/user', formData);

      if (response.data.status) {
        navigate('/profile');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-orange-50 to-yellow-100">
        <LoaderCircle className="animate-spin h-10 w-10 text-[#ff6700]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="bg-white border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md flex items-center space-x-3">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-50 to-yellow-100 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl p-8">
        <div className="flex items-center justify-center mb-6 text-[#ff6700]">
          <PencilLine className="w-6 h-6 mr-2" />
          <h2 className="text-2xl font-bold">Edit Profile</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#ff6700]">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent focus:outline-none text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#ff6700]">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent focus:outline-none text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#ff6700]">
              <Phone className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                className="w-full bg-transparent focus:outline-none text-gray-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff6700] hover:bg-orange-700 text-white py-2 rounded-lg font-medium transition duration-200 ease-in-out shadow-sm"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
