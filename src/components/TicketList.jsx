import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tickets');
        setTickets(res.data);
      } catch (err) {
        console.error('Failed to fetch tickets:', err);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id} className="mb-2 p-2 border rounded">
            <strong>{ticket.title}</strong> - {ticket.status}
            <p>{ticket.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
