import React, { useState } from 'react';
import axios from 'axios';

export default function ReportBug() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/bugs',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Bug reported successfully!');
      setTitle('');
      setDescription('');
    } catch (error) {
      alert('Failed to report bug.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-950 border border-cyan-500 p-8 rounded-lg shadow-xl w-full max-w-xl"
      >
        <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
          Report a Bug
        </h2>

        <input
          type="text"
          placeholder="Bug Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-800 border border-cyan-600 rounded-md text-white"
          required
        />

        <textarea
          placeholder="Bug Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 mb-6 h-40 bg-gray-800 border border-cyan-600 rounded-md text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-400 text-black font-bold py-3 rounded-md transition duration-300"
        >
          Submit Bug
        </button>
      </form>
    </div>
  );
}
