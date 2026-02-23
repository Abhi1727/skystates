import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useApi } from '../hooks/useApi';
import { API_BASE } from '../config.js';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user } = useUser();
  const { getAuthHeaders } = useApi();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchOrders = async () => {
      try {
        const headers = await getAuthHeaders();
        if (cancelled) return;
        const res = await fetch(`${API_BASE}/payments/history`, { headers });
        if (cancelled) return;
        if (res.ok) {
          const json = await res.json();
          setOrders(json.data?.payments || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Could not load orders. You may not have any yet.');
          setOrders([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchOrders();
    return () => { cancelled = true; };
  }, [getAuthHeaders]);

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <p>Welcome back, {user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] || 'Student'}!</p>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-card profile-card">
          <h2>Profile</h2>
          <div className="profile-info">
            <div className="profile-avatar">
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt="Profile" />
              ) : (
                <div className="avatar-placeholder">
                  {(user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0] || 'U').toUpperCase()}
                </div>
              )}
            </div>
            <div className="profile-details">
              <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
              <p><strong>Email:</strong> {user?.emailAddresses?.[0]?.emailAddress || '—'}</p>
              <p><strong>Member since:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</p>
            </div>
          </div>
          <Link to="/user" className="edit-profile-btn">Manage Account</Link>
        </section>

        <section className="dashboard-card orders-card">
          <h2>My Orders</h2>
          {loading ? (
            <p className="loading-msg">Loading orders...</p>
          ) : error ? (
            <p className="info-msg">{error}</p>
          ) : orders.length === 0 ? (
            <p className="info-msg">No orders yet. <Link to="/">Browse courses</Link> to get started!</p>
          ) : (
            <ul className="orders-list">
              {orders.map((order) => (
                <li key={order.id} className="order-item">
                  <div className="order-info">
                    <span className="order-course">{order.course?.title || 'Course'}</span>
                    <span className="order-date">
                      {order.paidAt ? new Date(order.paidAt).toLocaleDateString() : '—'}
                    </span>
                  </div>
                  <div className="order-meta">
                    <span className="order-amount">${order.amount?.toFixed(2)}</span>
                    <span className={`order-status ${order.status}`}>{order.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="dashboard-card benefits-card full-width">
          <h2>Your Benefits</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <span className="benefit-icon">📚</span>
              <h3>Lifetime Access</h3>
              <p>Access your enrolled courses forever. Learn at your own pace.</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🎓</span>
              <h3>Certificates</h3>
              <p>Earn industry-recognized certificates upon completion.</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">💬</span>
              <h3>Support</h3>
              <p>24/7 support from our team. Email support@skyreviews.us anytime.</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📱</span>
              <h3>Learn Anywhere</h3>
              <p>Access courses on desktop, tablet, or mobile.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
