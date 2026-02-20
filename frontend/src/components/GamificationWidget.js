import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GamificationWidget = () => {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState([]);
  const [showReward, setShowReward] = useState(false);
  const [currentReward, setCurrentReward] = useState(null);
  const [streak, setStreak] = useState(0);
  const [lastVisit, setLastVisit] = useState(null);

  const achievementBadges = [
    { id: 1, name: 'Explorer', icon: '🔍', description: 'Visited 3 course pages', points: 50, condition: 'courses_visited', target: 3 },
    { id: 2, name: 'Comparison Pro', icon: '📊', description: 'Compared 2 courses', points: 75, condition: 'courses_compared', target: 2 },
    { id: 3, name: 'Newsletter Star', icon: '📧', description: 'Subscribed to newsletter', points: 100, condition: 'newsletter_subscribed', target: 1 },
    { id: 4, name: 'Social Butterfly', icon: '🦋', description: 'Shared a course', points: 125, condition: 'course_shared', target: 1 },
    { id: 5, name: 'Lead Magnet', icon: '🧲', description: 'Provided contact info', points: 200, condition: 'lead_captured', target: 1 },
    { id: 6, name: 'Course Expert', icon: '🎓', description: 'Viewed all course details', points: 150, condition: 'all_courses_viewed', target: 3 }
  ];

  const rewards = [
    { id: 1, name: '10% OFF', icon: '🎫', description: 'Get 10% off any course', pointsRequired: 500, type: 'discount' },
    { id: 2, name: 'Free Trial', icon: '🆓', description: '7-day free course trial', pointsRequired: 750, type: 'trial' },
    { id: 3, name: 'Career Guide', icon: '📚', description: 'Free career assessment guide', pointsRequired: 300, type: 'resource' },
    { id: 4, name: 'Priority Support', icon: '⚡', description: 'Get priority mentor support', pointsRequired: 1000, type: 'feature' }
  ];

  useEffect(() => {
    // Load saved progress
    const savedData = localStorage.getItem('gamificationData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setPoints(data.points || 0);
      setLevel(data.level || 1);
      setAchievements(data.achievements || []);
      setStreak(data.streak || 0);
      setLastVisit(data.lastVisit || null);
    }

    // Check daily streak
    const today = new Date().toDateString();
    const lastVisitDate = lastVisit ? new Date(lastVisit).toDateString() : null;
    
    if (lastVisitDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastVisitDate === yesterday.toDateString()) {
        setStreak(prev => prev + 1);
        awardPoints(25, 'Daily Streak Bonus! 🔥');
      } else {
        setStreak(1);
      }
      setLastVisit(today);
    }
  }, []);

  useEffect(() => {
    // Save progress
    const data = {
      points,
      level,
      achievements,
      streak,
      lastVisit
    };
    localStorage.setItem('gamificationData', JSON.stringify(data));
  }, [points, level, achievements, streak, lastVisit]);

  const awardPoints = (amount, reason) => {
    setPoints(prev => {
      const newPoints = prev + amount;
      const newLevel = Math.floor(newPoints / 250) + 1;
      
      if (newLevel > level) {
        setCurrentReward({
          type: 'level_up',
          message: `🎉 Level Up! You're now level ${newLevel}!`,
          points: amount
        });
        setShowReward(true);
      } else if (reason) {
        setCurrentReward({
          type: 'points',
          message: reason,
          points: amount
        });
        setShowReward(true);
      }
      
      setLevel(newLevel);
      return newPoints;
    });
  };

  const unlockAchievement = (achievementId) => {
    const achievement = achievementBadges.find(a => a.id === achievementId);
    if (achievement && !achievements.includes(achievementId)) {
      setAchievements(prev => [...prev, achievementId]);
      awardPoints(achievement.points, `🏆 Achievement Unlocked: ${achievement.name}!`);
    }
  };

  const trackUserAction = (action) => {
    const actionCounts = JSON.parse(localStorage.getItem('userActions') || '{}');
    actionCounts[action] = (actionCounts[action] || 0) + 1;
    localStorage.setItem('userActions', JSON.stringify(actionCounts));

    // Check achievements
    achievementBadges.forEach(achievement => {
      if (actionCounts[achievement.condition] >= achievement.target) {
        unlockAchievement(achievement.id);
      }
    });

    // Award points for actions
    const actionPoints = {
      'course_view': 10,
      'course_compare': 15,
      'newsletter_subscribe': 50,
      'contact_form': 100,
      'course_share': 25,
      'page_scroll': 5
    };

    if (actionPoints[action]) {
      awardPoints(actionPoints[action], `+${actionPoints[action]} points!`);
    }
  };

  const redeemReward = (reward) => {
    if (points >= reward.pointsRequired) {
      setPoints(prev => prev - reward.pointsRequired);
      setCurrentReward({
        type: 'redeemed',
        message: `🎁 Redeemed: ${reward.name}! Check your email.`,
        reward: reward
      });
      setShowReward(true);
    }
  };

  const getProgressToNextLevel = () => {
    const currentLevelPoints = (level - 1) * 250;
    const nextLevelPoints = level * 250;
    return ((points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
  };

  return (
    <>
      {/* Gamification Widget */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          position: 'fixed',
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
          background: 'white',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          zIndex: 900,
          width: '280px',
          border: '2px solid #e0e0e0'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '1.2rem' }}>
            🎮 Your Progress
          </h3>
          
          {/* Level & Points */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            padding: '15px',
            borderRadius: '15px',
            marginBottom: '15px'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '5px' }}>
              Level {level}
            </div>
            <div style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
              {points} Points
            </div>
            
            {/* Progress Bar */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.3)',
              height: '8px',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getProgressToNextLevel()}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                  height: '100%',
                  background: 'white',
                  borderRadius: '4px'
                }}
              />
            </div>
            <div style={{ fontSize: '0.8rem', marginTop: '5px' }}>
              {Math.round(getProgressToNextLevel())}% to Level {level + 1}
            </div>
          </div>

          {/* Daily Streak */}
          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffc107',
            padding: '10px',
            borderRadius: '10px',
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.2rem', marginBottom: '5px' }}>🔥</div>
            <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#856404' }}>
              {streak} Day Streak
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '1rem' }}>
            🏆 Recent Achievements
          </h4>
          <div style={{ maxHeight: '120px', overflowY: 'auto' }}>
            {achievements.length > 0 ? (
              achievements.slice(-3).map(achievementId => {
                const achievement = achievementBadges.find(a => a.id === achievementId);
                return (
                  <motion.div
                    key={achievementId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px',
                      background: '#f8f9fa',
                      borderRadius: '8px',
                      marginBottom: '8px'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{achievement.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#333' }}>
                        {achievement.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>
                        +{achievement.points} pts
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>
                Start exploring to earn achievements!
              </div>
            )}
          </div>
        </div>

        {/* Available Rewards */}
        <div>
          <h4 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '1rem' }}>
            🎁 Rewards Store
          </h4>
          <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
            {rewards.map(reward => (
              <motion.div
                key={reward.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => redeemReward(reward)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px',
                  background: points >= reward.pointsRequired ? '#e8f5e8' : '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '8px',
                  cursor: points >= reward.pointsRequired ? 'pointer' : 'not-allowed',
                  border: points >= reward.pointsRequired ? '1px solid #28a745' : '1px solid #e0e0e0'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{reward.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: '600', 
                    color: points >= reward.pointsRequired ? '#28a745' : '#333' 
                  }}>
                    {reward.name}
                  </div>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: points >= reward.pointsRequired ? '#28a745' : '#999' 
                  }}>
                    {reward.pointsRequired} pts
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => trackUserAction('page_scroll')}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: '10px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '15px'
          }}
        >
          🎯 Earn More Points
        </button>
      </motion.div>

      {/* Reward Notifications */}
      <AnimatePresence>
        {showReward && currentReward && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              background: 'white',
              borderRadius: '15px',
              padding: '20px',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
              zIndex: 1000,
              minWidth: '300px',
              border: '2px solid #28a745'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #28a745, #20c997)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: 'white'
              }}>
                {currentReward.type === 'level_up' ? '⬆️' : 
                 currentReward.type === 'redeemed' ? '🎁' : '✨'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: '1rem', 
                  fontWeight: '700', 
                  color: '#28a745',
                  marginBottom: '5px'
                }}>
                  {currentReward.message}
                </div>
                {currentReward.points && (
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    +{currentReward.points} points earned!
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowReward(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#999'
                }}
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global tracking function - call this from other components */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.trackUserAction = function(action) {
            // This will be called from other components
            const event = new CustomEvent('trackUserAction', { detail: action });
            window.dispatchEvent(event);
          };
        `
      }} />
    </>
  );
};

export default GamificationWidget;
