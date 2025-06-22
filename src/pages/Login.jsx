import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Save token and user info
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user)); // Ensure backend sends user info

      alert('Login successful');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-950 border border-cyan-500 p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
          Login to BugTracker
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-800 border border-cyan-600 rounded-md text-white"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 bg-gray-800 border border-cyan-600 rounded-md text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-400 text-black font-bold py-3 rounded-md transition duration-300"
        >
          Login
        </button>

        <p className="text-center text-sm mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-cyan-300 hover:underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}
