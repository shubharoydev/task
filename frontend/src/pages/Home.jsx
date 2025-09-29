import { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import { toast } from 'react-toastify';

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
        setEvents(response.data);
      } catch (error) {
        toast.error('Failed to fetch events');
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Upcoming Hackathons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Home;