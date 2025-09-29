import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RegistrationForm from '../components/RegistrationForm';
import { toast } from 'react-toastify';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        toast.error('Failed to fetch event details');
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-2">{new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-700 mb-6">{event.description}</p>
      <RegistrationForm eventId={id} />
    </div>
  );
}

export default EventDetail;