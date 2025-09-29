import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function EventForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : '',
    description: initialData.description || '',
  });

  // Sync formData with initialData when it changes
  useEffect(() => {
    console.log('EventForm received initialData:', initialData);
    setFormData({
      title: initialData.title || '',
      date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : '',
      description: initialData.description || '',
    });
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      toast.success('Event saved successfully!');
      // Reset form only after successful submission
      setFormData({
        title: '',
        date: '',
        description: '',
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(error.response?.data?.message || 'Failed to save event');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{initialData._id ? 'Edit Event' : 'Create Event'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default EventForm;