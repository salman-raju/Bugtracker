import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="home-container">
      <motion.div
        className="home-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {user ? (
          <>
            <h1>
              <Typewriter
                words={[`Welcome back, ${user.username}!`, 'Ready to squash some bugs? 🐞']}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </h1>
            <p>Access your bug reports and manage issues efficiently.</p>
          </>
        ) : (
          <>
            <h1>Welcome to BugTracker!</h1>
            <p>Your futuristic bug management system 🚀</p>
          </>
        )}

        <div className="home-buttons">
          {!user && (
            <>
              <Link to="/login" className="home-btn login-btn">Login</Link>
              <Link to="/register" className="home-btn register-btn">Register</Link>
            </>
          )}
          <Link to="/report-bug" className="home-btn report-btn">Report a Bug</Link>
          <Link to="/kanban" className="home-btn kanban-btn">Kanban Board</Link>
          <Link to="/bugs" className="home-btn view-btn">View Bugs</Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
