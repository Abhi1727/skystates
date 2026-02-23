import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
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
import Checkout from './components/checkout/Checkout';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import UserDashboard from './pages/UserDashboard';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/admin/AdminDashboard';
import CursorTrail from './components/CursorTrail';
import ScrollToTop from './components/ScrollToTop';
import useLocomotiveScroll from './hooks/useLocomotiveScroll';
import './App.css';

function App() {
  const { scrollRef } = useLocomotiveScroll(true); // Enabled for smooth scrolling

  return (
    <CartProvider>
      <Router>
        <div className="App" data-scroll-container ref={scrollRef}>
          <CursorTrail />
          <ScrollToTop />
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
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/login/*" element={<SignInPage />} />
              <Route path="/sign-up/*" element={<SignUpPage />} />
              <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
              <Route path="/user/*" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
