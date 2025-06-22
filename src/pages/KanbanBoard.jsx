import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import TaskForm from '../components/TaskForm';

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}/status`, {
        status: newStatus,
      });
      setTasks((prev) => prev.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      console.error('Status update failed:', err);
      alert('Failed to update task status');
    }
  };

  const addComment = async (taskId, commentText) => {
    const author = 'Student'; // Replace with real user data if available
    try {
      const res = await axios.post(
        `http://localhost:5000/api/tasks/${taskId}/comments`,
        { text: commentText, author }
      );
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? res.data : task))
      );
    } catch (err) {
      console.error('Failed to add comment:', err);
      alert('Error adding comment');
    }
  };

  const renderTasksByStatus = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <div key={task._id} className="bg-white dark:bg-[#1e1e2f] p-4 rounded-xl shadow-lg mb-4 border border-gray-200 dark:border-gray-700">
          <h4 className="font-bold text-lg text-blue-600 dark:text-blue-400">{task.title}</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{task.description}</p>

          <select
            value={task.status}
            onChange={(e) => updateStatus(task._id, e.target.value)}
            className="mt-3 p-1 border rounded w-full text-sm dark:bg-gray-800 dark:text-white"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <div className="mt-4">
            <strong className="block mb-1 text-sm dark:text-gray-300">Comments:</strong>
            <ul className="text-sm list-disc list-inside mb-2 max-h-32 overflow-y-auto dark:text-gray-400">
              {task.comments?.map((c, i) => (
                <li key={i}>
                  <span className="font-semibold">{c.author || 'User'}:</span> {c.text}
                </li>
              ))}
            </ul>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const commentText = e.target.elements.comment.value;
                if (commentText.trim()) {
                  addComment(task._id, commentText);
                  e.target.reset();
                }
              }}
            >
              <input
                name="comment"
                placeholder="Add a comment"
                className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
                required
              />
            </form>
          </div>
        </div>
      ));
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-[#121212] min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Kanban Task Manager</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div>
          <h2 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">To Do</h2>
          {renderTasksByStatus('To Do')}
        </div>
        <div>
          <h2 className="text-xl font-bold mb-3 text-yellow-600 dark:text-yellow-400">In Progress</h2>
          {renderTasksByStatus('In Progress')}
        </div>
        <div>
          <h2 className="text-xl font-bold mb-3 text-green-600 dark:text-green-400">Done</h2>
          {renderTasksByStatus('Done')}
        </div>
      </div>
    </div>
  );
}

export default KanbanBoard;
