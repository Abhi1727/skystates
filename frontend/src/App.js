import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Jobs from './components/Jobs';
import DataScienceAI from './components/DataScienceAI';
import CyberSecurity from './components/CyberSecurity';
import DevOps from './components/DevOps';
import DataScienceAIShortTerm from './components/DataScienceAIShortTerm';
import CyberSecurityShortTerm from './components/CyberSecurityShortTerm';
import DevOpsShortTerm from './components/DevOpsShortTerm';
import RefundReturns from './components/RefundReturns';
import Checkout from './components/Checkout';
import LoginRegister from './components/LoginRegister';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/product/data-science-ai-program" element={<DataScienceAI />} />
            <Route path="/product/cyber-security-and-ethical-hacking-program" element={<CyberSecurity />} />
            <Route path="/product/devops-and-cloud-computing-program" element={<DevOps />} />
            <Route path="/product/data-science-ai-short-term-program" element={<DataScienceAIShortTerm />} />
            <Route path="/product/cyber-security-and-ethical-hacking-short-term-program" element={<CyberSecurityShortTerm />} />
            <Route path="/product/devops-and-cloud-computing-short-term-program" element={<DevOpsShortTerm />} />
            <Route path="/refund-returns" element={<RefundReturns />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<LoginRegister />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
