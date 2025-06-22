import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/tasks', {
        title,
        description,
        status,
      });
      onTaskCreated(res.data);
      setTitle('');
      setDescription('');
      setStatus('To Do');
    } catch (err) {
      console.error('Task creation failed', err);
      alert('Failed to create task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2">Create Task</h3>
      
      <input
        type="text"
        placeholder="Title"
        className="border p-2 mb-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      
      <textarea
        placeholder="Description"
        className="border p-2 mb-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      
      <select
        className="border p-2 mb-2 w-full"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
