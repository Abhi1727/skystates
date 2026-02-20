import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const CouponsTab = ({ coupons, setCoupons, showNotification }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'fixed',
    discountValue: '',
    isActive: true
  });

  // Hardcoded coupon data
  const hardcodedCoupons = [
    {
      id: 'sky-500',
      code: 'SKY500',
      discountType: 'fixed',
      discountValue: 500,
      isActive: true,
      createdDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Initialize with hardcoded data
  useEffect(() => {
    setCoupons(hardcodedCoupons);
  }, [setCoupons]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newCoupon = {
      id: editingCoupon ? editingCoupon.id : Date.now().toString(),
      code: formData.code.toUpperCase(),
      discountType: 'fixed',
      discountValue: parseFloat(formData.discountValue),
      isActive: formData.isActive,
      createdDate: editingCoupon ? editingCoupon.createdDate : new Date(),
      createdAt: editingCoupon ? editingCoupon.createdAt : new Date(),
      updatedAt: new Date()
    };

    if (editingCoupon) {
      setCoupons(coupons.map(coupon => coupon.id === editingCoupon.id ? newCoupon : coupon));
      showNotification('Coupon updated successfully!', 'success');
    } else {
      setCoupons([...coupons, newCoupon]);
      showNotification('Coupon created successfully!', 'success');
    }

    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      code: '',
      discountType: 'fixed',
      discountValue: '',
      isActive: true
    });
    setEditingCoupon(null);
    setShowForm(false);
  };

  // Generate random coupon code
  const generateCouponCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({...formData, code: code});
  };

  // Edit coupon
  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setFormData(coupon);
    setShowForm(true);
  };

  // Delete coupon
  const handleDelete = (couponId) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      setCoupons(coupons.filter(coupon => coupon.id !== couponId));
      showNotification('Coupon deleted successfully!', 'success');
    }
  };

  // Toggle coupon status
  const toggleCouponStatus = (couponId) => {
    setCoupons(coupons.map(coupon => 
      coupon.id === couponId ? { ...coupon, isActive: !coupon.isActive } : coupon
    ));
    showNotification('Coupon status updated!', 'info');
  };

  return (
    <div className="coupons-tab">
      <div className="tab-header">
        <h2>Coupon Management</h2>
        <motion.button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-plus"></i>
          Create Coupon
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => resetForm()}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}</h3>
                <button className="close-btn" onClick={resetForm}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="coupon-form">
                <div className="form-group">
                  <label>Coupon Name/Code *</label>
                  <div className="input-group">
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                      required
                      placeholder="e.g., SUMMER20"
                    />
                    <button type="button" className="btn btn-secondary" onClick={generateCouponCode}>
                      <i className="fas fa-sync"></i> Generate
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Discount Amount ($) *</label>
                  <input
                    type="number"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({...formData, discountValue: e.target.value})}
                    required
                    min="0"
                    step="0.01"
                    placeholder="e.g., 50"
                  />
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    />
                    <span>Active (available for use)</span>
                  </label>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coupons List */}
      <div className="coupons-list">
        {coupons.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-ticket-alt"></i>
            <h3>No coupons created yet</h3>
            <p>Click "Create Coupon" to add your first discount coupon</p>
          </div>
        ) : (
          <div className="coupons-grid">
            {coupons.map((coupon) => (
              <motion.div
                key={coupon.id}
                className="coupon-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="coupon-header">
                  <div className="coupon-code">
                    <span className="code">{coupon.code}</span>
                    <span className={`status ${coupon.isActive ? 'active' : 'inactive'}`}>
                      {coupon.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="coupon-discount">
                    <span>${coupon.discountValue} OFF</span>
                  </div>
                </div>

                <div className="coupon-details">
                  <p><strong>Discount:</strong> ${coupon.discountValue}</p>
                  <p><strong>Created:</strong> {new Date(coupon.createdDate || coupon.createdAt).toLocaleDateString()}</p>
                  {coupon.description && (
                    <p className="description">{coupon.description}</p>
                  )}
                </div>

                <div className="coupon-actions">
                  <button
                    className="btn-icon"
                    onClick={() => handleEdit(coupon)}
                    title="Edit"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="btn-icon"
                    onClick={() => toggleCouponStatus(coupon.id)}
                    title={coupon.isActive ? 'Deactivate' : 'Activate'}
                  >
                    <i className={`fas fa-${coupon.isActive ? 'pause' : 'play'}`}></i>
                  </button>
                  <button
                    className="btn-icon danger"
                    onClick={() => handleDelete(coupon.id)}
                    title="Delete"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponsTab;
