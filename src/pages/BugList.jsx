import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BugList() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('No token found');
          return;
        }

        const res = await axios.get('http://localhost:5000/api/bugs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBugs(res.data);
      } catch (err) {
        console.error('Error fetching bugs:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Reported Bugs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : bugs.length === 0 ? (
        <p>No bugs reported yet.</p>
      ) : (
        <ul className="space-y-3">
          {bugs.map((bug) => (
            <li key={bug._id} className="p-4 border rounded shadow">
              <h3 className="font-bold text-lg">{bug.title}</h3>
              <p>{bug.description}</p>
              <p className="text-sm text-gray-600">Status: {bug.status}</p>
              <p className="text-sm text-gray-500">
                Created by: {bug.createdBy?.username || 'Unknown'} ({bug.createdBy?.role || 'N/A'})
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BugList;
