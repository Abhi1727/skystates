// Test file to check if React Router is working properly
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const TestHome = () => <div><h1>Home Page</h1><p>This is the home page</p></div>;
const TestJobs = () => <div><h1>Jobs Page</h1><p>This is the jobs page</p></div>;

const TestRouter = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | <Link to="/jobs">Jobs</Link>
        </nav>
        <Routes>
          <Route path="/" element={<TestHome />} />
          <Route path="/jobs" element={<TestJobs />} />
        </Routes>
      </div>
    </Router>
  );
};

export default TestRouter;
