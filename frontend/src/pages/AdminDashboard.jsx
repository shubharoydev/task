import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import EventForm from '../components/EventForm';

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
    fetchRegistrations();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Fetch events error:', error);
      toast.error('Failed to fetch events');
    }
  };

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/registrations`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRegistrations(response.data);
    } catch (error) {
      console.error('Fetch registrations error:', error);
      toast.error('Failed to fetch registrations');
    }
  };

  const handleCreateOrUpdateEvent = async (formData) => {
    const url = editingEvent
      ? `${import.meta.env.VITE_API_URL}/api/events/${editingEvent._id}`
      : `${import.meta.env.VITE_API_URL}/api/events`;
    const method = editingEvent ? 'put' : 'post';
    console.log('Sending request:', { url, method, formData, token: localStorage.getItem('token') });
    try {
      await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEditingEvent(null); // Only reset after successful submission
      fetchEvents();
    } catch (error) {
      console.error('Save event error:', error);
      toast.error(error.response?.data?.message || 'Failed to save event');
      throw error; // Rethrow to let EventForm handle the error
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Event deleted successfully!');
      fetchEvents();
    } catch (error) {
      console.error('Delete event error:', error);
      toast.error('Failed to delete event');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <EventForm onSubmit={handleCreateOrUpdateEvent} initialData={editingEvent || {}} />
      <h2 className="text-2xl font-bold mt-8 mb-4">Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <p>{event.description.substring(0, 100)}...</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => {
                  console.log('Edit button clicked for event:', event);
                  setEditingEvent(event);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteEvent(event._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Registrations</h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Event</th>
              <th className="text-left p-2">Team</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg._id}>
                <td className="p-2">{reg.user?.name}</td>
                <td className="p-2">{reg.user?.email}</td>
                <td className="p-2">{reg.event?.title}</td>
                <td className="p-2">{reg.team?.name || 'None'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;