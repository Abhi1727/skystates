import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { DirectCheckoutProvider } from './contexts/DirectCheckoutContext';
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
import About from './components/About';
import RefundReturns from './components/RefundReturns';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import Checkout from './components/checkout/Checkout';
import LoginRegister from './components/LoginRegister';
import AdminDashboard from './components/admin/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';
import useLenis from './hooks/useLenis';
import './App.css';

function App() {
  const { scrollRef, isLoaded } = useLenis(true); // Enabled with Lenis for performance

  return (
    <DirectCheckoutProvider>
      <Router>
        <AppContent scrollRef={scrollRef} isLoaded={isLoaded} />
      </Router>
    </DirectCheckoutProvider>
  );
}

function AppContent({ scrollRef, isLoaded }) {
  const location = useLocation();
  
  // Hide header on admin routes
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className={`App ${isLoaded ? 'is-loaded lenis-ready' : ''}`} data-scroll-container ref={scrollRef}>
      <ScrollToTop />
      {!isAdminRoute && <Header />}
      <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/product/data-science-ai-program" element={<DataScienceAI />} />
              <Route path="/product/cyber-security-and-ethical-hacking-program" element={<CyberSecurity />} />
              <Route path="/product/devops-and-cloud-computing-program" element={<DevOps />} />
              <Route path="/product/data-science-ai-short-term-program" element={<DataScienceAIShortTerm />} />
              <Route path="/product/cyber-security-and-ethical-hacking-short-term-program" element={<CyberSecurityShortTerm />} />
              <Route path="/product/devops-and-cloud-computing-short-term-program" element={<DevOpsShortTerm />} />
              <Route path="/refund-returns" element={<RefundReturns />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<LoginRegister />} />
              <Route path="/sign-up" element={<LoginRegister />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
  );
}

export default App;
