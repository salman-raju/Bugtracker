import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ReportBug from './pages/ReportBug';
import KanbanBoard from './pages/KanbanBoard';
import BugList from './pages/BugList';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/report-bug" element={<ReportBug />} />
          <Route path="/kanban" element={<KanbanBoard />} />
          <Route path="/bugs" element={<BugList />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
