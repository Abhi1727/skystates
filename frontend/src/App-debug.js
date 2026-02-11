import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Simple test components
const HomePage = () => (
  <div style={{ padding: '20px' }}>
    <h1>Home Page</h1>
    <p>This is the home page content</p>
    <Link to="/jobs" style={{ color: '#007bff', textDecoration: 'none' }}>
      Go to Jobs →
    </Link>
  </div>
);

const JobsPage = () => (
  <div style={{ padding: '20px' }}>
    <h1>Jobs Page</h1>
    <p>This is the jobs page content</p>
    <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>
      ← Go to Home
    </Link>
  </div>
);

// Simple header that stays mounted
const SimpleHeader = () => (
  <header style={{ background: '#000', color: 'white', padding: '10px 0' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
      <h1 style={{ margin: 0 }}>
        <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>
          Sky States
        </Link>
      </h1>
      <nav>
        <Link to="/" style={{ color: 'white', marginRight: '20px' }}>Home</Link>
        <Link to="/jobs" style={{ color: 'white' }}>Jobs</Link>
      </nav>
    </div>
  </header>
);

function App() {
  console.log('App component rendering');
  
  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <SimpleHeader />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
          </Routes>
        </main>
        <footer style={{ background: '#333', color: 'white', padding: '20px', textAlign: 'center' }}>
          <p>&copy; 2024 Sky States</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
