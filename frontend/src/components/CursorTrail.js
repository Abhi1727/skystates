import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trails, setTrails] = useState([]);

  // Color palette for trail circles
  const trailColors = [
    'rgba(255, 99, 132, 0.6)',  // Pink
    'rgba(54, 162, 235, 0.6)',  // Blue
    'rgba(255, 206, 86, 0.6)',  // Yellow
    'rgba(75, 192, 192, 0.6)',  // Teal
    'rgba(153, 102, 255, 0.6)',  // Purple
    'rgba(255, 159, 64, 0.6)',  // Orange
    'rgba(46, 204, 113, 0.6)',  // Green
    'rgba(231, 76, 60, 0.6)',   // Red
  ];

  // Global mouse move handler
  const handleGlobalMouseMove = (e) => {
    if (!isHovering) return;
    
    const x = e.clientX;
    const y = e.clientY;
    
    setMousePosition({ x, y });
    
    // Add new trail circle
    const newTrail = {
      id: Date.now() + Math.random(),
      x,
      y,
      color: trailColors[Math.floor(Math.random() * trailColors.length)],
      size: Math.random() * 20 + 10, // Random size between 10-30px
    };
    
    setTrails(prev => [...prev.slice(-12), newTrail]); // Keep only last 12 trails
  };

  // Clean up old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails(prev => prev.slice(-12));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  // Add global event listeners
  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setTrails([]); // Clear trails when mouse leaves
    };

    // Add listeners to document body
    document.body.addEventListener('mouseenter', handleMouseEnter, true);
    document.body.addEventListener('mouseleave', handleMouseLeave, true);
    document.body.addEventListener('mousemove', handleGlobalMouseMove, true);

    return () => {
      document.body.removeEventListener('mouseenter', handleMouseEnter, true);
      document.body.removeEventListener('mouseleave', handleMouseLeave, true);
      document.body.removeEventListener('mousemove', handleGlobalMouseMove, true);
    };
  }, [isHovering]);

  return (
    <AnimatePresence>
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          initial={{ 
            opacity: 0.8, 
            scale: 0,
            x: trail.x - 15,
            y: trail.y - 15
          }}
          animate={{ 
            opacity: 0,
            scale: [0, 1.5, 2],
            x: trail.x - 15,
            y: trail.y - 15
          }}
          exit={{ 
            opacity: 0, 
            scale: 2.5 
          }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut"
          }}
          style={{
            position: 'fixed',
            width: `${trail.size}px`,
            height: `${trail.size}px`,
            borderRadius: '50%',
            background: trail.color,
            filter: 'blur(8px)',
            pointerEvents: 'none',
            zIndex: 9999,
            left: 0,
            top: 0
          }}
        />
      ))}
    </AnimatePresence>
  );
};

export default CursorTrail;
