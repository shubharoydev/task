import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function RegistrationForm({ eventId }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    phone: '',
    teamName: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await axios.post(`${import.meta.env.VITE_API_URL}/api/registrations`, { 
  ...formData, 
  eventId 
});
      toast.success('Registration successful!');
      setFormData({ name: '', email: '', college: '', phone: '', teamName: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register for Event</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">College/Organization</label>
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Team Name (Optional)</label>
          <input
            type="text"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default RegistrationForm;