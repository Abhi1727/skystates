import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BrouchuresTab = ({ brouchures, setBrouchures, showNotification }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingBrouchure, setEditingBrouchure] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Course',
    fileUrl: '',
    fileName: '',
    fileSize: '',
    fileType: '',
    thumbnailUrl: '',
    downloadCount: 0,
    isActive: true,
    tags: '',
    language: 'English'
  });

  // Handle file upload (simulated)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate file upload
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setFormData({
              ...formData,
              fileName: file.name,
              fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
              fileType: file.type,
              fileUrl: URL.createObjectURL(file)
            });
            showNotification('File uploaded successfully!', 'success');
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newBrouchure = {
      id: editingBrouchure ? editingBrouchure.id : Date.now(),
      ...formData,
      createdDate: editingBrouchure ? editingBrouchure.createdDate : new Date().toISOString(),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    if (editingBrouchure) {
      setBrouchures(brouchures.map(b => b.id === editingBrouchure.id ? newBrouchure : b));
      showNotification('Brouchure updated successfully!', 'success');
    } else {
      setBrouchures([...brouchures, newBrouchure]);
      showNotification('Brouchure uploaded successfully!', 'success');
    }

    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Course',
      fileUrl: '',
      fileName: '',
      fileSize: '',
      fileType: '',
      thumbnailUrl: '',
      downloadCount: 0,
      isActive: true,
      tags: '',
      language: 'English'
    });
    setEditingBrouchure(null);
    setShowForm(false);
    setUploadProgress(0);
  };

  // Edit brouchure
  const handleEdit = (brouchure) => {
    setEditingBrouchure(brouchure);
    setFormData({
      ...brouchure,
      tags: brouchure.tags ? brouchure.tags.join(', ') : ''
    });
    setShowForm(true);
  };

  // Delete brouchure
  const handleDelete = (brouchureId) => {
    if (window.confirm('Are you sure you want to delete this brouchure?')) {
      setBrouchures(brouchures.filter(b => b.id !== brouchureId));
      showNotification('Brouchure deleted successfully!', 'success');
    }
  };

  // Toggle brouchure status
  const toggleBrouchureStatus = (brouchureId) => {
    setBrouchures(brouchures.map(b => 
      b.id === brouchureId ? { ...b, isActive: !b.isActive } : b
    ));
    showNotification('Brouchure status updated!', 'info');
  };

  // Download brouchure (simulated)
  const handleDownload = (brouchure) => {
    // Increment download count
    setBrouchures(brouchures.map(b => 
      b.id === brouchure.id ? { ...b, downloadCount: (b.downloadCount || 0) + 1 } : b
    ));
    showNotification('Download started!', 'info');
    
    // Simulate download
    if (brouchure.fileUrl) {
      const link = document.createElement('a');
      link.href = brouchure.fileUrl;
      link.download = brouchure.fileName;
      link.click();
    }
  };

  // Get file icon based on type
  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return 'fas fa-file-pdf';
    if (fileType.includes('word') || fileType.includes('document')) return 'fas fa-file-word';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'fas fa-file-excel';
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return 'fas fa-file-powerpoint';
    return 'fas fa-file';
  };

  return (
    <div className="brouchures-tab">
      <div className="tab-header">
        <h2>Brouchure Management</h2>
        <motion.button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-plus"></i>
          Upload Brouchure
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
                <h3>{editingBrouchure ? 'Edit Brouchure' : 'Upload New Brouchure'}</h3>
                <button className="close-btn" onClick={resetForm}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="brouchure-form">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows="4"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="Course">Course</option>
                      <option value="Program">Program</option>
                      <option value="Institution">Institution</option>
                      <option value="Events">Events</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Language</label>
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData({...formData, language: e.target.value})}
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Brouchure File *</label>
                  <div className="file-upload">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                      onChange={handleFileUpload}
                      required={!editingBrouchure}
                    />
                    <div className="file-upload-info">
                      <i className="fas fa-cloud-upload-alt"></i>
                      <p>Click to upload or drag and drop</p>
                      <small>PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX (MAX. 10MB)</small>
                    </div>
                  </div>
                  
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="upload-progress">
                      <div 
                        className="progress-bar"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                      <span>{uploadProgress}%</span>
                    </div>
                  )}
                  
                  {formData.fileName && (
                    <div className="file-info">
                      <i className={getFileIcon(formData.fileType)}></i>
                      <div className="file-details">
                        <span className="file-name">{formData.fileName}</span>
                        <span className="file-size">{formData.fileSize}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Thumbnail URL</label>
                  <input
                    type="url"
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData({...formData, thumbnailUrl: e.target.value})}
                    placeholder="https://..."
                  />
                </div>

                <div className="form-group">
                  <label>Tags</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="tag1, tag2, tag3"
                  />
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    />
                    <span>Active (available for download)</span>
                  </label>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingBrouchure ? 'Update Brouchure' : 'Upload Brouchure'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brouchures List */}
      <div className="brouchures-list">
        {brouchures.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-file-pdf"></i>
            <h3>No brouchures uploaded yet</h3>
            <p>Click "Upload Brouchure" to add your first brouchure</p>
          </div>
        ) : (
          <div className="brouchures-grid">
            {brouchures.map((brouchure) => (
              <motion.div
                key={brouchure.id}
                className="brouchure-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="brouchure-preview">
                  {brouchure.thumbnailUrl ? (
                    <img src={brouchure.thumbnailUrl} alt={brouchure.title} />
                  ) : (
                    <div className="file-icon-large">
                      <i className={getFileIcon(brouchure.fileType)}></i>
                    </div>
                  )}
                  <span className={`status ${brouchure.isActive ? 'active' : 'inactive'}`}>
                    {brouchure.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="brouchure-info">
                  <h3>{brouchure.title}</h3>
                  <p className="description">{brouchure.description}</p>
                  
                  <div className="brouchure-meta">
                    <span className="category">{brouchure.category}</span>
                    <span className="language">{brouchure.language}</span>
                    <span className="file-size">{brouchure.fileSize}</span>
                  </div>

                  {brouchure.tags && brouchure.tags.length > 0 && (
                    <div className="brouchure-tags">
                      {brouchure.tags.map((tag, index) => (
                        <span key={index} className="tag">#{tag}</span>
                      ))}
                    </div>
                  )}

                  <div className="brouchure-stats">
                    <span><i className="fas fa-download"></i> {brouchure.downloadCount || 0} downloads</span>
                    <span><i className="fas fa-calendar"></i> {new Date(brouchure.createdDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="brouchure-actions">
                  <button
                    className="btn-icon"
                    onClick={() => handleDownload(brouchure)}
                    title="Download"
                  >
                    <i className="fas fa-download"></i>
                  </button>
                  <button
                    className="btn-icon"
                    onClick={() => handleEdit(brouchure)}
                    title="Edit"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="btn-icon"
                    onClick={() => toggleBrouchureStatus(brouchure.id)}
                    title={brouchure.isActive ? 'Deactivate' : 'Activate'}
                  >
                    <i className={`fas fa-${brouchure.isActive ? 'eye-slash' : 'eye'}`}></i>
                  </button>
                  <button
                    className="btn-icon danger"
                    onClick={() => handleDelete(brouchure.id)}
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

export default BrouchuresTab;
