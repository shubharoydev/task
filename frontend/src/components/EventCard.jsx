import { Link } from 'react-router-dom';

function EventCard({ event }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
      <p className="text-gray-600 mb-2">{new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-700 mb-4">{event.description.substring(0, 100)}...</p>
      <Link to={`/event/${event._id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Apply
      </Link>
    </div>
  );
}

export default EventCard;