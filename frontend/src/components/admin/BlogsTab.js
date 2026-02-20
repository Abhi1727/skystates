import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BlogsTab = ({ blogs, setBlogs, showNotification }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Technology',
    tags: '',
    featuredImage: '',
    author: 'Admin',
    status: 'draft',
    publishedDate: '',
    readTime: '',
    seoTitle: '',
    seoDescription: ''
  });

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newBlog = {
      id: editingBlog ? editingBlog.id : Date.now(),
      ...formData,
      slug: formData.slug || generateSlug(formData.title),
      createdDate: editingBlog ? editingBlog.createdDate : new Date().toISOString(),
      publishedDate: formData.status === 'published' ? 
        (formData.publishedDate || new Date().toISOString()) : 
        (editingBlog ? editingBlog.publishedDate : null),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    if (editingBlog) {
      setBlogs(blogs.map(blog => blog.id === editingBlog.id ? newBlog : blog));
      showNotification('Blog updated successfully!', 'success');
    } else {
      setBlogs([...blogs, newBlog]);
      showNotification('Blog created successfully!', 'success');
    }

    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Technology',
      tags: '',
      featuredImage: '',
      author: 'Admin',
      status: 'draft',
      publishedDate: '',
      readTime: '',
      seoTitle: '',
      seoDescription: ''
    });
    setEditingBlog(null);
    setShowForm(false);
  };

  // Edit blog
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      ...blog,
      tags: blog.tags ? blog.tags.join(', ') : ''
    });
    setShowForm(true);
  };

  // Delete blog
  const handleDelete = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(blogs.filter(blog => blog.id !== blogId));
      showNotification('Blog deleted successfully!', 'success');
    }
  };

  // Toggle blog status
  const toggleBlogStatus = (blogId) => {
    setBlogs(blogs.map(blog => 
      blog.id === blogId ? { 
        ...blog, 
        status: blog.status === 'published' ? 'draft' : 'published',
        publishedDate: blog.status === 'draft' ? new Date().toISOString() : blog.publishedDate
      } : blog
    ));
    showNotification('Blog status updated!', 'info');
  };

  // Estimate read time
  const estimateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  // Update read time when content changes
  const handleContentChange = (content) => {
    const readTime = estimateReadTime(content);
    setFormData({
      ...formData,
      content,
      readTime: `${readTime} min read`
    });
  };

  return (
    <div className="blogs-tab">
      <div className="tab-header">
        <h2>Blog Management</h2>
        <motion.button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-plus"></i>
          Create Blog
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
              className="modal-content large"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{editingBlog ? 'Edit Blog' : 'Create New Blog'}</h3>
                <button className="close-btn" onClick={resetForm}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="blog-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Blog Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>URL Slug</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      placeholder="auto-generated from title"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Excerpt *</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    required
                    rows="3"
                    placeholder="Brief description of the blog post"
                  />
                </div>

                <div className="form-group">
                  <label>Content *</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    required
                    rows="12"
                    placeholder="Write your blog content here..."
                  />
                  {formData.readTime && (
                    <small className="read-time">Estimated read time: {formData.readTime}</small>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="Technology">Technology</option>
                      <option value="Career">Career</option>
                      <option value="Education">Education</option>
                      <option value="Industry News">Industry News</option>
                      <option value="Tutorials">Tutorials</option>
                    </select>
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
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Featured Image URL</label>
                    <input
                      type="url"
                      value={formData.featuredImage}
                      onChange={(e) => setFormData({...formData, featuredImage: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="form-group">
                    <label>Author</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Published Date</label>
                    <input
                      type="datetime-local"
                      value={formData.publishedDate}
                      onChange={(e) => setFormData({...formData, publishedDate: e.target.value})}
                      disabled={formData.status === 'draft'}
                    />
                  </div>
                </div>

                {/* SEO Section */}
                <div className="seo-section">
                  <h4>SEO Settings</h4>
                  <div className="form-group">
                    <label>SEO Title</label>
                    <input
                      type="text"
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({...formData, seoTitle: e.target.value})}
                      placeholder="SEO title (max 60 characters)"
                      maxLength="60"
                    />
                  </div>
                  <div className="form-group">
                    <label>SEO Description</label>
                    <textarea
                      value={formData.seoDescription}
                      onChange={(e) => setFormData({...formData, seoDescription: e.target.value})}
                      placeholder="SEO description (max 160 characters)"
                      rows="2"
                      maxLength="160"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingBlog ? 'Update Blog' : 'Create Blog'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blogs List */}
      <div className="blogs-list">
        {blogs.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-blog"></i>
            <h3>No blogs created yet</h3>
            <p>Click "Create Blog" to add your first blog post</p>
          </div>
        ) : (
          <div className="blogs-grid">
            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                className="blog-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                {blog.featuredImage && (
                  <div className="blog-image">
                    <img src={blog.featuredImage} alt={blog.title} />
                  </div>
                )}
                
                <div className="blog-content">
                  <div className="blog-header">
                    <span className={`status ${blog.status}`}>
                      {blog.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                    <span className="category">{blog.category}</span>
                  </div>
                  
                  <h3>{blog.title}</h3>
                  <p className="excerpt">{blog.excerpt}</p>
                  
                  <div className="blog-meta">
                    <span><i className="fas fa-user"></i> {blog.author}</span>
                    {blog.readTime && (
                      <span><i className="fas fa-clock"></i> {blog.readTime}</span>
                    )}
                    {blog.publishedDate && (
                      <span><i className="fas fa-calendar"></i> {new Date(blog.publishedDate).toLocaleDateString()}</span>
                    )}
                  </div>
                  
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="blog-tags">
                      {blog.tags.map((tag, index) => (
                        <span key={index} className="tag">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="blog-actions">
                  <button
                    className="btn-icon"
                    onClick={() => handleEdit(blog)}
                    title="Edit"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="btn-icon"
                    onClick={() => toggleBlogStatus(blog.id)}
                    title={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                  >
                    <i className={`fas fa-${blog.status === 'published' ? 'eye-slash' : 'eye'}`}></i>
                  </button>
                  <button
                    className="btn-icon danger"
                    onClick={() => handleDelete(blog.id)}
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

export default BlogsTab;
