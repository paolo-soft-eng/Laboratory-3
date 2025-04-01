import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ eventId: '', name: '', email: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.eventId || !form.name || !form.email) {
      setMessage('All fields are required');
      return;
    }
    
    axios.post('http://localhost:3000/register', form)
      .then(response => {
        setMessage(response.data);
        setForm({ eventId: '', name: '', email: '' });
        
        axios.get('http://localhost:3000/events')
          .then(response => setEvents(response.data))
          .catch(error => console.error('Error fetching events:', error));
      })
      .catch(error => {
        if (error.response) {
          setMessage(error.response.data || 'Error registering for event');
        } else {
          setMessage('Network error. Please try again.');
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">Campus Events</h1>
        
        {/* Events List */}
        <div className="bg-white shadow rounded-lg mb-8 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {events.length > 0 ? (
              events.map(event => (
                <div key={event.id} className="p-6 hover:bg-gray-50 transition duration-150">
                  <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                  <div className="mt-2 flex flex-col sm:flex-row sm:justify-between">
                    <p className="text-gray-600">
                      <span className="font-medium">Date:</span> {event.date}
                    </p>
                    <p className="text-gray-600 mt-1 sm:mt-0">
                      <span className="font-medium">Organizer:</span> {event.organizer}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">No events available</div>
            )}
          </div>
        </div>
        
        {/* Registration Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Register for an Event</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="eventId" className="block text-sm font-medium text-gray-700">
                Event ID
              </label>
              <input
                type="number"
                name="eventId"
                id="eventId"
                value={form.eventId}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
          
          {message && (
            <div className={`mt-4 p-4 rounded-md ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;